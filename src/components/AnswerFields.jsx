import React from "react";

export default function AnswerFields({
  answerType,
  answers,
  onAnswerChange,
  onAddAnswer,
  onRemoveAnswer,
}) {
  if (
    answerType === "choices" ||
    answerType === "imageChoices" ||
    answerType === "emojis"
  ) {
    return (
      <div>
        {answers.map((ans, idx) => (
          <div key={idx} className="flex items-center mb-2">
            <input
              type="text"
              className="border px-2 py-1 mr-2 rounded"
              placeholder={`enter your answer`}
              value={ans}
              onChange={(e) => onAnswerChange(idx, e.target.value)}
            />
            {answers.length > 1 && (
              <button
                className="text-red-500"
                onClick={() => onRemoveAnswer(idx)}
                type="button"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button className="text-blue-500 mt-2 bg-green-200" onClick={onAddAnswer} type="button">
          + Add answer
        </button>
      </div>
    );
  }
  if (answerType === "input") {
    return (
      <input
        type="text"
        className="border px-2 py-1 rounded mt-2"
        placeholder="User will type the answer"
        disabled
      />
    );
  }
  return null;
}
