import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import NewUpdate from './NewUpdate';

class GameUpdates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addUpdateOpen: false,
    }
  }
  render() {
    let user = null;
    if (window.localStorage.getItem('user')) {
      user = JSON.parse(window.localStorage.getItem('user'));
    }
    const { game } = this.props;
    return (
      <div style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        {user && user.permissions && user.permissions.EDIT_UPDATES &&
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
              <Button onClick={() => {
                this.setState({ addUpdateOpen: !this.state.addUpdateOpen });
              }}>
                <AddBoxIcon />
                <div style={{ marginLeft: '0.4rem' }}>Add Update</div>
              </Button>
            </div>
            <NewUpdate open={this.state.addUpdateOpen}/>
          </div>
        }
        {game.updates.map((update) => {
          let date = ''
          if (update.date) date = new Date(update.date).toDateString().slice(4);
          return(
            <div>
              <div className="flexbox">
                <h3>{update.title}</h3>
                <div style={{ flexGrow: 1, textAlign: 'right', color: '#949494' }}>{date}</div>
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
