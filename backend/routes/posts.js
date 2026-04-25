const router = require("express").Router();
const db = require("../db");
const auth = require("../middleware/auth");

// Create Post
router.post("/", auth, (req, res) => {
    db.query(
        "INSERT INTO posts (title,content,user_id) VALUES (?,?,?)",
        [req.body.title, req.body.content, req.user.id],
        () => res.send("Post Created")
    );
});

// Get All Posts
router.get("/", (req, res) => {
    db.query("SELECT * FROM posts", (err, result) => {
        res.send(result);
    });
});

// Get Single Post
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM posts WHERE id=?", [req.params.id],
        (err, result) => res.send(result[0])
    );
});

// Update Post (owner only)
router.put("/:id", auth, (req, res) => {
    db.query(
        "UPDATE posts SET title=?, content=? WHERE id=? AND user_id=?",
        [req.body.title, req.body.content, req.params.id, req.user.id],
        () => res.send("Updated")
    );
});

// Delete Post (owner only)
router.delete("/:id", auth, (req, res) => {
    db.query(
        "DELETE FROM posts WHERE id=? AND user_id=?",
        [req.params.id, req.user.id],
        () => res.send("Deleted")
    );
});

// Add Comment
router.post("/:id/comment", auth, (req, res) => {
    db.query(
        "INSERT INTO comments (post_id,user_id,text) VALUES (?,?,?)",
        [req.params.id, req.user.id, req.body.text],
        () => res.send("Comment Added")
    );
});

// Get Comments
router.get("/:id/comments", (req, res) => {
    db.query(
        "SELECT * FROM comments WHERE post_id=?",
        [req.params.id],
        (err, result) => res.send(result)
    );
});

module.exports = router;