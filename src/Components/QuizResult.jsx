import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Award, UserCheck, Medal } from 'lucide-react'; // Importing icons from lucide-react
import Navbar from "./Navbar";

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
    <div>
      <Navbar/>
    <div className="container mx-auto p-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Quiz Results</h2>
      {results.length > 0 ? (
        <div className="space-y-6">
          {sortedResults.map((participant, index) => {
            // Determine the background color, ranking, and icons
            let bgColor = "";
            let rank = "";
            let Icon = null;
            switch (index) {
              case 0:
                bgColor = "bg-yellow-400"; // Gold
                rank = "1st";
                Icon = <Award className="text-yellow-600" size={24} />;
                break;
              case 1:
                bgColor = "bg-gray-300"; // Silver
                rank = "2nd";
                Icon = <Medal className="text-gray-600" size={24} />;
                break;
              case 2:
                bgColor = "bg-amber-600"; // Bronze
                rank = "3rd";
                Icon = <Medal className="text-amber-400" size={24} />;
                break;
              default:
                bgColor = "bg-white";
                rank = `${index + 1}th`;
                Icon = <UserCheck className="text-gray-500" size={24} />;
                break;
            }

            return (
              <div
                key={index}
                className={`flex items-center justify-between p-5 rounded-lg shadow-lg ${bgColor} text-white`}
              >
                <div className="flex items-center space-x-4">
                  {Icon}
                  <p className="text-lg font-semibold">{rank} - {participant.user.name}</p>
                </div>
                <p className="text-2xl font-bold">{participant.score}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-white opacity-70">No results available.</p>
      )}
    </div>
    </div>
  );
};

export default QuizResult;
