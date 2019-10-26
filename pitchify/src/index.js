import React from "react";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";

var AudioContextApi = (() => {
  var audioContext;
  var createAudioContext = function () {
    var LocalAudioContext = window.AudioContext || window.webkitAudioContext;
    return new LocalAudioContext();
  }
  var getAudioContext = () => {
    if (!audioContext) {
      audioContext = createAudioContext();
    }
    return audioContext;
  }
  return {
    getAudioContext: getAudioContext,

  };
})();

var PitchMeter = (() => {
  const FREQ_MATCHING_THRESHOLD = 20;
  var detectPitch = function (analyserAudioNode) {
    var buffer = new Uint8Array(analyserAudioNode.fftSize);
    // See initializations in the AudioContent and AnalyserNode sections of the demo.
    analyserAudioNode.getByteTimeDomainData(buffer);
    var fundalmentalFreq = findFundamentalFreq(buffer, AudioContextApi.getAudioContext().sampleRate);
    console.log(fundalmentalFreq);
  };

  var findFundamentalFreq = function (buffer, sampleRate) {
		// We use Autocorrelation to find the fundamental frequency.

		// In order to correlate the signal with itself (hence the name of the algorithm), we will check two points 'k' frames away.
		// The autocorrelation index will be the average of these products. At the same time, we normalize the values.
		// Source: http://www.phy.mty.edu/~suits/autocorrelation.html
		// Assuming the sample rate is 48000Hz, a 'k' equal to 1000 would correspond to a 48Hz signal (48000/1000 = 48),
		// while a 'k' equal to 8 would correspond to a 6000Hz one, which is enough to cover most (if not all)
		// the notes we have in the notes.json file.
		var n = 1024;
		var bestK = -1;
		var bestR = 0;
		for (var k = 8; k <= 1000; k++) {
			var sum = 0;

			for (var i = 0; i < n; i++) {
				sum += ((buffer[i] - 128) / 128) * ((buffer[i + k] - 128) / 128);
			}

			var r = sum / (n + k);

			if (r > bestR) {
				bestR = r;
				bestK = k;
			}

			if (r > 0.9) {
				// Let's assume that this is good enough and stop right here
				break;
			}
		}

		if (bestR > 0.0025) {
			// The period (in frames) of the fundamental frequency is 'bestK'. Getting the frequency from there is trivial.
			var fundamentalFreq = sampleRate / bestK;
			return fundamentalFreq;
		}
		else {
			// We haven't found a good correlation
			return -1;
		}
	};
  var withinPercent = (target, actual, threshold) => {
    var diff = target - actual;
    var percent = (diff/target) * 100;
    return Math.abs(percent) < threshold;
  }
  var matchPitch = async (targetFreq, maxSamples,onPitchMatched, onTimeout) => {
    let stream = await navigator.mediaDevices.getUserMedia({audio: true}).then((micStream) => {
      var analyserAudioNode = AudioContextApi.getAudioContext().createAnalyser();
      analyserAudioNode.fftSize = 2048;
    
      var sourceAudioNode = AudioContextApi.getAudioContext().createMediaStreamSource(micStream);
      
      sourceAudioNode.connect(analyserAudioNode); // See initialization in the AnalyserNode section of the demo.
      /* This is our pitch detection algorithm.
        You can find its implementation in the Autocorrelation section of this demo. */
      
        for (var samples = 0; samples < maxSamples; samples ++) {
          var freq = detectPitch(analyserAudioNode);
          // break when freq matches expected
          if (withinPercent(targetFreq, freq, FREQ_MATCHING_THRESHOLD))
            onPitchMatched();
          
        }
        onTimeout();
    });

  };
  return {
    // maxPitch(targetFreq, maxSamples,onPitchMatched, onTimeout)
    matchPitch: matchPitch,
  };
})();

function App() {

  var analyserAudioNode;
  var sourceNode;
  var analyser;
  var playing = false;
  var sourceAudioNode;
  
  var start = function () {
    if (!playing) {
      // setting frequency here

      sourceNode = AudioContextApi.getAudioContext().createOscillator();
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

  var setFrequency = function (newFreq) {
    if (sourceNode) {
      // stores desired freq
      sourceNode.frequency.setValueAtTime(newFreq,0);
      console.log("changed freq to...", newFreq);
    }
  }

  var togglePlay = function () {
    analyser.fftSize = 2048;
    analyser.connect( AudioContextApi.getAudioContext().destination );
    start();
  }

  var playAtFrequency = function (frequency) {
    if (!sourceNode || sourceNode.frequency.value === frequency)
      togglePlay();
    setFrequency(frequency);
  }
  


  var record = async function () {
    PitchMeter.matchPitch(262., 1000, () => console.log("Matched"), () => console.log("Timeout"));
  }

 

  return (
    <div>
      <Button variant="contained" color="primary" onClick={(f) => playAtFrequency(440)}>
        Play an A4
      </Button>

      <Button variant="contained" color="primary" onClick={(f) => playAtFrequency(500)}>
        Play an E3
      </Button>

      <Button variant="contained" color="primary" onClick={(f) => playAtFrequency(1000)}>
        Play a C4
      </Button>

      <Button onClick={record}>
        Record
      </Button>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));
