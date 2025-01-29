import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const QuizPlay = ({ quizId }) => {
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:4000/api/quiz/${quizId}`);
        setQuiz(response.data);
      } catch (error) {
        console.error('Error fetching quiz:', error);
        alert('Error fetching quiz. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    if (selectedOption === quiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < quiz.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (!quiz) {
    return <div>Quiz not found.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-6">{quiz.title}</h2>

          {isFinished ? (
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">Quiz Completed!</h3>
              <p className="text-lg">Your Score: {score} / {quiz.questions.length}</p>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-bold mb-4">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </h3>
              <p className="mb-4">{quiz.questions[currentQuestionIndex].question}</p>
              <ul className="mb-6">
                {quiz.questions[currentQuestionIndex].options.map((option, index) => (
                  <li
                    key={index}
                    className={`p-2 border rounded mb-2 cursor-pointer hover:bg-blue-100 ${
                      selectedOption === index ? 'bg-blue-200' : ''
                    }`}
                    onClick={() => handleOptionSelect(index)}
                  >
                    {String.fromCharCode(65 + index)}. {option}
                  </li>
                ))}
              </ul>
              <button
                onClick={handleNextQuestion}
                disabled={selectedOption === null}
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
              >
                {currentQuestionIndex + 1 === quiz.questions.length ? 'Finish Quiz' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPlay;
