import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';

class GameUpdates extends Component {
  render() {
    const { game } = this.props;
    return (
      <div style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        {game.updates.map((update) => {
          const date = new Date(update.date).toDateString().slice(4);
          return(
            <div>
              <div className="flexbox">
                <h3>{update.title}</h3>
                <div style={{ flexGrow: 1, textAlign: 'right', color: '#949494' }}>{date instanceof Date ? date : ''}</div>
              </div>
              <div dangerouslySetInnerHTML={{__html: update.content.replace(/(?:\r\n|\r|\n)/g, '<br />')}}/>
              <Divider style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }} />
            </div>
          );
        })}
      </div>
    )
  }
}

export default GameUpdates;
