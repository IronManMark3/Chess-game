import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Game from './pages/Game';
import Settings from './pages/Settings';
import { useState, useEffect } from 'react';

function App() {
  const [boardTheme, setBoardTheme] = useState('default'); // State to manage board theme

  useEffect(() => {
    // Load the saved theme from localStorage
    const savedTheme = localStorage.getItem('boardTheme') || 'default';
    setBoardTheme(savedTheme);
  }, []);

  const handleThemeChange = (theme) => {
    setBoardTheme(theme);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/game"
          element={<Game boardTheme={boardTheme} />} // Pass boardTheme to Game
        />
        <Route
          path="/settings"
          element={<Settings onThemeChange={handleThemeChange} />}
        />
      </Routes>
    </Router>
  );
}

export default App;