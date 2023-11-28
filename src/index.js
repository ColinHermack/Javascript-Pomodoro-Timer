import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,  //The function to execute every second and decrement the timer
      sessionLength: 25,  //The length of a work session in minutes
      breakLength: 5,  //The length of a break in minutes
      current: "Session",  //The string to be displayed above the timer to indicate whether it is counting a session or break
      minutes: 25,  //The minutes left in the current session or break
      seconds: 0,  //The seconds left in the current session or break
      running: false,  //Whether the timer is running
      startStopMessage: "Start"
    }

    //Bind keyword 'this' to action handle methods
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.getMinutesString = this.getMinutesString.bind(this);
    this.getSecondsString = this.getSecondsString.bind(this);
    this.toggleTimer = this.toggleTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.reset = this.reset.bind(this);
  }

  toggleTimer() {
    if (!this.state.running) {
      this.interval = setInterval(this.tick, 1000);
      this.setState({running: true, startStopMessage: "Stop"});
    } else {
      clearInterval(this.interval);
      this.setState({running: false, startStopMessage: "Start"});
    }
  }

  tick() {
    if (this.state.seconds !== 0) {
      this.setState((oldState) => ({
        seconds: oldState.seconds - 1
      }));
    } else if (this.state.seconds === 0 && this.state.minutes !== 0) {
      this.setState((oldState) => ({
        minutes: oldState.minutes - 1,
        seconds: 59
      }))
    } else if (this.state.seconds === 0 && this.state.minutes === 0) {
      if (this.state.current === "Session") {
        this.setState((oldState) => ({
          minutes: oldState.breakLength,
          seconds: 0,
          current: "Break"
        }))
      } else if (this.state.current === "Break") {
        this.setState((oldState) => ({
          minutes: oldState.sessionlength,
          seconds: 0,
          current: "Session"
        }))
      }
    }
  }

  reset() {
    if (this.state.running) {
      this.toggleTimer();
    }
    this.setState({
      minutes: 25,
      seconds: 0,
      sessionLength: 25,
      breakLength: 5,
      current: "Session"
    })
  }

  incrementBreak() {
    if (this.state.breakLength < 60) {
      this.setState((oldState) => ({
        breakLength: oldState.breakLength + 1
      }));
    }
    if (!this.state.running && this.state.current === 'Break') {
      this.setState((oldState) => ({
        minutes: oldState.breakLength
      }))
    }
  }

  decrementBreak() {
    if (this.state.breakLength > 0) {
      this.setState((oldState) => ({
        breakLength: oldState.breakLength - 1
      }));
    }
    if (!this.state.running && this.state.current === 'Break') {
      this.setState((oldState) => ({
        minutes: oldState.breakLength
      }))
    }
  }

  incrementSession() {
    if (this.state.sessionLength < 60) {
      this.setState((oldState) => ({
        sessionLength: oldState.sessionLength + 1
      }));
    }
    if (!this.state.running && this.state.current === 'Session') {
      this.setState((oldState) => ({
        minutes: oldState.sessionLength
      }))
    }
  }

  decrementSession() {
    if (this.state.sessionLength > 0) {
      this.setState((oldState) => ({
        sessionLength: oldState.sessionLength - 1
      }))
    }
    if (!this.state.running && this.state.current === 'Session') {
      this.setState((oldState) => ({
        minutes: oldState.sessionLength
      }))
    }
  }

  getMinutesString() {
    if (this.state.minutes <= 9) {
      return "0" + String(this.state.minutes);
    }
    return String(this.state.minutes);
  }

  getSecondsString() {
    if (this.state.seconds <= 9) {
      return "0" + String(this.state.seconds);
    }
    return String(this.state.seconds);
  }

  render() {
    return(
      <div id="timer-container">
        <h1>Pomodoro Timer</h1>
        <div id="length-info">
          <div id="break-info" className="info-box">
            <h2 id="break-label">Break Length</h2>
            <div id="break-length-box" className="length-box">{this.state.breakLength}</div>
            <button id="break-increment" className="length-controller" onClick={this.incrementBreak}>{'\u02C4'}</button>
            <button id="break-decrement" className="length-controller" onClick={this.decrementBreak}>{'\u02C5'}</button>
          </div>
          <div id="session-info" className="info-box">
            <h2 id="session-label">Session Length</h2>
            <div id="session-length-box" className="length-box">{this.state.sessionLength}</div>
            <button id="session-increment" className="length-controller" onClick={this.incrementSession}>{'\u02C4'}</button>
            <button id="session-decrement>" className="length-controller" onClick={this.decrementSession}>{'\u02C5'}</button>
          </div>
        </div>
        <div id="timer-container">
          <h2 id="session-type">{this.state.current}</h2>
          <div id="time-left-box">{this.getMinutesString()}:{this.getSecondsString()}</div>
          <div id="timer-controls-container">
            <button id="start_stop" className="timer-controls" onClick={this.toggleTimer}>{this.state.startStopMessage}</button>
            <button id="reset" className="timer-controls" onClick={this.reset}>Reset</button>
          </div>
        </div>
      </div>
    )
  }
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
