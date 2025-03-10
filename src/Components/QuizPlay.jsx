import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
      .catch((error) => console.error('Error fetching quizzes:', error));
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
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
      const name = localStorage.getItem("name");  // Ensure you're retrieving name correctly
  
      const formattedAnswers = Object.keys(userAnswers).map((questionId) => ({
        questionId, 
        selectedOption: userAnswers[questionId],
      }));
  
      console.log("Submitting quiz:", { formattedAnswers, name, token });
  
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
  
      if (response.data.error && response.data.error === 'You have already submitted the quiz') {
        setErrorMessage("You have already submitted the quiz.");
        return;
      }
  
      console.log("Server response:", response.data);
      setScore(response.data.score);
      setHasSubmitted(true);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error submitting quiz:", error.response || error);
      setErrorMessage("Failed to submit quiz. Please try again.");
    }
  };

  const fetchQuizResults = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/quiz/results/${selectedQuiz._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setQuizResults(response.data.results);
    } catch (error) {
      console.error("Error fetching quiz results:", error);
    }
  };

  // Handle redirect to QuizResult page
  const handleViewLeaderboard = () => {
    navigate(`/quiz-result/${selectedQuiz._id}`); // Redirect to QuizResult with quizId
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Available Quizzes</h2>

      {!selectedQuiz ? (
        <ul className="space-y-2">
          {quizzes?.length > 0 ? (
            quizzes.map((quiz) => (
              <li key={quiz._id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                <div>
                  <span className="text-lg font-semibold">{quiz.title}</span>
                  <p className="text-sm text-gray-500">Created by: {quiz.creator?.name || 'Unknown'}</p>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => handleJoinQuiz(quiz)}
                >
                  Join
                </button>
              </li>
            ))
          ) : (
            <p className="text-gray-600">No quizzes available.</p>
          )}
        </ul>
      ) : (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">{selectedQuiz.title}</h3>
          <p className="text-sm text-gray-500 mb-4">Created by: {selectedQuiz.creator?.name || 'Unknown'}</p>

          {errorMessage && (
            <p className="text-red-500 bg-red-100 p-2 rounded mb-4">{errorMessage}</p>
          )}

          {selectedQuiz.questions?.map((question) => (
            <div key={question._id} className="mb-4">
              <p className="font-medium">{question.questionText}</p>
              {question.options?.map((option) => (
                <label key={option._id} className="block cursor-pointer">
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
          ))}

          <button
            className={`px-4 py-2 rounded-lg mt-4 transition ${hasSubmitted ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"}`}
            onClick={handleSubmitQuiz}
            disabled={hasSubmitted}
          >
            {hasSubmitted ? "Submitted" : "Submit"}
          </button>

          {score !== null && (
            <p className="mt-4 text-lg font-bold">Your Score: {score} / {selectedQuiz.questions?.length || 0}</p>
          )}

         
          {quizResults.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-4">Results</h4>
              <ul>
                {quizResults.map((result) => (
                  <li key={result._id} className="mb-2">
                    <p>{result.userName}: {result.score} / {selectedQuiz.questions.length}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPlay;
