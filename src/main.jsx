import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import StartPage from "./components/StartPage.jsx";
import QuestionBuilder from "./components/QuestionBuilder.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/builder" element={<QuestionBuilder />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

