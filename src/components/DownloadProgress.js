import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import StopIcon from '@material-ui/icons/Stop';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';

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
    const { game } = this.props;
    return (
      <Paper id="download-progress-paper">
      <div className="flexbox">
        <div style={{
          fontSize: '28px',
          flexGrow: 1,
        }}>
          {game.title}
        </div>
        <div>
          <IconButton>
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
      <Divider style={{ marginBottom: '1rem' }} />
      {(() => {
        if (progress === 0) {
          return (
            <div className="flexbox">
            <CircularProgress
            variant="indeterminate"
            size={24}
            thickness={4}
            />
            <div style={{ marginLeft: '0.5rem' }}>Preparing download...</div>
            </div>
          );
        } else if (progress < 100) {
          return (
            <div>
            DOWNLOADING {progress}%
              <div className="flexbox">
                <div id="progress-loader-bar" style={{ width: progress + '%'}}/>
                <div id="progress-loader-bar" style={{ height: '6px', width: (100 - progress + '%'), backgroundColor: 'white'}} />
              </div>
            </div>
          );
        } else if (progress < 101) {
          return (
            <div className="flexbox">
              <CircularProgress
                variant="indeterminate"
                size={24}
                thickness={4}
              />
              <div style={{ marginLeft: '0.5rem' }}>Installing...</div>
            </div>
          );
        }
      })()}
      </Paper>
    )
  }
}

export default DownloadProgress;
