const router = require("express").Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* 🔹 REGISTER */
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (username,email,password) VALUES (?,?,?)",
        [username, email, hash],
        (err) => {
            if (err) return res.send(err);
            res.send("User Registered");
        }
    );
});

/* 🔹 LOGIN */
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (result.length === 0)
                return res.send("User not found");

            const user = result[0];

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) return res.send("Wrong password");

            const token = jwt.sign({ id: user.id }, "secret");
            res.send(token);
        }
    );
});

module.exports = router;