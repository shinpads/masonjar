import React, { Component } from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';

const drawerWidth = 300;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1, textAlign: 'left', marginLeft: '300px' }}>
              Mason Jar Launcher
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="left"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div>
            <Divider />
            <List>
              <ListItem button>
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home"/>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem button>
                <ListItemText
                  primary="Island 714"
                  secondary="Top down shooter game"
                />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(App);
