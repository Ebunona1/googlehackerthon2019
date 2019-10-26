import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  var x = function () {
    console.log("hello")
  }

  return (
    <div className="App">
      <button onClick={x} >Play</button>
    </div>
  );
}



export default App;
