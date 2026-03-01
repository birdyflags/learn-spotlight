import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientLayout from './components/layout/ClientLayout';
import HomePage from './pages/HomePage';
import VocabularyPage from './pages/VocabularyPage';
import GrammarPage from './pages/GrammarPage';
import AIHubPage from './pages/AIHubPage';
import UnitDetailPage from './pages/UnitDetailPage';

function App() {
  return (
    <Router>
      <ClientLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vocabulary" element={<VocabularyPage />} />
          <Route path="/grammar" element={<GrammarPage />} />
          <Route path="/ai-hub" element={<AIHubPage />} />
          <Route path="/unit/:id" element={<UnitDetailPage />} />
          {/* Catch-all for 404s - redirect to home or show error */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </ClientLayout>
    </Router>
  );
}

export default App;
