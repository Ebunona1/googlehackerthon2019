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
      getAudioContext: getAudioContext
    };
  })();

export default AudioContextApi;