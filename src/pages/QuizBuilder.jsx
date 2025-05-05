import { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import QuestionList from '../components/QuestionList';

const QuizBuilder = () => {
  const [questions, setQuestions] = useState([]);
//   const [quizTitle, setQuizTitle] = useState('');
  
  const addQuestion = (question) => {
    setQuestions([...questions, { ...question, id: Date.now().toString() }]);
  };
  
  const removeQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };
  
  const editQuestion = (updatedQuestion) => {
    setQuestions(
      questions.map(q => q.id === updatedQuestion.id ? updatedQuestion : q)
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-primary-800 mb-4">Create Your Quiz</h1>
        <hr className="my-6 border-gray-200" />
        <QuestionForm onAddQuestion={addQuestion} />
      </div>
      
      {questions.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 animate-slide-in">
          <h2 className="text-xl font-semibold text-primary-700 mb-4">
            Questions ({questions.length})
          </h2>
          <QuestionList 
            questions={questions} 
            onRemoveQuestion={removeQuestion}
            onEditQuestion={editQuestion}
          />
          
          <div className="mt-6 flex justify-end">
            <button
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 transition duration-200"
            >
              Save Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizBuilder;