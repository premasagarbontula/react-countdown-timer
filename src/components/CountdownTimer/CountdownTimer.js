import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CountdownTimer.css";

function CountdownTimer() {
  const [time, setTime] = useState(0);
  const [isActive, setActive] = useState(false);
  const [isPaused, setPause] = useState(false);
  const intervalRef = useRef(null);

  const onTimerInput = (e) => {
    setTime(parseInt(e.target.value * 60));
  };
  const startTimer = () => {
    setActive(true);
    setPause(false);
  };

  const pauseTimer = () => {
    setPause(!isPaused);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setActive(false);
    setPause(false);
    setTime(0);
  };

  const formatTime = () => {
    const mins = String(Math.floor(time / 60)).padStart(2, "0");
    const secs = String(time % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  useEffect(() => {
    if (isActive && !isPaused && time !== 0) {
      intervalRef.current = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(intervalRef.current);
      setActive(false);
      alert("Timer Stopped");
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused, time]);

  return (
    <div className="container">
      <h1>Countdown Timer</h1>
      <div className="input-container">
        <input
          type="number"
          placeholder="Enter time in Minutes"
          onChange={onTimerInput}
          className="input-el"
        />
      </div>
      <div className="timer">{formatTime()}</div>
      <div>
        <Button
          variant="primary"
          className="mr-2"
          onClick={startTimer}
          disabled={isActive && !isPaused}
        >
          Start
        </Button>
        <Button
          className="mr-2"
          variant={isPaused ? "success" : "secondary"}
          onClick={pauseTimer}
          disabled={!isActive}
        >
          {isPaused ? "Resume" : "Pause"}
        </Button>
        <Button variant="danger" onClick={resetTimer}>
          Stop
        </Button>
      </div>
    </div>
  );
}

export default CountdownTimer;
