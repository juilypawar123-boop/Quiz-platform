const mongoose = require("mongoose");
const Question = require("./models/question");

mongoose.connect("mongodb://127.0.0.1:27017/quiz-platform")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

const sampleQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: "Paris",
    },
    {
        question: "Who wrote Hamlet?",
        options: ["Shakespeare", "Tolstoy", "Hemingway", "Dante"],
        answer: "Shakespeare",
    },
    {
        question: "HTML stands for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None of these"],
        answer: "Hyper Text Markup Language",
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Venus", "Mars", "Jupiter"],
        answer: "Mars",
    },
    {
        question: "What is 5 + 7?",
        options: ["10", "11", "12", "13"],
        answer: "12",
    },
    {
        question: "React is a ___ library?",
        options: ["Framework", "Library", "Database", "Language"],
        answer: "Library",
    },
    {
        question: "Which gas do plants absorb?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        answer: "Carbon Dioxide",
    },
    {
        question: "Which is the smallest continent?",
        options: ["Asia", "Australia", "Europe", "Antarctica"],
        answer: "Australia",
    },
    {
        question: "Which year did the first man land on the Moon?",
        options: ["1969", "1971", "1965", "1970"],
        answer: "1969",
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
        answer: "Leonardo da Vinci",
    },
];

const seedDB = async () => {
    await Question.deleteMany({});
    await Question.insertMany(sampleQuestions); // ✅ use correct variable
    console.log("Database seeded with questions!");
    mongoose.connection.close();
};

seedDB();
