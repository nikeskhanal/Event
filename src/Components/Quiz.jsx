import { useState } from "react"; 
import axios from "axios";

const Quiz = () => {
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

  const validateQuiz = () => {
    if (!quizData.title || !quizData.description) return "Title and description are required.";
    for (const question of quizData.questions) {
      if (!question.questionText) return "Each question must have text.";
      if (question.options.length < 2) return "Each question must have at least two options.";
      if (!question.options.some((opt) => opt.isCorrect)) return "Each question must have at least one correct answer.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateQuiz();
    if (error) {
      setMessage({ type: "error", text: error });
      return;
    }

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
      console.error("Error creating quiz", error);
      setMessage({ type: "error", text: "Failed to create quiz. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const confirmRemoval = (action) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      action();
    }
  };

  const isFormValid = quizData.title && quizData.description && quizData.questions.length > 0 && !validateQuiz();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create a Quiz</h2>

      {message && (
        <div className={`p-2 mb-4 rounded text-white ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Quiz Title"
          value={quizData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          name="description"
          placeholder="Quiz Description"
          value={quizData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        ></textarea>

        {quizData.questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-4 p-4 border rounded">
            <input
              type="text"
              placeholder="Question Text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            {q.options.map((opt, oIndex) => (
              <div key={oIndex} className="flex items-center mb-2">
                <input
                  type="text"
                  placeholder="Option Text"
                  value={opt.optionText}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={opt.isCorrect}
                  onChange={() => handleOptionCorrectness(qIndex, oIndex)}
                  className="ml-2"
                />
                <button
                  type="button"
                  onClick={() => confirmRemoval(() => removeOption(qIndex, oIndex))}
                  className="ml-2 text-red-500"
                >
                  ✖
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addOption(qIndex)}
              className="text-blue-500 mt-2"
              disabled={q.options.length >= 4}
            >
              + Add Option
            </button>
            <button
              type="button"
              onClick={() => confirmRemoval(() => removeQuestion(qIndex))}
              className="text-red-500 ml-4"
            >
              Remove Question
            </button>
          </div>
        ))}

        <button type="button" onClick={addQuestion} className="text-green-500 mb-4" disabled={quizData.questions.length >= 10}>
          + Add Question
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded w-full"
          disabled={!isFormValid || loading}
        >
          {loading ? "Creating..." : "Create Quiz"}
        </button>
      </form>
    </div>
  );
};

export default Quiz;
