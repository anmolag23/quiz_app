import { useLocation, useNavigate } from "react-router-dom";

export default function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) return <p>No results found. Start the quiz first.</p>;

  const { questions, answers } = state;
  const score = questions.filter((q, i) => q.answer === answers[i]).length;

  
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-blue-50 to-purple-100 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-purple-700 mb-6 drop-shadow">
        Quiz Results
      </h1>

      {/* Results Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        {/* Score */}
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Your Score:{" "}
          <span className="text-purple-600 font-bold">
            {score}/{questions.length}
          </span>
        </h2>

        {/* Questions Review */}
        <div className="space-y-4">
          {questions.map((q, i) => (
            <div
              key={q.id}
              className="p-4 rounded-lg border transition bg-gray-50 hover:bg-purple-50"
            >
              <p className="font-semibold text-gray-800">{q.question}</p>
              <p className="mt-1">
                Your answer:{" "}
                <span
                  className={
                    answers[i] === q.answer ? "text-green-600 font-medium" : "text-red-600 font-medium"
                  }
                >
                  {answers[i] || "Not Answered"}
                </span>
              </p>
              <p>
                Correct answer:{" "}
                <span className="text-green-600 font-medium">{q.answer}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Restart Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/quiz")}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 active:scale-95 transition"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
}