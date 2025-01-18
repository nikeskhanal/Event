import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TakeQuiz = () => {
  const { quizId } = useParams();  // Retrieve the quizId from the URL parameter
  const [quiz, setQuiz] = useState(null);  // To store quiz data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState('');  // Error state

  // Fetch quiz details when the component mounts
  useEffect(() => {
    if (!quizId) {
      setError('Invalid quiz ID.');
      setLoading(false);
      return;
    }

    const fetchQuiz = async () => {
      try {
        // Make a GET request to the backend API
        const response = await axios.get(`http://localhost:4000/api/quiz/${quizId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`  // Pass JWT token if required
          }
        });
        setQuiz(response.data);  // Set quiz data in state
        setLoading(false);  // Update loading state
      } catch (err) {
        setError('Failed to fetch quiz. Please try again later.');
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold">{quiz.title}</h2>
      <p className="text-gray-600 mb-4">{quiz.description}</p>

      {/* Render questions and options */}
      {quiz.questions.map((question) => (
        <div key={question._id} className="mb-4">
          <p className="font-medium">{question.question}</p>
          <ul>
            {question.options.map((option, optIndex) => (
              <li key={optIndex} className="mb-2">
                <label>
                  <input
                    type="radio"
                    name={`question-${question._id}`}
                    value={optIndex}
                    // Handle answer change logic
                    className="mr-2"
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TakeQuiz;
