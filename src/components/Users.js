import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import CustomSpinner from './CustomSpinner';
import UserCard from './UserCard';
import api from '../api';

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: [],
    }
  }

  async componentDidMount() {
    const users = await api.getUsers();
    this.setState({ loading: false, users });
    console.log(users);
  }

  render() {
    if (this.state.loading) {
      return (
        <div style={{ padding: '1rem', height: '80vh', display: 'flex', alignItems: 'center' }}>
          <CustomSpinner />
        </div>
      )
    }
    return (
      <div style={{ padding: '1rem' }}>
        {this.state.users.map(user => {
          return (
            <UserCard user={user} />
          )
        })}
      </div>
    )
  }
}

export default Users;
