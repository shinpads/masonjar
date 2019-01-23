import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MasonIcon from './masonlogo.png';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Tabs from './components/Tabs';
import GameDetails from './components/GameDetails';
import GameUpdates from './components/GameUpdates';
import GameReviews from './components/GameReviews';
import GameStats from './components/GameStats';
import api from './api';

const sections = ['Details', 'Updates', 'Reviews', 'Stats'];
const content = [GameDetails, GameUpdates, GameReviews, GameStats];

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabContent: content.map((X) => <X game={props.game} />),
    };
  }
  render() {
    const { game, downloadGame } = this.props;
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
              <div
              style={{
                marginBottom: '0.5rem',
                fontSize: '12px',
                textAlign: 'right'
              }}
              >
              0 hours played
              </div>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => downloadGame(game)}
              >
                <div style={{ marginRight: '0.5rem', marginLeft: '0.5rem' }}>Play</div>
              </Button>
            </div>
          </div>
        </Paper>
        <Paper className="game-card" style={{ marginTop: '1rem', paddingLeft: '0', paddingRight: '0' }}>
          <Tabs sections={sections} content={this.state.tabContent} />
        </Paper>
      </div>
    );
  }
}

export default Game;
