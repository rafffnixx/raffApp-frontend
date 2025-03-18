import logo from './logo.svg';
import './App.css';
import'./App'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a 
          className="App-link"
          href="./login.html" //<a href="./login.html">Login</a> ...href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          LOGIN
        </a>
      </header>
    </div>
  );
}

export default App;
