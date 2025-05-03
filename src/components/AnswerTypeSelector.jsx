import React from "react";

export default function AnswerTypeSelector({ types, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {types.map((type) => (
        <button
          key={type.key}
          className={`px-3 py-1 rounded border ${
            selected === type.key ? "bg-blue-500 text-white" : "bg-gray-100"
          }`}
          onClick={() => onSelect(type.key)}
          type="button"
        >
          {type.label}
        </button>
      ))}
    </div>
  );
}
