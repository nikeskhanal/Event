import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizDescription, setQuizDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (e) => {
    setCurrentQuestion(e.target.value);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(Number(e.target.value)); // Ensure correctAnswer is stored as a number
  };

  const handleAddQuestion = () => {
    if (
      currentQuestion.trim() &&
      options.every((opt) => opt.trim()) &&
      correctAnswer !== ''
    ) {
      setQuestions([
        ...questions,
        { question: currentQuestion, options, correctAnswer },
      ]);
      setCurrentQuestion('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
    } else {
      alert('Please fill in the question, all options, and select a correct answer!');
    }
  };

  const handleSubmitQuiz = async () => {
    let newErrors = {};
    if (!quizTitle.trim()) newErrors.title = 'Title is required.';
    if (!quizDescription.trim()) newErrors.description = 'Description is required.';
    if (questions.length === 0) newErrors.questions = 'Add at least one question.';
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);

      const quizId = `quiz-${Date.now()}`; // Example: Unique quizId generation based on current time

      const response = await axios.post('http://localhost:4000/api/quiz', {
        quizId,
        title: quizTitle,
        description: quizDescription,
        questions,
      });

      console.log('Quiz submitted successfully:', response.data);
      alert('Quiz submitted successfully');
      setQuizTitle('');
      setQuizDescription('');
      setQuestions([]);
      setErrors({});
    } catch (error) {
      console.error(
        'Error submitting quiz:',
        error.response ? error.response.data : error.message
      );
      alert('Error submitting quiz.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-6">Create a Quiz</h2>

          {/* Quiz Title */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Quiz Title</label>
            <input
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter quiz title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Quiz Description */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Quiz Description</label>
            <textarea
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
              className={`w-full p-2 border rounded ${errors.description ? 'border-red-500' : ''}`}
              placeholder="Enter quiz description"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Question */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Question</label>
            <input
              type="text"
              value={currentQuestion}
              onChange={handleQuestionChange}
              className="w-full p-2 border rounded"
              placeholder="Enter your question"
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {options.map((option, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-2 font-medium">Option {index + 1}</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder={`Enter option ${index + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Correct Answer */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Select Correct Answer</label>
            <select
              value={correctAnswer}
              onChange={handleCorrectAnswerChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Correct Answer</option>
              {options.map((option, index) => (
                <option key={index} value={index}>
                  {String.fromCharCode(65 + index)}. {option}
                </option>
              ))}
            </select>
          </div>

          {/* Add Question */}
          <button
            onClick={handleAddQuestion}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Add Question
          </button>

          {/* Questions Added */}
          <div className="mt-6">
            <h3 className="text-lg font-bold mb-4">Questions Added:</h3>
            {questions.map((item, index) => (
              <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
                <p className="font-medium">
                  {index + 1}. {item.question}
                </p>
                <ul className="mt-2">
                  {item.options.map((opt, optIndex) => (
                    <li key={optIndex} className="text-gray-700">
                      {String.fromCharCode(65 + optIndex)}. {opt}
                      {optIndex === item.correctAnswer && (
                        <span className="text-green-500 ml-2">(Correct)</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          {questions.length > 0 && (
            <button
              onClick={handleSubmitQuiz}
              className="mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600"
            >
              {loading ? 'Submitting...' : 'Submit Quiz'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
