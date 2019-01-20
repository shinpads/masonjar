import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

class DownloadProgress extends Component {
  constructor (props) {
    super(props);
    this.state = {
      progress: 0,
    };
  }

  componentWillReceiveProps (newProps) {
    if (newProps.progress) {
      if ((newProps.progress * 100).toFixed(0) !== this.state.progress) {
        this.setState({ progress: (newProps.progress * 100).toFixed(0) });
      }
    }
  }

  render() {
    const { progress } = this.state;
    console.log('progress', progress);
    return (
      <Paper id="download-progress-paper">
        DOWNLOADING {progress}%
        <div className="flexbox">
          <div id="progress-loader-bar" style={{ width: progress + '%'}}/>
          <div id="progress-loader-bar" style={{ height: '6px', width: (100 - progress + '%'), backgroundColor: 'white'}} />
        </div>
      </Paper>
    )
  }
}

export default DownloadProgress;
