import { useState, useRef } from 'react';
import { PlusCircle, X, ImagePlus } from 'lucide-react';

const QuestionForm = ({ onAddQuestion, editQuestion }) => {
  const [questionText, setQuestionText] = useState(editQuestion?.text || '');
  const [questionType, setQuestionType] = useState(editQuestion?.type || 'multiple-choice');
  const [answers, setAnswers] = useState(editQuestion?.answers || ['', '', '']);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [error, setError] = useState('');
  const [dateValue, setDateValue] = useState(editQuestion?.date || '');
  const [sliderValue, setSliderValue] = useState(editQuestion?.slider || 5);
  const fileInputRef = useRef();

  const isImageType = questionType === 'file';
  const isDropdownType = questionType === 'dropdown';
  const isSliderType = questionType === 'slider' || questionType === 'rating';
  const isDateType = questionType === 'date';
  const isTextType = questionType === 'text';
  const isMultipleChoice = questionType === 'multiple-choice';

  // For file/image answers, answers is an array of { url, file }
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setAnswers((prev) => [...prev, ...newImages]);
    e.target.value = ''; // reset input
  };

  const removeImage = (idx) => {
    setAnswers((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (questionText.trim() === '') {
      setError('Question text is required');
      return;
    }

    // Validation for each type
    if (isImageType && answers.length === 0) {
      setError('At least one image is required');
      return;
    }
    if ((isMultipleChoice || isDropdownType) && answers.filter(a => a.trim() !== '').length < 2) {
      setError('At least two answer options are required');
      return;
    }
    if ((isMultipleChoice || isDropdownType) && !answers[correctAnswerIndex]) {
      setError('The correct answer cannot be empty');
      return;
    }
    if (isDateType && !dateValue) {
      setError('Please select a date');
      return;
    }
    if (isSliderType && (sliderValue < 1 || sliderValue > 10)) {
      setError('Slider value must be between 1 and 10');
      return;
    }

    onAddQuestion({
      id: editQuestion?.id || '',
      text: questionText,
      type: questionType,
      answers:
        isImageType
          ? answers
          : isDropdownType || isMultipleChoice
          ? answers.map(a => a.trim()).filter(a => a !== '')
          : isDateType
          ? [dateValue]
          : isSliderType
          ? [sliderValue]
          : isTextType
          ? []
          : [],
      correctAnswerIndex:
        isMultipleChoice || isDropdownType ? correctAnswerIndex : null,
      date: isDateType ? dateValue : undefined,
      slider: isSliderType ? sliderValue : undefined,
    });

    setQuestionText('');
    setQuestionType('multiple-choice');
    setAnswers(['', '', '']);
    setCorrectAnswerIndex(0);
    setDateValue('');
    setSliderValue(5);
    setError('');
  };

  const handleAnswerChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const addAnswerOption = () => {
    setAnswers([...answers, '']);
  };

  const removeAnswerOption = (index) => {
    if (answers.length <= 2) {
      setError('At least two answer options are required');
      return;
    }
    const updated = answers.filter((_, i) => i !== index);
    setAnswers(updated);

    if (index === correctAnswerIndex) {
      setCorrectAnswerIndex(0);
    } else if (index < correctAnswerIndex) {
      setCorrectAnswerIndex((prev) => prev - 1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
        <select
          value={questionType}
          onChange={(e) => {
            setQuestionType(e.target.value);
            setAnswers(
              e.target.value === 'file'
                ? []
                : e.target.value === 'slider' || e.target.value === 'rating'
                ? []
                : ['', '', '']
            );
          }}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="multiple-choice">Choices with images</option>
          <option value="dropdown">Dropdown list</option>
          <option value="text">Text Input</option>
          <option value="file">File Upload</option>
          <option value="date">Date</option>
          <option value="slider">Slider</option>
          <option value="rating">Rating</option>
        </select>
      </div>

      <div>
        <label htmlFor="questionText" className="block text-sm font-medium text-gray-700 mb-1">
          Question
        </label>
        <textarea
          id="questionText"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          placeholder="Enter your question..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          rows={2}
        />
      </div>

      {/* IMAGE UPLOAD FOR FILE TYPE */}
      {isImageType && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
          <div className="flex items-center gap-3 mb-2">
            <button
              type="button"
              className="flex items-center px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <ImagePlus size={18} className="mr-2" />
              Add Images
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {answers.length === 0 && (
              <span className="text-gray-400 text-sm">No images uploaded yet.</span>
            )}
            {answers.map((img, idx) => (
              <div key={idx} className="relative w-20 h-20 border rounded overflow-hidden">
                <img
                  src={img.url || img}
                  alt={`Uploaded ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-white bg-opacity-70 rounded-full p-1 text-gray-700 hover:text-red-600"
                  onClick={() => removeImage(idx)}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TEXT OPTIONS FOR MULTIPLE CHOICE/DROPDOWN */}
      {(isMultipleChoice || isDropdownType) && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-gray-700">
              Answer Options
            </label>
            <button
              type="button"
              onClick={addAnswerOption}
              className="flex items-center text-sm text-primary-600 hover:text-primary-800"
            >
              <PlusCircle size={16} className="mr-1" />
              Add Option
            </button>
          </div>

          {answers.map((answer, index) => (
            <div key={index} className="flex items-center space-x-2">
              {isMultipleChoice && (
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctAnswerIndex === index}
                  onChange={() => setCorrectAnswerIndex(index)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-400"
                />
              )}
              <input
                type="text"
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
              {answers.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeAnswerOption(index)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          ))}
          <p className="text-xs text-gray-500">Select the correct answer (if applicable).</p>
        </div>
      )}

      {/* DROPDOWN PREVIEW FOR DROPDOWN TYPE */}
      {isDropdownType && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Dropdown Preview</label>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-lg" disabled>
            {answers.filter(a => a.trim() !== '').map((option, idx) => (
              <option key={idx}>{option}</option>
            ))}
          </select>
        </div>
      )}

      {/* DATE PICKER */}
      {isDateType && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Picker</label>
          <input
            type="date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      )}

      {/* SLIDER */}
      {isSliderType && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slider</label>
          <input
            type="range"
            min="10"
            max="100"
            value={sliderValue}
            onChange={(e) => setSliderValue(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-600 mt-1">Value: {sliderValue}</div>
        </div>
      )}

      {/* TEXT INPUT PREVIEW */}
      {isTextType && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Text Input Preview</label>
          <input
            type="text"
            disabled
            placeholder="User will enter text here"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      )}

      {error && <div className="text-red-500 text-sm">{error}</div>}

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition"
        >
          {editQuestion ? 'Update Question' : 'Add Question'}
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
