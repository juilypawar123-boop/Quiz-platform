import "./App.css";
import Quiz from "./Quiz";
import Leaderboard from "./Leaderboard";
import { useState } from "react";
import background from "./assets/background.jpg"; // ? your image

function App() {
    const [showLeaderboard, setShowLeaderboard] = useState(false);

    const handleFinishQuiz = () => {
        setShowLeaderboard(true);
    };

    return (
        <div
            className="App"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "100vh",
                color: "#fff",
            }}
        >
            <h1>Quiz Platform</h1>

            {showLeaderboard ? (
                <>
                    <Leaderboard />
                    <button
                        onClick={() => setShowLeaderboard(false)}
                        style={{ marginTop: "20px" }}
                    >
                        Back to Quiz
                    </button>
                </>
            ) : (
                <Quiz onFinish={handleFinishQuiz} />
            )}
        </div>
    );
}

export default App;
