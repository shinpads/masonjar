import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

import HomeIcon from '@material-ui/icons/Home';

import LogoIcon from './logo.svg';
import MasonIcon from './masonlogo.png';

import api from './api';
import Game from './Game';

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
  gameTitle: {
    fontSize: '22px',
    fontWeight: '500',
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      selectedGame: null,
      selectedGameIndex: -1,
    };
  }
  async componentDidMount() {
    const games = await api.getGames();
    games.sort((a, b) => (b.id - a.id));
    this.setState({ games });
  }
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <AppBar position="static" color="secondary">
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
                <ListItemAvatar>
                  <Avatar alt="" src={MasonIcon}/>
                </ListItemAvatar>
                <ListItemText primary={<div>Mason Jar Studios</div>} />
              </ListItem>
            </List>
            <Divider />
            <List>
              {this.state.games.map((game) => {
                return (
                  <ListItem
                    button
                    selected={this.state.selectedGameIndex === game.id}
                    onClick={() => this.setState({ selectedGameIndex: game.id, selectedGame: game })}
                  >
                    <ListItemAvatar>
                    <Avatar alt="" src={LogoIcon}/>
                    </ListItemAvatar>
                    <ListItemText
                    primary={<div className={classes.gameTitle}>{game.title}</div>}
                    secondary={game.description}
                    />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Drawer>
        <div id="content-container">
          {this.state.selectedGame &&
            <Game key={this.state.selectedGame.id} game={this.state.selectedGame} />
          }
        </div>


      </div>
    );
  }
}

export default withStyles(styles)(App);
