import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Auth from './components/auth/Auth/Auth';
import { PhishingForm } from './components/PhishingForm/PhishingForm';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="auth" element={<Auth />} />
          <Route path="/" element={<PhishingForm />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;