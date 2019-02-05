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
import LoginRegisterModal from './components/LoginRegisterModal';
import { withStyles } from '@material-ui/core/styles';
import DownloadProgress from './components/DownloadProgress';
import MasonJarHome from './components/MasonJarHome';
import Settings from './components/Settings';
import Users from './components/Users';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import LogoIcon from './logo.svg';
import MasonIcon from './masonlogo.png';

import api from './api';
import Game from './Game';
import User from './components/User';

const { remote } = window.require('electron');
const fs = remote.require('fs');
const rimraf = remote.require('rimraf');
const { execFile } = remote.require('child_process');

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
    let downloads = window.localStorage.getItem('downloads') || "{}";
    downloads = JSON.parse(downloads);
    this.state = {
      games: [],
      selectedGame: null,
      selectedTab: 'home',
      loginRegisterModalOpen: false,
      inDownload: false,
      downloadProgress: 0,
      gameDownloading: null,
      anchorEl: null,
      selectedMenuItem: null,
      downloads,
    };
  }

  async componentDidMount() {
    await api.getUserFromSession();
    const games = await api.getGames();
    games.sort((a, b) => (b._id - a._id));
    this.setState({ games });
  }

  downloadGame = async (game) => {
    this.setState({ downloadProgress: 0, inDownload: true, gameDownloading: game });
    const details = await api.downloadGame(
      game,
      './downloads',
      (progress) => {
        // on progress
        if (progress - this.state.downloadProgress > 0.01) {
          this.setState({ downloadProgress: progress });
        }
      },
      () => {
        // download done
        this.setState({ downloadProgress: 1 });

      },
      () => {
        // install done
        const { downloads } = this.state;
        this.setState({ inDownload: false, gameDownloading: null });
        downloads[game.title] = game.version;
        window.localStorage.setItem('downloads', JSON.stringify(downloads));
        this.setState({ downloads });
      }
    );
  }

  playGame = async (game) => {
    const path = window.localStorage.getItem('downloadPath') + '/' + game.title;
    fs.readdir(path, (err, items) => {
      items = items.filter(item => item.substring(item.length - 4, item.length) === '.exe');
      console.log(items);
      execFile(path + '/' + items[0], (err, data) => {
        console.log(err, data);
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { downloads } = this.state;
    let user = null;
    if (window.localStorage.getItem('user')) {
      user = JSON.parse(window.localStorage.getItem('user'));
    }
    return (
      <div className="App">
        {this.state.inDownload && <DownloadProgress progress={this.state.downloadProgress} game={this.state.gameDownloading} /> }
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1, textAlign: 'left', marginLeft: '300px' }}>
              Mason Jar Launcher
            </Typography>
            {!!user
              ? (
                <User user={user} loggedOut={() => this.forceUpdate()} />
              )
              : (
              <Button
                color="inherit"
                variant="contained"
                onClick={() => this.setState({ loginRegisterModalOpen: true })}
              >
                <div style={{ color: 'black' }}>Login / Register</div>
              </Button>
            )
          }
          </Toolbar>
        </AppBar>
        <Menu
          anchorEl={this.state.anchorEl}
          open={!!this.state.anchorEl}
          onClose={() => this.setState({ open: false, anchorEl: null })}
        >
          <MenuItem onClick={async () => {
              let downloadPath = window.localStorage.getItem('downloadPath');
              downloads[this.state.selectedMenuItem] = null;
              window.localStorage.setItem('downloads', JSON.stringify(downloads));
              this.setState({ selectedMenuItem: null, anchorEl: null, downloads });
              rimraf(downloadPath + '/' + this.state.selectedMenuItem, () => {});
          }}>Uninstall</MenuItem>
        </Menu>
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
              <ListItem button selected={this.state.selectedTab === 'home'}>
                <img src={MasonIcon} width={24}/>
                <ListItemText
                  onClick={() => this.setState({ selectedGame: null, selectedTab: 'home' })}
                  primary={<div>Mason Jar Studios</div>}
                />
              </ListItem>
              <ListItem button selected={this.state.selectedTab === 'settings'}>
                <SettingsIcon />
                <ListItemText
                  onClick={() => this.setState({ selectedGame: null, selectedTab: 'settings' })}
                  primary={<div>Settings</div>}
                />
              </ListItem>
              {user && user.permissions && user.permissions.EDIT_USERS &&
                <ListItem button selected={this.state.selectedTab === 'users'}>
                  <PersonIcon />
                  <ListItemText
                    onClick={() => this.setState({ selectedGame: null, selectedTab: 'users' })}
                    primary={<div className="flexbox"><div style={{ flexGrow: 1 }}>Users</div><div style={{ color: '#7ab2be' }}>ADMIN</div></div>}
                  />
                </ListItem>
              }
            </List>
            <Divider />
            <List>
              {this.state.games.map((game) => {
                return (
                  <ListItem
                    button
                    selected={this.state.selectedTab === game._id}
                    onClick={() => this.setState({ selectedTab: game._id, selectedGame: game })}
                    onContextMenu={(e) => downloads[game.title] && this.setState({ anchorEl: e.currentTarget, selectedMenuItem: game.title })}
                  >
                    <ListItemAvatar>
                    <Avatar alt="" src={game.imageId ? 'https://drive.google.com/uc?id=' + game.imageId : MasonIcon}/>
                    </ListItemAvatar>
                    <ListItemText
                    primary={<div className={classes.gameTitle} style={{
                      color: downloads[game.title] ? '#fff' : '#c2c2c2'
                    }}>{game.title}</div>}
                    secondary={game.description}
                    />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </Drawer>
        <LoginRegisterModal
          open={this.state.loginRegisterModalOpen}
          onClose={() => this.setState({ loginRegisterModalOpen: false })}
        />
        <div id="content-container">
          {this.state.selectedGame &&
            <Game
              key={this.state.selectedGame._id}
              game={this.state.selectedGame}
              downloadGame={this.downloadGame}
              playGame={this.playGame}
              gameDownloading={this.state.gameDownloading}
              downloads={downloads}
            />
          }
          {this.state.selectedTab === 'home' &&
            <MasonJarHome />
          }
          {this.state.selectedTab === 'settings' &&
            <Settings />
          }
          {this.state.selectedTab === 'users' &&
            <Users />
          }
        </div>


      </div>
    );
  }
}

export default withStyles(styles)(App);
