import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider'

class UserCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { user } = this.props;
    return (
      <Paper className="user-card">
        <div className="flexbox" style={{
          color: '#939393'
        }}>
          <PersonIcon />
          <div style={{
            marginLeft: '0.5rem',
            fontSize: '20px'
          }}>
            {user.username}
          </div>
        </div>
        <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }}/>
        {user.email}
      </Paper>
    );
  }
}

export default UserCard;
