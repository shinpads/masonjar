import React, { Component } from 'react';
import PersonIcon from '@material-ui/icons/Person';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import api from '../api';

class User extends Component {
  constructor (props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
  }

  render() {
    const { user, loggedOut } = this.props;
    return (
      <div>
        <Button
          className="flexbox"
          onClick={e => this.setState({ open: true, anchorEl: e.currentTarget })}
        >
          <div style={{ fontWeight: 500, fontDecoration: 'underline', marginRight: '0.3rem'}}>{user.username}</div>
          <PersonIcon />
        </Button>
        <Menu
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={() => this.setState({ open: false, anchorEl: null })}

        >
          <MenuItem onClick={async () => { await api.logout(); loggedOut(); }}>Log Out</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default User;
