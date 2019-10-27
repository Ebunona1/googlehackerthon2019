import React from 'react';
import Title from '../Dashboard/Title';
import AudioPlayer from '../../AudioPlayer';
import PitchMeter from '../../PitchMeter';
import Button from "@material-ui/core/Button";


export default function PitchChart() {

  var playing = false;

  var togglePlay = function (frequency) {
    if (!playing) {
      AudioPlayer.setFrequency(frequency);
      AudioPlayer.playNote();
      playing = true;
    } else if (AudioPlayer.getFrequency() !== frequency) {
      AudioPlayer.stopPlaying();
      AudioPlayer.setFrequency(frequency);
      AudioPlayer.playNote();
      playing = true;
    } else {
      AudioPlayer.stopPlaying();
      playing = false;
    }
  }

  var record = async function () {
    PitchMeter.matchPitch(200., 1000, () => onMatched(), () => { console.log("timeout"); return; });
  }

  var onMatched = function () {
    console.log("Matched");
    return { backgroundColor: 'green' };
  }

  var isBackgroundRed = false;

  return (
    <React.Fragment>
      <Title>Today</Title>
      <div className={isBackgroundRed ? 'background-red' : 'background-blue'}>
        <Button variant="contained" color="primary" onClick={(f) => togglePlay(500)}>
          Play an A4
      </Button>

        <Button variant="contained" color="primary" onClick={(f) => togglePlay(600)}>
          Play an E3
      </Button>

        <Button variant="contained" color="primary" onClick={(f) => togglePlay(700)}>
          Play a C4
      </Button>

        <Button onClick={record}>
          Record
      </Button>
      </div>
    </React.Fragment>
  );
}