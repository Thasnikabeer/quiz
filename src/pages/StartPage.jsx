import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const StartPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="bg-gradient-to-br from-primary-100 to-white min-h-screen w-full flex items-center justify-center p-4">
      <div className="max-w-5xl w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row animate-fade-in border border-primary-200">
        <div className="md:w-1/2 w-full relative ">
        <div data-aos="zoom-out-left">
        <img
            src="https://media.istockphoto.com/id/1186386668/vector/quiz-in-comic-pop-art-style-quiz-brainy-game-word-vector-illustration-design.jpg?s=612x612&w=0&k=20&c=mBQMqQ6kZuC9ZyuV5_uCm80QspqSJ7vRm0MfwL3KLZY="
            alt="Quiz Intro"
            className="object-cover w-full h-full"
          />
        </div>
          
        </div>

        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-primary-600 mb-2">
            Welcome to QuizApp
          </h1>
          <p className="text-gray-600 mb-6">
            Create, customize, and share your own quizzes with our intuitive quiz builder. 
            Start crafting your perfect quiz in minutes!
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => navigate("/builder")}
              className="w-1/2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-semibold transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-300 shadow-lg shadow-primary-500/20"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;