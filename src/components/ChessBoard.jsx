import { Chessboard } from 'react-chessboard';

const ChessBoard = ({
  position,
  onDrop,
  boardOrientation,
  selectedSquare,
  setSelectedSquare,
  possibleMoves,
  currentPlayer,
  game,
  boardTheme, // Add boardTheme prop
}) => {
  const handleSquareClick = (square) => {
    const piece = game.get(square);

    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    if (piece && piece.color === currentPlayer) {
      setSelectedSquare(square);
    } else if (selectedSquare) {
      try {
        onDrop(selectedSquare, square);
        setSelectedSquare(null);
      } catch {
        setSelectedSquare(null);
      }
    }
  };

  const customSquareStyles = {
    [selectedSquare]: {
      backgroundColor: 'rgba(255, 255, 0, 0.3)',
    },
    ...possibleMoves.reduce((acc, move) => {
      acc[move] = { backgroundColor: 'rgba(0, 255, 0, 0.2)' };
      return acc;
    }, {}),
  };

  const boardStyles = {
    default: {
      light: '#f0d9b5',
      dark: '#b58863',
    },
    purple: {
      light: '#d8b4fe',
      dark: '#7c3aed',
    },
    blue: {
      light: '#bfdbfe',
      dark: '#1e3a8a',
    },
    green: {
      light: '#bbf7d0',
      dark: '#065f46',
    },
  };

  const theme = boardStyles[boardTheme] || boardStyles.default;

  return (
    <div className="board-container">
      <Chessboard
        position={position}
        boardOrientation={boardOrientation}
        onPieceDrop={onDrop}
        onSquareClick={handleSquareClick}
        customSquareStyles={customSquareStyles}
        boardWidth={600}
        customBoardStyle={{
          borderRadius: '4px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
        }}
        customLightSquareStyle={{ backgroundColor: theme.light }}
        customDarkSquareStyle={{ backgroundColor: theme.dark }}
      />
    </div>
  );
};

export default ChessBoard;