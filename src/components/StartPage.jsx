import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-200 min-h-screen w-full flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left: Image/Video Section */}
        <div className="md:w-1/2 w-full relative">
          <img
            src="https://media.istockphoto.com/id/1186386668/vector/quiz-in-comic-pop-art-style-quiz-brainy-game-word-vector-illustration-design.jpg?s=612x612&w=0&k=20&c=mBQMqQ6kZuC9ZyuV5_uCm80QspqSJ7vRm0MfwL3KLZY="
            alt="Quiz Intro"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right: Content Section */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome to the quiz world
          </h1>
          <p className="text-gray-600 mb-6">
            Add a short description about your quiz here.
          </p>
          <div className="flex justify-center">
            <button onClick={() => navigate("/builder")}
              className="w-1/2 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full font-semibold transition duration-300">
              Start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
