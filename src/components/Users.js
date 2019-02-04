import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
const { remote } = window.require('electron');
const fs = remote.require('fs');
const { dialog } = remote;

class Users extends Component {
  constructor(props) {
    super(props);
    const path = window.localStorage.getItem('downloadPath') || '';
    this.state = {
      path: path,
    }
  }
  render() {
    return (
      <div style={{ padding: '1rem' }}>
        <Paper style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div className="flexbox" style={{ fontSize: '22px', color: '#939393'}}>
            <div style={{ marginLeft: '0.2rem', textTransform: 'uppercase' }}>Settys</div>
          </div>
          <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }}/>
          <div style={{ fontSize: '18px', textTransform: 'uppercase', marginBottom: '0.2rem' }}>Download Location</div>
          <div className="flexbox" style={{ paddingLeft: '1rem' }}>
            <div style={{ color: '#adadad', flexGrow: 1 }}>{this.state.path}</div>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
              let path = dialog.showOpenDialog({
                properties: ['openDirectory']
              });
              if (path) {
                path += '/masonjar';
                if (!fs.existsSync(path )) {
                  fs.mkdirSync(path);
                }
                this.setState({ path });
                window.localStorage.setItem('downloadPath', path);
              }
            }}
            >
              Folder
            </Button>
          </div>
          <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }}/>
        </Paper>
      </div>
    )
  }
}

export default Users;
