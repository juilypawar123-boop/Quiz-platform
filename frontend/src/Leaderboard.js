import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("/leaderboard") // uses proxy → localhost:5000
            .then((res) => {
                setScores(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching leaderboard:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading leaderboard...</p>;
    }

    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>

            {scores.length === 0 ? (
                <p>No scores yet. Be the first to play!</p>
            ) : (
                <ol>
                        {scores.map((entry, index) => (
                            <li key={index}>
                                {entry.username} - {entry.score}
                            </li>
                        ))}
                </ol>
            )}
        </div>
    );
};

export default Leaderboard;