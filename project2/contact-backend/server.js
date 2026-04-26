const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contact"));

// 🔥 REQUIRED ROUTES FOR ASSIGNMENT
app.get("/", (req, res) => {
    res.send("Application Deployed Successfully");
});

app.get("/status", (req, res) => {
    res.json({
        status: "running",
        environment: "production"
    });
});

// ✅ Use environment port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});