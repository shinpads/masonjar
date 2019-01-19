import React, { Component } from 'react';

class GameDetails extends Component {
  render() {
    const { game } = this.props;
    return (
      <div>
        <img alt="" src=""/>
        {game.fullDescription || <i>No description provided.</i>}
      </div>
    )
  }
}

export default GameDetails;
