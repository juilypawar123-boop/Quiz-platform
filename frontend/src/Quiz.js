import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const Quiz = ({ onFinish }) => {
    const [username, setUsername] = useState("");
    const [started, setStarted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(60);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const QUIZ_TIME = 60;

    // Backend URL
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

    // Fetch questions when quiz starts
    useEffect(() => {
        if (started) {
            axios
                .get(`${BACKEND_URL}/questions`)
                .then((res) => setQuestions(res.data))
                .catch((err) => console.error("AxiosError", err));
        }
    }, [started, BACKEND_URL]);

    // Submit quiz
    const submitQuiz = useCallback(() => {
        if (submitted) return;

        const formattedAnswers = Object.keys(answers).map((id) => ({
            id,
            answer: answers[id],
        }));

        axios
            .post(`${BACKEND_URL}/submit`, {
                username: username || "Anonymous",
                answers: formattedAnswers,
            })
            .then((res) => {
                setScore(res.data.score);
                setSubmitted(true);
            })
            .catch((err) => console.error("AxiosError", err));
    }, [answers, username, submitted, BACKEND_URL]); 

    // Countdown timer
    useEffect(() => {
        if (!started || submitted) return;

        if (timeLeft <= 0) {
            submitQuiz();
            return;
        }

        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, started, submitted, submitQuiz]);

    // Handle answer selection
    const handleChange = (questionId, option) => {
        if (submitted) return;
        setAnswers((prev) => ({ ...prev, [questionId]: option }));
    };

    const startQuiz = () => {
        if (!username.trim()) {
            alert("Please enter your name to start the quiz!");
            return;
        }
        setTimeLeft(QUIZ_TIME);
        setStarted(true);
    };

    // Render username input
    if (!started) {
        return (
            <div className="quiz-start">
                <h2>Enter Your Name to Start the Quiz</h2>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your name"
                    style={{ padding: "15px", fontSize: "20px" }}
                />
                <button onClick={startQuiz}>Start Quiz</button>
            </div>
        );
    }

    // Render after submission
    if (submitted) {
        return (
            <div className="quiz-result">
                <h2>Quiz Submitted!</h2>
                <h3>Username: {username}</h3>
                <h3>
                    Your Score: {score} / {questions.length}
                </h3>
                <button onClick={onFinish}>View Leaderboard</button>
            </div>
        );
    }

    // Loading questions
    if (started && questions.length === 0) {
        return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading questions...</h2>;
    }

    // Render quiz questions
    return (
        <div className="quiz-container">
            <h2
                style={{
                    color: timeLeft > 10 ? "#ffd800" : "#f44336", // green if >10s, red if <=10s
                    fontSize: "24px",
                    fontWeight: "bold",
                }}
            >
                Time Left: {timeLeft}s
            </h2>
            <div className="timer-bar">
                <div
                    className="timer-progress"
                    style={{
                        width: `${(timeLeft / QUIZ_TIME) * 100}%`,
                        background: timeLeft > 10 ? "#4caf50" : "#f44336",
                    }}
                />
            </div>

            {questions.map((q) => (
                <div key={q._id} className="quiz-question">
                    <h3>{q.question}</h3>
                    {q.options.map((opt) => {
                        const isSelected = answers[q._id] === opt;
                        return (
                            <label
                                key={opt}
                                className={`quiz-option ${isSelected ? "selected" : ""}`}
                            >
                                <input
                                    type="radio"
                                    name={q._id}
                                    value={opt}
                                    onChange={() => handleChange(q._id, opt)}
                                    checked={isSelected}
                                />
                                {opt}
                            </label>
                        );
                    })}
                </div>
            ))}

            <button onClick={submitQuiz} className="submit-btn">
                Submit Quiz
            </button>
        </div>
    );
};

export default Quiz;
