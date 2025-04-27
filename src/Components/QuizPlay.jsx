import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeftCircle, CheckCircle } from 'lucide-react';

const QuizPlay = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [quizResults, setQuizResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/api/quiz')
      .then((response) => setQuizzes(response.data.quizzes || []))
      .catch((error) => {
        setErrorMessage('Error fetching quizzes');
        alert('Error fetching quizzes');
        console.error('Error fetching quizzes:', error);
      });
  }, []);

  const handleJoinQuiz = (quiz) => {
    setSelectedQuiz(quiz);
    setUserAnswers({});
    setScore(null);
    setHasSubmitted(false);
    setErrorMessage(null);
    setQuizResults([]);
  };

  const handleAnswerSelect = (questionId, optionId) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmitQuiz = async () => {
    if (!selectedQuiz || hasSubmitted) return;

    if (Object.keys(userAnswers).length !== selectedQuiz.questions.length) {
      setErrorMessage("Please answer all questions before submitting.");
      alert("Please answer all questions before submitting.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("name");

      const formattedAnswers = Object.keys(userAnswers).map((questionId) => ({
        questionId,
        selectedOption: userAnswers[questionId],
      }));

      const response = await axios.post(
        "http://localhost:4000/api/quiz/submit",
        {
          quizId: selectedQuiz._id,
          userAnswers: formattedAnswers,
          userName: name,  
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.error && response.data.error === 'You have already played this quiz') {
        setErrorMessage("You have already played this quiz.");
        alert("You have already played this quiz.");
        return;
      }

      setScore(response.data.score);
      setHasSubmitted(true);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error submitting quiz:", error.response || error);

      if (error.response && error.response.data.error === "You have already played this quiz") {
        setErrorMessage("You have already played this quiz.");
        alert("You have already played this quiz.");
      } else {
        setErrorMessage("Failed to submit quiz. Please try again.");
        alert("Failed to submit quiz. Please try again.");
      }
    }
  };

  const handleViewLeaderboard = (quizId) => {
    navigate(`/user/results/${quizId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-700 flex flex-col items-center px-6 py-10">
      <h2 className="text-4xl font-extrabold text-white drop-shadow-lg mb-8">
        Available Quizzes
      </h2>

      <button
          onClick={() => navigate('/user-home')}
          className="flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition transform hover:scale-105 shadow-md mb-6"
        >
          <ArrowLeftCircle className="w-5 h-5" />
          Back 
      </button>

      {!selectedQuiz ? (
        <div className="space-y-4 w-full max-w-3xl">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <div key={quiz._id} className="p-6 bg-white/40 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-2xl transition-shadow">
                <h3 className="text-2xl font-semibold text-black">{quiz.title}</h3>
                <p className="text-gray-800 mt-2 text-lg">Created by: {quiz.creator?.name || 'Unknown'}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => handleJoinQuiz(quiz)}
                  >
                    Join
                  </button>
                  <button
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                    onClick={() => handleViewLeaderboard(quiz._id)}
                  >
                    See Leaderboard
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-200">No quizzes available.</p>
          )}
        </div>
      ) : (
        <div className="mt-6 bg-white/40 backdrop-blur-md p-6 rounded-2xl shadow-lg w-full max-w-3xl">
          <h3 className="text-2xl font-semibold text-black">{selectedQuiz.title}</h3>
          <p className="text-gray-800 mt-2 text-lg">Created by: {selectedQuiz.creator?.name || 'Unknown'}</p>

          {errorMessage && (
            <p className="text-red-500 bg-red-100 p-2 rounded mt-4">{errorMessage}</p>
          )}

          {selectedQuiz.questions.map((question) => (
            <div key={question._id} className="mb-4">
              <p className="font-medium text-gray-900 text-left">{question.questionText}</p>
              <div className="flex flex-col items-start mt-2">
                {question.options.map((option) => (
                  <label key={option._id} className="cursor-pointer text-gray-800 text-left mb-2">
                    <input
                      type="radio"
                      name={question._id}
                      value={option._id}
                      checked={userAnswers[question._id] === option._id}
                      onChange={() => handleAnswerSelect(question._id, option._id)}
                      className="mr-2"
                    />
                    {option.optionText}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            className={`px-6 py-2 rounded-lg mt-4 transition text-white text-lg font-semibold ${
              hasSubmitted ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={handleSubmitQuiz}
            disabled={hasSubmitted}
          >
            {hasSubmitted ? "Submitted" : "Submit"}
          </button>

          {score !== null && <p className="mt-4 text-lg font-bold text-gray-900">Your Score: {score} / {selectedQuiz.questions.length}</p>}

          {hasSubmitted && (
            <button
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={handleViewLeaderboard}
            >
              see participants
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPlay;
