import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import TestSelection from './pages/TestSelection';
import SuicidalIntent from './pages/SuicidalIntent';
import ChatbotPage from './pages/ChatbotPage.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<TestSelection />} />
            <Route path="/suicidal-intent" element={<SuicidalIntent />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;