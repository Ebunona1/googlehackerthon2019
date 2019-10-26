import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";

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
      analyser = audioContext.createAnalyser();
  }

  var togglePlay = function () {
    analyser.fftSize = 2048;
    analyser.connect( audioContext.destination );
    start();
  }

  var start = function () {
    if (!playing) {
      sourceNode = audioContext.createOscillator();
      sourceNode.connect( analyser );
      sourceNode.start(0);
      playing = true;
    } else {
      sourceNode.stop(0);
      sourceNode = null;
      playing = false;
    }
    console.log("playing");
  }

  return (
    <Button variant="contained" color="primary" onClick={togglePlay}>
      Play Sound
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
