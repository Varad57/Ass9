const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.sendStatus(401);

    try {
        const verified = jwt.verify(token, "secret");
        req.user = verified;
        next();
    } catch {
        res.sendStatus(400);
    }
};