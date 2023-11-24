import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <h1>Pomodoro Timer</h1>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
