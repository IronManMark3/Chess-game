import { Chessboard } from 'react-chessboard';

const ChessBoard = ({ 
  position, 
  onDrop, 
  boardOrientation,
  selectedSquare,
  setSelectedSquare,
  possibleMoves,
  currentPlayer,
  game // Add game prop
}) => {
  const handleSquareClick = (square) => {
    const piece = game.get(square);

    // Clear selection if clicking same square
    if (selectedSquare === square) {
      setSelectedSquare(null);
      return;
    }

    // Select piece if it belongs to current player
    if (piece && piece.color === currentPlayer) {
      setSelectedSquare(square);
    }
    // Make move if we have a selected square
    else if (selectedSquare) {
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
    }, {})
  };

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
      />
    </div>
  );
};

export default ChessBoard;