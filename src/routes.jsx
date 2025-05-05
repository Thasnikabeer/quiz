import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import StartPage from './pages/StartPage';
import QuizBuilder from './pages/QuizBuilder';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route element={<Layout />}>
        <Route path="/builder" element={<QuizBuilder />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;