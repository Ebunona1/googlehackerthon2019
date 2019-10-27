import React from 'react';
import Title from '../Dashboard/Title';
import AudioPlayer from '../../AudioPlayer';
import PitchMeter from '../../PitchMeter';
import NotesTable from '../../notes';
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 100,
  },
}));

export default function PitchChart() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight, classes.root);
  var playing = false;
  var generateFrequency = function () {
    var currentFrequency = Math.floor(Math.random() * (1027 - 513 + 1) + 513);
    return currentFrequency;
  }
  var currentNote = PitchMeter.findNotes(generateFrequency(), NotesTable[440])
  //console.log('note:', currentNote.note);
  const [correctionText, setCorrectionText] = useState(0);

  var togglePlay = function (frequency) {
    if (!playing) {
      AudioPlayer.setFrequency(frequency);
      AudioPlayer.playNote();
      playing = true;
      // } else if (AudioPlayer.getFrequency() !== frequency) {
      //   AudioPlayer.stopPlaying();
      //   AudioPlayer.setFrequency(frequency);
      //   AudioPlayer.playNote();
      //   playing = true;
      // } 
    } else {
      AudioPlayer.stopPlaying();
      playing = false;
    }
  }

  var record = async function () {
    generateFrequency();
    //console.log("generated=", currentNote.note);
    PitchMeter.matchPitch(currentNote.frequency, 1000, () => onMatched(), () => onTooLow(), () => onTooHigh(), () => { console.log("timeout"); return; });
  }

  var onMatched = function () {
    console.log("Matched");
    return { backgroundColor: 'green' };
  }

  var onTooLow = function () {
    // do something if freq too low
    setCorrectionText("Too low");
  }

  var onTooHigh = function () {
    // do something if freq too high
    setCorrectionText("Too high");
  }

  var isBackgroundRed = false;

  return (
    <React.Fragment>
      {}
      <Grid item xs={6} md={6} lg={6}>
        <Paper className={fixedHeightPaper}>
          <Button variant="contained" color="primary" onClick={(f) => togglePlay(currentNote.frequency)}>
            Listen first!
          </Button>
          <Button onClick={record}>
            Record
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={6} md={6} lg={6}>
        <Paper className={fixedHeightPaper}>
          <p>{currentNote.note}</p>
          <p>{correctionText}</p>
        </Paper>
      </Grid>

    </React.Fragment >
  );
}