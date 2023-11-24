import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5
    }

    //Bind keyword 'this' to action handle methods
    this.incrementBreak = this.incrementBreak.bind(this);
    this.decrementBreak = this.decrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
  }

  incrementBreak() {
    if (this.state.breakLength < 60) {
      this.setState((oldState) => ({
        breakLength: oldState.breakLength + 1
      }));
    }
  }

  decrementBreak() {
    if (this.state.breakLength > 0) {
      this.setState((oldState) => ({
        breakLength: oldState.breakLength - 1
      }));
    }
  }

  incrementSession() {
    if (this.state.sessionLength < 60) {
      this.setState((oldState) => ({
        sessionLength: oldState.sessionLength + 1
      }));
    }
  }

  decrementSession() {
    if (this.state.sessionLength > 0) {
      this.setState((oldState) => ({
        sessionLength: oldState.sessionLength - 1
      }))
    }
  }



  render() {
    return(
      <div id="timer-container">
        <h1>Pomodoro Timer</h1>
        <div id="length-info">
          <div id="break-info" class="info-box">
            <h2 id="break-label">Break Length</h2>
            <div id="break-length-box" class="length-box">{this.state.breakLength}</div>
            <button id="break-increment" onClick={this.incrementBreak}></button>
            <button id="break-decrement" onClick={this.decrementBreak}></button>
          </div>
          <div id="session-info" class="info-box">
            <h2 id="session-label">Session Length</h2>
            <div id="session-length-box" class="length-box">{this.state.sessionLength}</div>
            <button id="session-increment" onClick={this.incrementSession}></button>
            <button id="session-decrement>" onClick={this.decrementSession}></button>
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
