import React, { useState } from "react";

function Header(props) {
  const [progress, setProgress] = useState(60);
  const [preventTimer, setPreventTimer] = useState(true);

  function reCall() {
    props.reFetchRequest(() => {
      setProgress(60);
      setPreventTimer(true);
    });
  }

  let timerHandler =
    props.data && preventTimer
      ? setTimeout(() => {
          if (progress === 0) {
            clearTimeout(timerHandler);
            setPreventTimer(false);
            reCall();
            return;
          }
          setProgress(progress - 1);
        }, 1000)
      : "";

  const progressBarWidth = (progress * 10) / 6;
  const time = `${props.data ? props.data.time : "00:00 GMT"}`;
  const temperature = `${props.data ? Math.floor(props.data.temp) : 0}`;
  return (
    <div className="header-container">
      <div className="header-top-wrapper">
        <h1>LONDON</h1>
        <div className="date-wrapper">
          <h4>{time}</h4>
        </div>
        <h1>{temperature} &#8451; </h1>
      </div>
      <div className="header-bottom-wrapper">
        <span className="reloading-timmer">Reloading in {progress}s</span>
        <div className="progress-bar-container">
          <div className="progress-bar-wrapper">
            <div
              className="progress-bar"
              style={{ width: `${progressBarWidth}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
