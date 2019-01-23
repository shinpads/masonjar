import React, { Component } from 'react';

class GameDetails extends Component {
  render() {
    const { game } = this.props;
    return (
      <div style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <img alt="" src=""/>
        {game.fullDescription || <i>No description provided.</i>}
      </div>
    )
  }
}

export default GameDetails;
