import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Takequiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch quizzes from the backend
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/quizzes"); // Adjust your backend URL
        setQuizzes(response.data);
      } catch (err) {
        setError("Failed to fetch quizzes");
      }
    };
    fetchQuizzes();
  }, []);

  // Handle quiz selection
  const handleSelectQuiz = (quiz) => {
    setSelectedQuiz(quiz);
  };

  // Handle answer change
  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/submit-quiz/${selectedQuiz._id}`, // Adjust the API endpoint
        {
          answers: userAnswers,
        }
      );
      alert("Quiz submitted successfully!");
      navigate("/dashboard"); // Redirect to a dashboard or another page after submission
    } catch (err) {
      setError("Failed to submit quiz");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-4">Take a Quiz</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quizzes.map((quiz) => (
          <div
            key={quiz._id}
            className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100"
            onClick={() => handleSelectQuiz(quiz)}
          >
            <h2 className="text-xl font-bold">{quiz.title}</h2>
            <p>{quiz.description}</p>
          </div>
        ))}
      </div>

      {selectedQuiz && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">{selectedQuiz.title}</h2>
          {selectedQuiz.questions.map((question) => (
            <div key={question._id} className="mb-4">
              <p className="font-medium">{question.text}</p>
              <div className="space-y-2">
                {question.options.map((option, idx) => (
                  <div key={idx} className="flex items-center">
                    <input
                      type="radio"
                      id={`${question._id}-${option}`}
                      name={question._id}
                      value={option}
                      checked={userAnswers[question._id] === option}
                      onChange={() => handleAnswerChange(question._id, option)}
                      className="mr-2"
                    />
                    <label htmlFor={`${question._id}-${option}`} className="text-gray-700">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Takequiz;
