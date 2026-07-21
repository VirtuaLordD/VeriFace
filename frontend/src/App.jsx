import { Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import DashboardPage from './pages/DashboardPage';
import DeepfakePage from './pages/DeepfakePage';
import TextAnalysisPage from './pages/TextAnalysisPage';
import AccountVerifierPage from './pages/AccountVerifierPage';
import ResultsPage from './pages/ResultsPage';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/deepfake" element={<DeepfakePage />} />
        <Route path="/text-analysis" element={<TextAnalysisPage />} />
        <Route path="/account-verifier" element={<AccountVerifierPage />} />
        <Route path="/results/:id" element={<ResultsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
