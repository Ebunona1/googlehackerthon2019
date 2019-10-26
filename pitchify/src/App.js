import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  var sourceNode;
  var analyser;
  var playing = false;
  var audioContext;

  var isAudioContextSupported = function () {
    // This feature is still prefixed in Safari
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    if(window.AudioContext){
        return true;
    }
    else {
        return false;
    }
  };

  if(isAudioContextSupported()) {
      audioContext = new window.AudioContext();
      sourceNode = audioContext.createOscillator();
      analyser = audioContext.createAnalyser();
  }

  var x = function () {
    analyser.fftSize = 2048;
    sourceNode.connect( analyser );
    analyser.connect( audioContext.destination );
    
    start();
  }

  var start = function () {
    sourceNode.start(0);
    sourceNode.stop(1);
    playing = true;
    console.log("playing");
  }

  return (
    <div className="App">
      <button onClick={x} >Play</button>
    </div>
  );
}



export default App;
