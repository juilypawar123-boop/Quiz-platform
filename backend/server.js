const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Question = require("./models/question");
const Submission = require("./models/submission");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/quiz-platform")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/questions", async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch questions" });
    }
});

app.post("/submit", async (req, res) => {
    const { username, answers } = req.body;

    try {
        const questions = await Question.find();
        let score = 0;

        answers.forEach((a) => {
            const q = questions.find((q) => q._id.toString() === a.id);
            if (q && q.answer === a.answer) score++;
        });

        const submission = new Submission({ username, score });
        await submission.save();

        res.json({ score });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to submit quiz" });
    }
});

app.get("/leaderboard", async (req, res) => {
    try {
        const leaderboard = await Submission.find()
            .sort({ score: -1 })
            .limit(10)
            .select("username score -_id");

        res.json(leaderboard);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to fetch leaderboard" });
    }
});

// Start server LAST
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
