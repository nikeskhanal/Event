import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // To capture quizId from the URL

const QuizPlay = () => {
  const { quizId } = useParams(); // Extract quizId from the URL
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the quiz from the server when the component mounts or quizId changes
 // Dependency array includes quizId to refetch quiz when it changes
 useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/quiz/${quizId}`);
        setQuiz(response.data); // Set the quiz data
        setLoading(false); // Stop loading
      } catch (err) {
        console.error('Error fetching quiz:', err);
        setError('Failed to load quiz. Please try again later.');
        setLoading(false); // Stop loading
      }
    };
  
    if (quizId) {
      fetchQuiz();
    }
  }, [quizId]);
  

  // Handle answer selection
  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));
  };

  // Submit the answers
  const handleSubmit = async () => {
    const isFormValid = quiz.questions.every(
      (question) => answers[question._id] !== undefined
    );

    if (!isFormValid) {
      alert('Please answer all the questions');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/quiz/${quizId}/submit`,
        { answers },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert(`Your score: ${response.data.score}/${quiz.questions.length}`);
    } catch (err) {
      console.error(err);
      alert('Error submitting answers');
    }
  };

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!quiz) {
    return <div>No quiz found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-6">{quiz.title}</h2>
        <p className="mb-6">{quiz.description}</p>

        {quiz.questions.map((question, index) => (
          <div key={index} className="mb-6">
            <p className="font-medium">{index + 1}. {question.question}</p>
            <div className="space-y-2">
              {question.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center">
                  <input
                    type="radio"
                    id={`q${index}-opt${optIndex}`}
                    name={`question-${index}`}
                    value={optIndex}
                    checked={answers[question._id] === optIndex}
                    onChange={() => handleAnswerChange(question._id, optIndex)}
                    className="mr-2"
                  />
                  <label htmlFor={`q${index}-opt${optIndex}`}>{String.fromCharCode(65 + optIndex)}. {option}</label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
        >
          Submit Answers
        </button>
      </div>
    </div>
  );
};

export default QuizPlay;
