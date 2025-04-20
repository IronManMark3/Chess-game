const Timer = ({ time, label }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <h3>{label}</h3>
      <div className="time-display">{formatTime(time)}</div>
    </div>
  );
};

export default Timer;