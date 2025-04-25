import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = ({ onThemeChange }) => {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState('default'); // Default theme

  useEffect(() => {
    // Load the saved theme from localStorage
    const savedTheme = localStorage.getItem('boardTheme') || 'default';
    setSelectedTheme(savedTheme);
    onThemeChange(savedTheme); // Apply the saved theme
  }, [onThemeChange]);

  const handleThemeChange = (e) => {
    const theme = e.target.value;
    setSelectedTheme(theme);
    onThemeChange(theme); // Pass the selected theme to the parent component
    localStorage.setItem('boardTheme', theme); // Save the theme to localStorage
  };

  return (
    <div className="settings-container">
      <h2 className="settings-heading">Settings</h2>
      <div className="settings-option">
        <label htmlFor="theme">Select Board Theme:</label>
        <select
          id="theme"
          value={selectedTheme}
          onChange={handleThemeChange}
        >
          <option value="default">Default (Brown & Beige)</option>
          <option value="purple">Purple & White</option>
          <option value="blue">Blue & White</option>
          <option value="green">Green & White</option>
        </select>
      </div>
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default Settings;