import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    level: '',
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('chessUser');
    if (savedUser) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('chessUser');
    setUserData({ username: '', level: '' });
    setIsLoggedIn(false);
  };

  const gameCategories = [
    {
      title: 'Bullet',
      color: 'from-red-500 to-orange-500', // Space-separated
      options: [
        { label: '1+0', time: 60, increment: 0 },
        { label: '2+1', time: 120, increment: 1 },
      ],
    },
    {
      title: 'Blitz',
      color: 'from-blue-500 to-purple-500', // Space-separated
      options: [
        { label: '3+0', time: 180, increment: 0 },
        { label: '5+0', time: 300, increment: 0 },
        { label: '5+3', time: 300, increment: 3 },
      ],
    },
    {
      title: 'Rapid',
      color: 'from-green-500 to-cyan-500', // Space-separated
      options: [
        { label: '10+0', time: 600, increment: 0 },
        { label: '15+10', time: 900, increment: 10 },
      ],
    },
  ];

  return (
    <div className="home-container">
      {/* Profile Button */}
      <div className="top-left">
        {isLoggedIn && (
          <button className="profile-button" onClick={() => navigate('/profile')}>
            Profile
          </button>
        )}
      </div>

      {/* Login Button */}
      <div className="top-right">
        {!isLoggedIn && (
          <button className="login-button" onClick={() => navigate('/login')}>
            Login
          </button>
        )}
      </div>

      {/* Settings Button */}
      <div className="bottom-left">
        <button className="settings-button" onClick={() => navigate('/settings')}>
          Settings
        </button>
      </div>

      <div className="header">
        <h1 className="title">
          <span className="title-gradient">Chess</span>
          <span className="text-4xl">♔</span>
        </h1>
        <p className="subtitle">Choose your game mode</p>
      </div>

      <div className="game-options">
        {gameCategories.map((category) => (
          <div key={category.title} className="game-category">
            <h2 className="category-title">{category.title}</h2>
            <div className="category-options">
              {category.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() =>
                    navigate('/game', {
                      state: {
                        baseTime: option.time,
                        increment: option.increment,
                      },
                    })
                  }
                  className={`game-button bg-gradient-to-r ${category.color}`}
                >
                  <span className="button-label">{option.label}</span>
                  <span className="button-time">
                    {Math.floor(option.time / 60)}+{option.increment}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="footer">
        <p>Made with ♥ using React</p>
      </div>
    </div>
  );
};

export default Home;