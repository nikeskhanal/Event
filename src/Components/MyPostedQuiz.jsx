import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const MyPostedQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/api/quiz/my-quizzes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setQuizzes(data.quizzes);
        } else {
          console.error("Error fetching quizzes:", data.message);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDeleteQuiz = async (quizId) => {
    if (!window.confirm("Are you sure you want to delete this quiz?")) return;
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:4000/api/quiz/${quizId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
        alert("Quiz deleted successfully.");
      } else {
        console.error("Error deleting quiz:", data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 p-6">
      {/* Navigation */}
      <div className="flex justify-center space-x-4 mb-6">
        <button className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow-md hover:bg-gray-800 transition" onClick={() => navigate("/recruiter-home")}>Home</button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition" onClick={() => navigate("/my-posted-jobs")}>My Jobs</button>
        <button className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition" onClick={() => navigate("/my-quizzes")}>My Quizzes</button>
        <button className="px-6 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition" onClick={() => navigate("/my-hackathons")}>My Hackathons</button>
      </div>

      {/* Quiz Listings */}
      <div className="container mx-auto max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">My Posted Quizzes</h2>

        {quizzes.length === 0 ? (
          <p className="text-center text-gray-500">No quizzes posted .</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quizzes.map((quiz) => (
              <div key={quiz._id} className="bg-gray-100 shadow-md rounded-lg p-6 hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-gray-800">{quiz.title}</h3>
                <p className="text-gray-600 mt-2">{quiz.description}</p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => navigate(`/quiz/results/${quiz._id}`)}
                    className="px-5 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                  >
                    See Participants
                  </button>
                  <button
                    onClick={() => handleDeleteQuiz(quiz._id)}
                    className="px-5 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
                  >
                    Delete Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default MyPostedQuiz;