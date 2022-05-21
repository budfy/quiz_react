import React, { useState } from "react";
import './Timer.scss'


function Timer(props) {
  const [min, setMin] = useState("30");
  const [sec, setSec] = useState("00");
  const [message, setMessage] = useState(" истекает через:");

  function countDown() {
    let minutes = parseInt(min);
    let seconds = parseInt(sec);

    setTimeout(() => {
      if (minutes > 0 && seconds == 0) {
        seconds = 59;
        minutes -= 1;
      }
      if (minutes == 0 && seconds == 0) {
        setMessage(", к сожалению, истёк.")
        return false;
      }
      seconds -= 1;
      setMin(minutes < 10 ? `0${minutes}` : minutes);
      setSec(seconds < 10 ? `0${seconds}` : seconds);
    }, 1000);
  }

  countDown();

  return (
    <div className="c-timer">
      <span className="c-timer__title">Срок действия данного предложения{message}</span>
      <div className="c-timer__block">
        <span className="c-timer__value">{min}:{sec}</span>
      </div>
    </div>
  )
}

export default Timer;