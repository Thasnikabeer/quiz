import React, { useState } from "react";
import answerTypes from "../assets/answerType.json";
import AnswerTypeSelector from "./AnswerTypeSelector";
import AnswerFields from "./AnswerFields";

export default function QuizBuilder() {
    const [questions, setQuestions] = useState([
        { question: "", answerType: "", answers: [""] },
      ]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
  
    // Reset answers if answerType changes
    if (field === "answerType") {
      newQuestions[index].answers = [""];
    }
  
    setQuestions(newQuestions);
  };
  
  const handleAnswerChange = (qIndex, aIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers[aIndex] = value;
    setQuestions(newQuestions);
  };
  
  const addAnswer = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers.push("");
    setQuestions(newQuestions);
  };
  
  const removeAnswer = (qIndex, aIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].answers = newQuestions[qIndex].answers.filter(
      (_, i) => i !== aIndex
    );
    setQuestions(newQuestions);
  };
  
  const addNewQuestion = () => {
    setQuestions([...questions, { question: "", answerType: "", answers: [""] }]);
  };
  

  return (
    <div className="w-full  rounded shadow  bg-gray-200">
    {questions.map((q, index) => (
      <div key={index} className="mb-6 border p-4 rounded-lg m-2 bg-white">
        <div className="mb-4">
          <label className="block font-bold mb-1">Question {index + 1}</label>
          <input
            type="text"
            className="border px-3 py-2 rounded w-full"
            placeholder="Enter your question"
            value={q.question}
            onChange={(e) =>
              handleQuestionChange(index, "question", e.target.value)
            }
          />
        </div>
  
        <div className="mb-4">
          <label className="block font-bold mb-1">Answer Type</label>
          <AnswerTypeSelector
            types={answerTypes}
            selected={q.answerType}
            onSelect={(type) => handleQuestionChange(index, "answerType", type)}
          />
        </div>
  
        <div>
          <label className="block font-bold mb-1">Answers</label>
          <AnswerFields
            answerType={q.answerType}
            answers={q.answers}
            onAnswerChange={(aIdx, value) => handleAnswerChange(index, aIdx, value)}
            onAddAnswer={() => addAnswer(index)}
            onRemoveAnswer={(aIdx) => removeAnswer(index, aIdx)}
          />
        </div>
      </div>
    ))}
  
    {/* Add New Question Button */}
    <div className="text-center mt-4">
      <button
        onClick={addNewQuestion}
        className="bg-green-900 text-white px-4 py-2 rounded m-3"
      >
        ➕ 
      </button>
    </div>
  </div>
  
  );
}
