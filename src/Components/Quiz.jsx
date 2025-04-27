import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Quiz = () => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    questions: [],
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, { questionText: "", options: [] }],
    });
  };

  const removeQuestion = (qIndex) => {
    const updatedQuestions = quizData.questions.filter((_, index) => index !== qIndex);
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const addOption = (qIndex) => {
    const updatedQuestions = [...quizData.questions];
    if (updatedQuestions[qIndex].options.length < 4) {
      updatedQuestions[qIndex].options.push({ optionText: "", isCorrect: false });
      setQuizData({ ...quizData, questions: updatedQuestions });
    }
  };

  const removeOption = (qIndex, oIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].options = updatedQuestions[qIndex].options.filter((_, index) => index !== oIndex);
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (qIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].questionText = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].options[oIndex].optionText = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleOptionCorrectness = (qIndex, oIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[qIndex].options.forEach((opt, i) => {
      opt.isCorrect = i === oIndex;
    });
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage({ type: "error", text: "You must be logged in to create a quiz." });
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:4000/api/quiz/create", quizData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ type: "success", text: "Quiz created successfully!" });
      setQuizData({ title: "", description: "", questions: [] });
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      setMessage({ type: "error", text: "Failed to create quiz. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl">
      <button
          onClick={() => navigate("/recruiter-home")}
          className="mb-6 flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-700 transition transform hover:scale-105 shadow-md"
        >
          Back
        </button>
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create a Quiz</h2>
        {message && (
          <div className={`mb-4 p-3 rounded ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="title" placeholder="Quiz Title" value={quizData.title} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" required />
          <textarea name="description" placeholder="Quiz Description" value={quizData.description} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500" required></textarea>
          {quizData.questions.map((q, qIndex) => (
            <div key={qIndex} className="p-4 border rounded-lg bg-gray-50">
              <input type="text" placeholder="Question Text" value={q.questionText} onChange={(e) => handleQuestionChange(qIndex, e.target.value)} className="w-full p-2 border rounded mb-2 focus:ring-2 focus:ring-blue-500" required />
              {q.options.map((opt, oIndex) => (
                <div key={oIndex} className="flex items-center mb-2 space-x-2">
                  <input type="text" placeholder="Option Text" value={opt.optionText} onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" required />
                  <input type="radio" name={`correct-${qIndex}`} checked={opt.isCorrect} onChange={() => handleOptionCorrectness(qIndex, oIndex)} className="ml-2" />
                  <button type="button" onClick={() => removeOption(qIndex, oIndex)} className="text-red-500">✖</button>
                </div>
              ))}
              <button type="button" onClick={() => addOption(qIndex)} className="text-blue-500 mt-2" disabled={q.options.length >= 4}>+ Add Option</button>
              <button type="button" onClick={() => removeQuestion(qIndex)} className="text-red-500 ml-4">Remove Question</button>
            </div>
          ))}
          <button type="button" onClick={addQuestion} className="text-green-500 mb-4">+ Add Question</button>
          <button type="submit" className={`w-full py-2 rounded text-white font-bold transition duration-200 ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`} disabled={loading}>{loading ? "Creating..." : "Create Quiz"}</button>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
