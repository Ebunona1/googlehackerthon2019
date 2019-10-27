import AudioContextApi from './AudioContextApi';

var AudioPlayer = (() => {
  var frequency;
  var sourceNode;

  var playNote = () => {
    var audioAnalyser = AudioContextApi.getAudioContext().createAnalyser();
    audioAnalyser.fftSize = 2048;

    sourceNode = AudioContextApi.getAudioContext().createOscillator();
    audioAnalyser.connect( AudioContextApi.getAudioContext().destination );
    sourceNode.connect( audioAnalyser );
    sourceNode.frequency.setValueAtTime(frequency,0);

    sourceNode.start(0);
  };
  
  var setFrequency = (selectedFreq) => {
    frequency = selectedFreq;
  }
  var stopPlaying = () => {
    sourceNode.stop()
  }
  var getFrequency = () => {
    return sourceNode.frequency.value;
  }
  return {
    playNote: playNote,
    setFrequency: setFrequency,
    stopPlaying: stopPlaying,
    getFrequency: getFrequency
  };
})();

export default AudioPlayer;