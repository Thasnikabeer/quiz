import { Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

const QuestionList = ({
  questions,
  userAnswers = {},
  onUserAnswer,
  onRemoveQuestion,
  onEditQuestion
}) => {
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {questions.map((question, index) => {
        const userAnswer = userAnswers[question.id];

        // Helper to render the user's answer
        const renderUserAnswer = () => {
          if (userAnswer === undefined || userAnswer === null || userAnswer === '') return null;

          // File/image answer
          if (question.type === 'file') {
            if (userAnswer.url) {
              return (
                <div className="mt-2">
                  <span className="font-medium text-gray-700 mr-2">Your Answer:</span>
                  <img
                    src={userAnswer.url}
                    alt="Uploaded"
                    className="inline-block w-20 h-20 object-cover rounded border"
                  />
                </div>
              );
            }
            // If only a string (URL), show it as image
            if (typeof userAnswer === 'string') {
              return (
                <div className="mt-2">
                  <span className="font-medium text-gray-700 mr-2">Your Answer:</span>
                  <img
                    src={userAnswer}
                    alt="Uploaded"
                    className="inline-block w-20 h-20 object-cover rounded border"
                  />
                </div>
              );
            }
            // Otherwise, fallback
            return (
              <div className="mt-2">
                <span className="font-medium text-gray-700 mr-2">Your Answer:</span>
                <span className="italic text-gray-500">[No image uploaded]</span>
              </div>
            );
          }

          // Date answer
          if (question.type === 'date') {
            return (
              <div className="mt-2">
                <span className="font-medium text-gray-700 mr-2">Your Answer:</span>
                <span className="text-gray-800">{userAnswer}</span>
              </div>
            );
          }

          // Slider/rating answer
          if (question.type === 'slider' || question.type === 'rating') {
            return (
              <div className="mt-2">
                <span className="font-medium text-gray-700 mr-2">Your Answer:</span>
                <span className="text-gray-800">{userAnswer}</span>
              </div>
            );
          }

          // Multiple choice or dropdown (text or image)
          if (
            (question.type === 'multiple-choice' || question.type === 'dropdown') &&
            question.answers
          ) {
            const answer = question.answers[userAnswer];
            if (!answer) return null;
            if (answer.url) {
              // It's an image option
              return (
                <div className="mt-2">
                  <span className="font-medium text-gray-700 mr-2">Your Answer:</span>
                  <img
                    src={answer.url}
                    alt="Selected"
                    className="inline-block w-20 h-20 object-cover rounded border"
                  />
                </div>
              );
            }
            // Text option
            return (
              <div className="mt-2">
                <span className="font-medium text-gray-700 mr-2">Your Answer:</span>
                <span className="text-gray-800">{answer}</span>
              </div>
            );
          }

          // Text answer
          if (question.type === 'text') {
            return (
              <div className="mt-2">
                <span className="font-medium text-gray-700 mr-2">Your Answer:</span>
                <span className="text-gray-800">{userAnswer}</span>
              </div>
            );
          }

          return null;
        };

        return (
          <div
            key={question.id}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md"
          >
            <div
              className="p-4 cursor-pointer flex justify-between items-center"
              onClick={() => toggleExpand(question.id)}
            >
              <div>
                <span className="font-medium text-gray-500 mr-2">Q{index + 1}.</span>
                <span className="text-gray-800">{question.text}</span>
                <span className="ml-2 text-xs text-gray-400">({question.type})</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditQuestion(question);
                  }}
                  className="p-1 text-gray-400 hover:text-primary-600"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveQuestion(question.id);
                  }}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Show user's answer here */}
            {renderUserAnswer()}

            {expandedId === question.id && (
              <div className="border-t border-gray-200 bg-gray-50 p-4">
                {['multiple-choice', 'dropdown'].includes(question.type) ? (
                  <>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Answer Options:</h4>
                    <ul className="space-y-1">
                      {question.answers.map((answer, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <span
                            className={`h-5 w-5 flex-shrink-0 rounded-full flex items-center justify-center text-xs ${
                              i === question.correctAnswerIndex
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {i === question.correctAnswerIndex ? '✓' : i + 1}
                          </span>
                          <span className={i === question.correctAnswerIndex ? 'text-green-700' : ''}>
                            {answer.url ? (
                              <img
                                src={answer.url}
                                alt={`Option ${i + 1}`}
                                className="inline-block w-10 h-10 object-cover rounded"
                              />
                            ) : (
                              answer
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <p className="italic text-gray-500">
                    {question.type === 'text' && '[Text Input]'}
                    {question.type === 'file' && '[File Upload]'}
                    {question.type === 'date' && '[Date Picker]'}
                    {question.type === 'rating' && '[Rating Scale]'}
                  </p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default QuestionList;
