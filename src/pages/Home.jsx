import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

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
                  className={`game-button ${category.color}`}
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