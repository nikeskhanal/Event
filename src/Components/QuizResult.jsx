import { useEffect, useState } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import { Award, UserCheck, Medal } from 'lucide-react'; // Importing icons from lucide-react
import Navbar from "./Navbar";

const QuizResult = () => {
  const { quizId } = useParams();
  const navigate = useNavigate(); // Initialize useNavigate hook
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

  const handleViewProfile = (participantId) => {
    navigate(`/profile/${participantId}`); // Navigate to the profile page
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-4xl font-semibold text-center text-black mb-10">Quiz Results</h2>
        {results.length > 0 ? (
          <div className="space-y-6">
            {sortedResults.map((participant, index) => {
              // Determine the background color, ranking, and icons
              let bgColor = "";
              let rank = "";
              let Icon = null;
              switch (index) {
                case 0:
                  bgColor = "bg-gradient-to-r from-yellow-400 to-yellow-500"; // Gold
                  rank = "1st";
                  Icon = <Award className="text-white" size={24} />;
                  break;
                case 1:
                  bgColor = "bg-gradient-to-r from-gray-300 to-gray-400"; // Silver
                  rank = "2nd";
                  Icon = <Medal className="text-white" size={24} />;
                  break;
                case 2:
                  bgColor = "bg-gradient-to-r from-amber-500 to-amber-600"; // Bronze
                  rank = "3rd";
                  Icon = <Medal className="text-white" size={24} />;
                  break;
                default:
                  bgColor = "bg-white"; // Default for others
                  rank = `${index + 1}th`;
                  Icon = <UserCheck className="text-gray-600" size={24} />;
                  break;
              }

              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center justify-between p-5 rounded-lg shadow-md hover:shadow-lg transition-all ease-in-out duration-300 ${bgColor} text-black`}
                >
                  <div className="flex items-center space-x-6 mb-4 md:mb-0">
                    {Icon}
                    <div className="space-y-2">
                      <p className="text-xl font-medium text-black">{rank} - {participant.user.name}</p>
                      <p className="text-md text-gray-700">{participant.user.email}</p>
                      <button
                        onClick={() => handleViewProfile(participant.user._id)} // View Profile button
                        className="text-black hover:text-gray-800 transition-colors duration-200 text-sm"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                  <div className="text-3xl font-semibold mt-4 md:mt-0 text-black">{participant.score}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-black">No results available.</p>
        )}
      </div>
    </div>
  );
};

export default QuizResult;
