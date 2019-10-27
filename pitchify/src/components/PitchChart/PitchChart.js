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



// const classes = useStyles();

export default class PitchChart extends React.Component {
  constructor() {
    super();

    this.state = {
      frequency: 0,
      playValue: 500,
      playing: false,
      isBackgroundRed: false,
      }
    }
  
  useStyles = (makeStyles) => (theme => ({
      root: {
        padding: theme.spacing(3, 2), 
      }
    }));

  record = async () => {
    PitchMeter.matchPitch(200., 1000, () => this.onMatched(), () => { console.log("timeout"); return; });
  }

  onMatched = () => {
    console.log("Matched");
    return { backgroundColor: 'green' };
  }

  togglePlay = (frequency) => {
    if (!this.state.playing) {
      AudioPlayer.setFrequency(frequency);
      AudioPlayer.playNote();
      this.setState({playing: true})
    } else if (AudioPlayer.getFrequency() !== frequency) {
      AudioPlayer.stopPlaying();
      AudioPlayer.setFrequency(frequency);
      AudioPlayer.playNote();
      this.setState({playing: true})
    } else {
      AudioPlayer.stopPlaying();
      this.setState({playing: true})
    }
  }


  render() {
    return (
      <React.Fragment>
        <Grid item xs={12} md={4} lg={3}>
          <Paper className={this.useStyles().root}>
            <Button variant="contained" color="primary" onClick={() => this.setState({playValue: 500})}>
              Play an A4
            </Button>
            <Button variant="contained" color="primary" onClick={() => this.setState({playValue: 700})}>
              Play an E3
            </Button>
            <Button variant="contained" color="primary" onClick={() => this.setState({playValue: 900})}>
              Play a C4
            </Button>
            <Button onClick={this.handleRecord}>
              Record
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={this.useStyles().root}>
            <p>{this.state.frequency}</p>
          </Paper>
        </Grid>
      </React.Fragment>
    )
  }
}