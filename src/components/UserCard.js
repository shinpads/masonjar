import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EmailIcon from '@material-ui/icons/Email';

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
      editMode: false,
    };
  }

  onCheckboxChange = (perm) => {
    const { permissions } = this.state;
    permissions[perm] = !permissions[perm];
    let changesMade = false;
    const savedPermissions = this.props.user.permissions || {};
    Object.keys(this.props.permissionsList).forEach(x => {
      if (!!savedPermissions[x] !== !!permissions[x]) {
        console.log(x, savedPermissions[x], permissions[x]);
        changesMade = true;
      }
    });
    this.setState({ permissions, changesMade });

  }

  render() {
    const { user, permissionsList } = this.props;
    const lastOnlineDate = new Date(user.lastOnline);
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
            {lastOnlineDate.toDateString().slice(3) + ' ' + lastOnlineDate.getHours() + ':' + lastOnlineDate.getMinutes()}
          </div>
        </div>
        <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
        <div className="flexbox">
          <EmailIcon style={{ fontSize: '18px', marginRight: '0.5rem' }} />
          {user.email}
        </div>
        <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
        {this.state.editMode &&
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
            <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
          </div>
        }
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          {this.state.changesMade &&
            <Button
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          }
          <Button
            variant="outlined"
            style={{ marginLeft: '0.5rem' }}
            onClick={() => {
              this.setState({ editMode: !this.state.editMode });
            }}
          >
            {this.state.editMode ? 'Cancel' : 'Edit'}
          </Button>
        </div>
      </Paper>
    );
  }
}

export default UserCard;
