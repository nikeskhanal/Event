import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const QuizResult = () => {
  const { quizId } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    console.log("Extracted quizId:", quizId);

    if (!quizId) {
      console.error("Quiz ID is undefined");
      return;
    }

    fetch(`http://localhost:4000/api/quiz/results/${quizId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((data) => setResults(data.participants || []))
      .catch((err) => console.error("Error fetching results:", err));
  }, [quizId]);

  // Sort results by score in descending order
  const sortedResults = [...results].sort((a, b) => b.score - a.score);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Quiz Results</h2>
      {results.length > 0 ? (
        <div className="space-y-4">
          {sortedResults.map((participant, index) => {
            // Determine the background color and ranking
            let bgColor = "";
            let rank = "";
            switch (index) {
              case 0:
                bgColor = "bg-yellow-400"; // Gold
                rank = "1st";
                break;
              case 1:
                bgColor = "bg-gray-300"; // Silver
                rank = "2nd";
                break;
              case 2:
                bgColor = "bg-yellow-900"; // Bronze
                rank = "3rd";
                break;
              default:
                bgColor = "bg-white";
                rank = `${index + 1}th`;
                break;
            }

            return (
              <div
                key={index}
                className={`shadow-md rounded-lg p-4 flex justify-between items-center ${bgColor}`}
              >
                <p className="text-lg font-medium">{rank} - {participant.user.name}</p>
                <p className="text-xl font-semibold text-black">{participant.score}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">No results available.</p>
      )}
    </div>
  );
};

export default QuizResult;
