import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import HomeIcon from '@material-ui/icons/HomeRounded';

class MasonJarHome extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ padding: '1rem' }}>
        <Paper style={{ padding: '1rem', marginBottom: '1rem' }}>
          <div className="flexbox" style={{ fontSize: '22px', color: '#939393'}}>
            <HomeIcon variant="rounded"/>
            <div style={{ marginLeft: '0.2rem', textTransform: 'uppercase' }}>Mason Jar</div>
          </div>
          <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }}/>
          hey
        </Paper>
      </div>
    )
  }
}

export default MasonJarHome;
