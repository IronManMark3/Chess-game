import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    level: 'Beginner',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState('');

  // Function to calculate password strength
  const calculatePasswordStrength = (password) => {
    if (password.length < 6) {
      return 'Weak';
    } else if (password.length < 10) {
      return 'Moderate';
    } else {
      return 'Strong';
    }
  };

  // Handle password input changes
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });
    setPasswordStrength(calculatePasswordStrength(password));
  };

  // Handle confirm password input changes
  const handleConfirmPasswordChange = (e) => {
    const confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    setPasswordMatch(formData.password === confirmPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!passwordMatch) {
      alert('Passwords do not match.');
      return;
    }

    if (formData.username && formData.password) {
      const user = {
        username: formData.username,
        level: formData.level,
      };

      // Save user data to localStorage
      localStorage.setItem('chessUser', JSON.stringify(user));

      // Navigate to the home page after login
      navigate('/');
    } else {
      alert('Please enter both username and password.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2 className="form-heading">Login</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={formData.password}
            onChange={handlePasswordChange}
            required
          />
          <p className={`password-strength ${passwordStrength.toLowerCase()}`}>
            Password strength: {passwordStrength}
          </p>
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {!passwordMatch && (
            <p className="error">Passwords do not match</p>
          )}
        </div>
        <div>
          <label>Level:</label>
          <select
            value={formData.level}
            onChange={(e) =>
              setFormData({ ...formData, level: e.target.value })
            }
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;