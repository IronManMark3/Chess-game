const GameControls = ({ onResign }) => {
  return (
    <div className="game-controls">
      <button 
        className="control-button resign-button"
        onClick={onResign}
      >
        Resign
      </button>
      <button className="control-button draw-button">
        Offer Draw
      </button>
    </div>
  );
};

export default GameControls;