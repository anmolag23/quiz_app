import { useState, useEffect } from "react";
import questionsData from "../data/questions.json";
import { useNavigate } from "react-router-dom";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30); //  Timer state
  const navigate = useNavigate();

  useEffect(() => {
    setQuestions(questionsData);
  }, []);

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(30);
  }, [current]);

  // Countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      handleTimeout(); // Auto move when time finishes
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [current]: option });
  };

  const nextQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      finishQuiz();
    }
  };

  const prevQuestion = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const skipQuestion = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    }
  };

   // ⬅️ Called when time runs out
  const handleTimeout = () => {
    if (!answers[current]) {
      setAnswers({ ...answers, [current]: "Not Answered" });
    }
    nextQuestion();
  };

  const finishQuiz = () => {
    navigate("/results", { state: { questions, answers } });
  };

  if (questions.length === 0) return <p className="text-center mt-10">Loading...</p>;

  const q = questions[current];

  // Calculate live score
  const score = Object.keys(answers).reduce((acc, key) => {
    return answers[key] === questions[key].answer ? acc + 1 : acc;
  }, 0);

  const progress = ((current + 1) / questions.length) * 100;

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6 sm:p-8">
        {/* 🔹 App Title */}
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-600 to-pink-600 text-transparent bg-clip-text">
          The Quiz App
        </h1>

        {/* Progress Bar + Score + Timer */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 text-sm sm:text-base">
            <span className="text-gray-700">
              Question {current + 1} of {questions.length}
            </span>
            <span className="font-semibold text-green-600">Score: {score}</span>
            <span className="font-bold text-red-600">
              ⏳ {timeLeft}s
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2.5 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <p className="text-lg font-medium mb-6 text-gray-800">{q.question}</p>

        {/* Options */}
        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt)}
              disabled={timeLeft === 0}
              className={`block w-full px-4 py-3 rounded-lg border text-left transition text-sm sm:text-base shadow-sm ${
                answers[current] === opt
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-gray-50 hover:bg-indigo-50 border-gray-300 text-gray-700"
              } ${timeLeft === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {opt}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8">
          <button
            onClick={prevQuestion}
            disabled={current === 0}
            className="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded-lg disabled:opacity-50 shadow-md"
          >
            Previous
          </button>

          {current < questions.length - 1 ? (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <button
                onClick={skipQuestion}
                className="w-full sm:w-auto px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600"
                disabled={timeLeft === 0}
              >
                Skip
              </button>
              <button
                onClick={nextQuestion}
                className="w-full sm:w-auto px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 disabled:opacity-50"
                disabled={!answers[current] || timeLeft === 0}
              >
                Next
              </button>
            </div>
          ) : (
            <button
              onClick={finishQuiz}
              className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:opacity-90"
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}