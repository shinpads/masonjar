import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MasonIcon from './masonlogo.png';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

class Game extends Component {
  render() {
    const { game } = this.props;
    return(
      <div className="game-frame">
        <Paper className="game-card">
          <div className="flexbox">
            <div className="game-info">
              <img src={MasonIcon} width={64} height={64} style={{ marginRight: '1rem' }}/>
              <div>
                <div className="game-title">{game.title}</div>
                <div className="game-description">{game.description}</div>
              </div>
            </div>
            <div>
              <Button size="large" variant="contained" color="primary">
                <div style={{ marginRight: '0.5rem' }}>Play</div>
                <PlayCircleOutlineIcon />
              </Button>
              <div
                style={{
                  marginTop: '0.5rem',
                  fontSize: '12px',
                  textAlign: 'center'
                }}
              >
                0 downloads
              </div>
            </div>
          </div>
        </Paper>
        <Paper className="game-card" style={{ marginTop: '1rem' }}>

        </Paper>
      </div>
    );
  }
}

export default Game;
