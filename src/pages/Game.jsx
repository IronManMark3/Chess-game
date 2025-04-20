import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chess } from 'chess.js';
import ChessBoard from '../components/ChessBoard.jsx';
import Timer from '../components/Timer.jsx';
import GameControls from '../components/GameControls.jsx';

const Game = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get time controls from navigation state
  const { baseTime, increment } = location.state || {
    baseTime: 600, // Default to 10+0 if no state
    increment: 0,
  };

  const [game] = useState(() => new Chess());
  const [currentTime, setCurrentTime] = useState({
    white: baseTime,
    black: baseTime,
  });
  const [currentPlayer, setCurrentPlayer] = useState('w');
  const [gameOver, setGameOver] = useState(false);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [moveHistory, setMoveHistory] = useState([]); // State to track move history

  // Timer effect
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        const newTime = { ...prev };
        if (currentPlayer === 'w') {
          newTime.white = Math.max(0, prev.white - 1);
          if (newTime.white <= 0) handleTimeout('white');
        } else {
          newTime.black = Math.max(0, prev.black - 1);
          if (newTime.black <= 0) handleTimeout('black');
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPlayer, gameOver]);

  const handleTimeout = (loser) => {
    setGameOver(true);
    alert(`Time out! ${loser === 'white' ? 'Black' : 'White'} wins!`);
    navigate('/');
  };

  const onDrop = (sourceSquare, targetSquare) => {
    if (gameOver) return false;

    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q', // Always promote to queen for simplicity
      });

      if (!move) return false;

      // Update move history
      setMoveHistory((prev) => [
        ...prev,
        {
          moveNumber: Math.ceil((prev.length + 1) / 2),
          notation: move.san,
          color: move.color,
          captured: move.captured,
        },
      ]);

      // Switch the current player
      setCurrentPlayer((prev) => (prev === 'w' ? 'b' : 'w'));

      // Update timers with increment
      if (increment > 0) {
        setCurrentTime((prev) => ({
          ...prev,
          [currentPlayer === 'w' ? 'white' : 'black']:
            prev[currentPlayer === 'w' ? 'white' : 'black'] + increment,
        }));
      }

      // Check for game over conditions
      if (game.isGameOver()) {
        setGameOver(true);

        if (game.isCheckmate()) {
          alert(`Checkmate! ${currentPlayer === 'w' ? 'Black' : 'White'} wins!`);
        } else if (game.isStalemate()) {
          alert('Stalemate! It\'s a draw!');
        } else if (game.isThreefoldRepetition()) {
          alert('Threefold repetition! It\'s a draw!');
        } else if (game.isInsufficientMaterial()) {
          alert('Insufficient material! It\'s a draw!');
        }
        navigate('/');
      }

      return true; // Move was successful
    } catch (error) {
      console.error('Error making move:', error);
      return false; // Return false if an error occurs
    }
  };

  // Highlight possible moves for the selected square
  useEffect(() => {
    if (selectedSquare) {
      const moves = game.moves({ square: selectedSquare, verbose: true });
      setPossibleMoves(moves.map((move) => move.to));
    }
  }, [selectedSquare, game]);

  return (
    <div className="game-container">
      <div className="top-bar">
        <button
          className="home-button"
          onClick={() => navigate('/')}
        >
          ← Home
        </button>
        <Timer time={currentTime.black} label="Black" />
      </div>

      <div className="game-content">
        <ChessBoard
          position={game.fen()}
          onDrop={onDrop}
          selectedSquare={selectedSquare}
          setSelectedSquare={setSelectedSquare}
          possibleMoves={possibleMoves}
          boardOrientation={currentPlayer === 'w' ? 'white' : 'black'}
          currentPlayer={currentPlayer}
          game={game} // Pass game instance
        />

        <div className="move-history">
          <h3>Move History</h3>
          <div className="history-list">
            {moveHistory.map((move, index) => (
              <div key={index} className="move-entry">
                {move.color === 'w' && `${move.moveNumber}. `}
                <span className={move.captured ? 'capture-move' : ''}>
                  {move.notation}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bottom-bar">
        <Timer time={currentTime.white} label="White" />
        <GameControls
          onResign={() => {
            setGameOver(true);
            alert(currentPlayer === 'w' ? 'Black wins by resignation!' : 'White wins by resignation!');
            navigate('/');
          }}
        />
      </div>
    </div>
  );
};

export default Game;