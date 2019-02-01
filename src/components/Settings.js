import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
const { remote } = window.require('electron');
const { dialog } = remote;

class Settings extends Component {
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
            <SettingsIcon />
            <div style={{ marginLeft: '0.2rem', textTransform: 'uppercase' }}>Settys</div>
          </div>
          <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }}/>
          <Button onClick={() => {
            const path = dialog.showOpenDialog({
              properties: ['openDirectory']
            });
            this.setState({ path });
            window.localStorage.setItem('downloadPath', path);
          }}>Folder</Button>
          <div>{this.state.path}</div>
        </Paper>
      </div>
    )
  }
}

export default Settings;
