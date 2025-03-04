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
        // Remove the deleted quiz from the state
        setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
      } else {
        console.error("Error deleting quiz:", data.message);
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div >
      
   
    
    
     
      
   
      <div className="flex justify-center space-x-4 my-6">
      <button
          className="px-6 py-2 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
          onClick={() => navigate("/:id/recruiter-home")}
        >
          Back to Home Page
        </button>
        <button className="px-6 py-2 bg-blue-500 text-white rounded shadow" onClick={() => navigate('/:id/recruiter-home/my-posted-jobs')}>
          My Posted Jobs
        </button>
        <button className="px-6 py-2 bg-green-500 text-white rounded shadow" onClick={() => navigate('/my-quizzes')}>
          My Posted Quiz
        </button>
        <button className="px-6 py-2 bg-purple-500 text-white rounded shadow" onClick={() => navigate('/my-hackathons')}>
          My Created Hackathon
        </button>
      </div>
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">My Posted Quizzes</h2>
      {quizzes.length === 0 ? (
        <p className="text-center text-gray-500">No quizzes posted yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-white p-5 shadow-md rounded-lg">
              <h3 className="text-lg font-semibold">{quiz.title}</h3>
              <p className="text-gray-600">{quiz.description}</p>
              <div className="mt-3 flex space-x-4">
                <button
                  onClick={() => navigate(`/quiz/results/${quiz._id}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  See Participants
                </button>
                <button
                  onClick={() => handleDeleteQuiz(quiz._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
  );
};

export default MyPostedQuiz;
