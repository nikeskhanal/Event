import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:4000/api/quiz', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setQuizzes(response.data.quizzes);
    } catch (error) {
      setError('Error fetching quizzes');
      console.error(error);
    }
    setLoading(false);
  };

  const deleteQuiz = async (quizId) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;
    setLoading(true);
    try {
      await axios.delete(`http://localhost:4000/api/quiz/${quizId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
    } catch (error) {
      setError('Error deleting quiz');
      console.error(error);
    }
    setLoading(false);
  };

  const viewParticipants = async (quizId) => {
    setSelectedQuiz(quizId);
    setParticipants([]);
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:4000/api/quiz/results/${quizId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setParticipants(response.data.participants);
    } catch (error) {
      setError('Error fetching participants');
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">My Quizzes</h2>
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="space-y-6">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-gray-700">{quiz.title}</h3>
            <p className="text-gray-600 mb-4">{quiz.description}</p>
            <p className="text-sm text-gray-500">Created by: {quiz.creator?.name || 'Unknown'}</p>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => deleteQuiz(quiz._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
              <button
                onClick={() => viewParticipants(quiz._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                View Participants
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedQuiz && participants.length > 0 && (
        <div className="mt-8 p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Leaderboard</h3>
          <table className="min-w-full table-auto border-collapse text-left">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-gray-700">Name</th>
                <th className="px-4 py-2 border-b text-gray-700">Score</th>
                <th className="px-4 py-2 border-b text-gray-700">Percentage</th>
                <th className="px-4 py-2 border-b text-gray-700">Completed At</th>
              </tr>
            </thead>
            <tbody>
              {participants
                .sort((a, b) => b.score - a.score)
                .map((participant, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{participant.user?.name || 'N/A'}</td>
                    <td className="px-4 py-2 border-b">{participant.score}</td>
                    <td className="px-4 py-2 border-b">{participant.percentage}%</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(participant.completedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminQuiz;
