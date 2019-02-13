import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class UserCard extends Component {
  constructor(props) {
    super(props);
    const permissionsCopy = {};
    Object.keys(props.permissionsList).forEach(x => {
      if (props.user.permissions) {
        permissionsCopy[x] = props.user.permissions[x];
      } else {
        permissionsCopy[x] = false;
      }
    })
    this.state = {
      permissions: permissionsCopy,
      changesMade: false,
    };
  }

  onCheckboxChange = (perm) => {
    const { permissions } = this.state;
    permissions[perm] = !permissions[perm];
    let changesMade = false;
    const savedPermissions = this.props.user.permissions || {};
    Object.keys(this.props.permissionsList).forEach(x => {
      if (savedPermissions[x] !== permissions[x]) {
        console.log(x, savedPermissions[x], permissions[x]);
        changesMade = true;
      }
    });
    this.setState({ permissions, changesMade });

  }

  render() {
    const { user, permissionsList } = this.props;
    return (
      <Paper className="user-card">
        <div className="flexbox" style={{
          color: '#939393'
        }}>
          <PersonIcon />
          <div style={{
            marginLeft: '0.5rem',
            fontSize: '20px',
            flexGrow: 1,
          }}>
            {user.username}
          </div>
          <div>
            {new Date(user.lastOnline).toDateString()}
          </div>
        </div>
        <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
        <div>{user.email}</div>
        <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          {Object.keys(this.props.permissionsList).map(perm => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                  color="primary"
                  checked={this.state.permissions[perm]}
                  onChange={() => {
                    this.onCheckboxChange(perm);
                  }}
                  />
                }
                label={perm}
              />
            );
          })}
        </div>
        <div>
          {this.state.changesMade &&
            <div>CHANGES</div>
          }
        </div>
      </Paper>
    );
  }
}

export default UserCard;
