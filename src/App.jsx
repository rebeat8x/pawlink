import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import ReviewsPage from './pages/ReviewsPage';
import ReportPage from './pages/ReportPage';
import ChallengePage from './pages/ChallengePage';
import TipsPage from './pages/TipsPage';

export default function App() {
  return (
    <div className="page-wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dog/:id" element={<DetailPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/challenge" element={<ChallengePage />} />
        <Route path="/tips" element={<TipsPage />} />
      </Routes>
    </div>
  );
}
