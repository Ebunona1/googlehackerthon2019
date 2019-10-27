import React from 'react';
import Title from '../Dashboard/Title';
import AudioPlayer from '../../AudioPlayer';
import PitchMeter from '../../PitchMeter';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   paper: {
//     padding: theme.spacing(2),
//     display: 'flex',
//     overflow: 'auto',
//     flexDirection: 'column',
//   },
//   fixedHeight: {
//     height: 240,
//   },
// }));

// const classes = useStyles();

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));

export default function PitchChart() {
  const classes = useStyles();
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
    PitchMeter.matchPitch(200., 1000, () => onMatched(), () => onTooLow(), () => onTooHigh(), () => { console.log("timeout"); return; });
  }

  var onMatched = function () {
    console.log("Matched");
    return { backgroundColor: 'green' };
  }

  var onTooLow = function () {
    // do something if freq too low
    console.log("Pitch too low");
  }

  var onTooHigh = function () {
    // do something if freq too high
    console.log("Pitch too high");
  }

  var isBackgroundRed = false;

  return (
    <React.Fragment>
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={classes.root}>
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
        </Paper>
      </Grid>
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={classes.root}>
          <p>dfd</p>
        </Paper>
      </Grid>

    </React.Fragment >
  );
}