const router = require("express").Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);

    db.query(
        "INSERT INTO users (username,email,password) VALUES (?,?,?)",
        [req.body.username, req.body.email, hash],
        (err) => {
            if (err) return res.send(err);
            res.send("Registered");
        }
    );
});

// Login
router.post("/login", (req, res) => {
    db.query(
        "SELECT * FROM users WHERE email=?",
        [req.body.email],
        async (err, result) => {
            if (result.length === 0) return res.send("User not found");

            const valid = await bcrypt.compare(req.body.password, result[0].password);
            if (!valid) return res.send("Wrong password");

            const token = jwt.sign({ id: result[0].id }, "secret");
            res.send(token);
        }
    );
});

module.exports = router;