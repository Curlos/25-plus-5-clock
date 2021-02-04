import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowDown, FaArrowUp, FaPlay, FaPause, FaRedo } from 'react-icons/fa';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [minutesLeft, setMinutesLeft] = useState(sessionLength);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [startTimer, setStartTimer] = useState(false);

  let minutesLeftDigits = minutesLeft.toString().length;
  let secondsLeftDigits = secondsLeft.toString().length;
  let sessionTimer;
  let breakTimer;

  useEffect(() => {
    

    if(startTimer) {
      let myInterval = setInterval(() => {
        if (secondsLeft > 0) {
            setSecondsLeft(secondsLeft - 1);
        }

        if (secondsLeft === 0) {
          console.log('hello')
            if (minutesLeft === 0) {
                setBreakLength(5);
                setSessionLength(25);
                clearInterval(myInterval)
            } else {
                setMinutesLeft(minutesLeft - 1);
                setSecondsLeft(59);
            }
        } 
      }, 1000)
      
      return ()=> {
          clearInterval(myInterval);
      };
    }
  });



  const handleBreakDecrement = () => {
    if(breakLength - 1 >= 0) {
      setBreakLength(breakLength - 1);
    }
  }

  const handleBreakIncrement = () => {
    setBreakLength(breakLength + 1);
  }

  const handleSessionDecrement = () => {
    if(sessionLength - 1 >= 0) {
      setSessionLength(sessionLength - 1);
      setMinutesLeft(sessionLength - 1);
    }
  }

  const handleSessionIncrement = () => {
    console.log('hello')
    setSessionLength(sessionLength + 1);
    setMinutesLeft(sessionLength + 1);
  }

  const handleStart = () => {
    console.log("start");
    setStartTimer(true);
  }

  const handlePause = () => {
    setStartTimer(false);
  }

  const handleReset = () => {
    setStartTimer(false);
    setBreakLength(5);
    setSessionLength(25);
  }


  return (
    <div className="main">
      <h1 className="headerClock">25 + 5 Clock</h1>

      <span id="changeValuesBreak">
        <span id="break-label">Break Length</span>
        <Button variant="primary" id="break-decrement" className="button" onClick={handleBreakDecrement}>
          <FaArrowDown />
        </Button>
        <span id="break-length">{breakLength}</span>
        <Button variant="primary" id="break-increment" className="button" onClick={handleBreakIncrement}>
          <FaArrowUp />
        </Button>
      </span>

      <span id="changeValuesSession">
        <span id="session-label">Session Length</span>
        <Button variant="primary" id="session-decrement" className="button" onClick={handleSessionDecrement}>
            <FaArrowDown />
        </Button>

        <span id="session-length">{sessionLength}</span>

        <Button variant="primary" id="session-increment" className="button" onClick={handleSessionIncrement}>
          <FaArrowUp />
        </Button>
      </span>

      <div id="timer">
        <h2 id="timer-label">Session</h2>
        <span id="time-left">{minutesLeftDigits === 2 ? minutesLeft : '0' + minutesLeft.toString()}:{secondsLeftDigits === 2 ? secondsLeft : '0' + secondsLeft.toString()}</span>
      </div>

      <div>
        <span id="start_stop">
        <Button variant="primary" className="button" onClick={handleStart}>
          <FaPlay />
        </Button>
        <Button variant="primary" className="button" onClick={handlePause}>
          <FaPause />
        </Button>
        </span>

        <span id="reset">
        <Button variant="primary" className="button" onClick={handleReset}>
          <FaRedo />
        </Button>
        </span>
      </div>

    </div>
    
  );
}

export default App;
