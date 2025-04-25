import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage
    const savedUser = localStorage.getItem('chessUser');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    } else {
      // If no user is logged in, redirect to the login page
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('chessUser');
    // Redirect to the login page
    navigate('/login');
  };

  if (!userData) {
    return null; // Prevent rendering if user data is not available
  }

  return (
    <div className="profile-container">
      <h2 className="profile-heading">Profile</h2>
      <div className="profile-details">
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Level:</strong> {userData.level}</p>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Profile;