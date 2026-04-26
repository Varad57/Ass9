const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const auth = require("../middleware/auth");
const { parse } = require("json2csv");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

// ➕ Create Contact
router.post("/", auth, (req, res) => {
    const { name, phone, email, address } = req.body;

    db.query(
        "INSERT INTO contacts (name,phone,email,address,user_id) VALUES (?,?,?,?,?)",
        [name, phone, email, address, req.user.id],
        (err) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).send("Error adding contact: " + err.message);
            }
            res.send("Contact Added");
        }
    );
});

// 📄 Get Contacts (Search + Pagination)
router.get("/", auth, (req, res) => {
    const { page = 1, search = "" } = req.query;
    const limit = 5;
    const offset = (page - 1) * limit;

    db.query(
        `SELECT * FROM contacts 
     WHERE user_id=? AND (name LIKE ? OR email LIKE ?)
     LIMIT ? OFFSET ?`,
        [req.user.id, `%${search}%`, `%${search}%`, limit, offset],
        (err, result) => {
            if (err) return res.status(500).send(err);
            res.send(result);
        }
    );
});

// ✏️ Update
router.put("/:id", auth, (req, res) => {
    const { name, phone, email, address } = req.body;

    db.query(
        "UPDATE contacts SET name=?, phone=?, email=?, address=? WHERE id=? AND user_id=?",
        [name, phone, email, address, req.params.id, req.user.id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send("Updated");
        }
    );
});

// ❌ Delete
router.delete("/:id", auth, (req, res) => {
    db.query(
        "DELETE FROM contacts WHERE id=? AND user_id=?",
        [req.params.id, req.user.id],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send("Deleted");
        }
    );
});

// 📤 Export CSV
router.get("/export", (req, res, next) => {
    const token = req.header("Authorization") || req.query.token;
    if (!token) return res.sendStatus(401);

    try {
        const verified = jwt.verify(token, "secret");
        req.user = verified;
        next();
    } catch {
        res.sendStatus(400);
    }
}, (req, res) => {
    db.query(
        "SELECT name,phone,email,address FROM contacts WHERE user_id=?",
        [req.user.id],
        (err, data) => {
            if (err) return res.status(500).send(err);
            try {
                const csvData = parse(data);
                res.attachment("contacts.csv").send(csvData);
            } catch (parseErr) {
                res.status(500).send(parseErr.message);
            }
        }
    );
});

// 📥 Import CSV
router.post("/import", auth, upload.single("file"), (req, res) => {
    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
            try {
                // Use a counter or Promise.all to wait for all insertions
                const promises = results.map(c => {
                    return new Promise((resolve, reject) => {
                        db.query(
                            "INSERT INTO contacts (name,phone,email,address,user_id) VALUES (?,?,?,?,?)",
                            [c.name, c.phone, c.email, c.address, req.user.id],
                            (err) => {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                });

                await Promise.all(promises);
                fs.unlinkSync(req.file.path); // Clean up temp file
                res.send("Imported successfully");
            } catch (err) {
                res.status(500).send(err.message);
            }
        });
});

module.exports = router;