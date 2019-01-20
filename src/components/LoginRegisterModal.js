import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import TextField from '@material-ui/core/TextField';

import api from '../api';
import Tabs from './Tabs';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      error: false,
    };
  }

  submit = async () => {
    this.setState({ loading: true });

    const res = await api.login(this.state.email, this.state.password);
    if (res) this.props.onClose();
    this.setState({ loading: false, error: !res });
  }

  render() {
    return (
      <div>
        <div style={{ padding: '2rem', paddingBottom: '1rem', paddingTop: '0' }}>
          <div><h3>Login</h3></div>
          {this.state.error && <Paper
            style={{
              backgroundColor:'#c36363',
              marginBottom:'1rem',
              padding:'1rem',
              fontWeight: 500,
            }}>Failed to log in.</Paper>}
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '9.4rem' }}>
            <TextField
              label="Email"
              variant="outlined"
              style={{ marginBottom: '0.8rem' }}
              value={this.state.email}
              onChange={e => this.setState({ email: e.currentTarget.value })}
            />
            <TextField
              type="password"
              label="Password"
              variant="outlined"
              style={{ marginBottom: '0.8rem' }}
              value={this.state.password}
              onChange={e => this.setState({ password: e.currentTarget.value })}
            />
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.submit}
              disabled={this.state.loading}
            >
              Login
            </Button>
          </div>
        </div>
        {this.state.loading
          ? <LinearProgress color="secondary"/>
          : <div style={{ height: '4px', width: '100%', backgroundColor: '#2a2a2a' }}/>
        }
      </div>
    );
  }
}

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      emailError: false,
      usernameError: false,
      passwordError: false,
      confirmPasswordError: false,
      loading: false,
      error: false,
      success: false,
    };
  }

  submit = async () => {
    this.setState({ loading: true });
    let err = false;
    if (!validateEmail(this.state.email)) err = true;
    if (this.state.password !== this.state.confirmPassword) err = true;
    if (this.state.password.length < 4) err = true;
    if (this.state.confirmPassword.length < 4) err = true;
    if (this.state.username.length < 4) err = true;

    if (err) return this.setState({ loading: false, error: true, success: false });

    const res = await api.register(this.state.email, this.state.username, this.state.password);

    this.setState({ loading: false, error: !res, success: res });
  }

  render() {
    return (
      <div>
        <div style={{ padding: '2rem', paddingBottom: '1rem', paddingTop: '0' }}>
          <div><h3>Register</h3></div>
          {this.state.error && <Paper
            style={{
              backgroundColor:'#c36363',
              marginBottom:'1rem',
              padding:'1rem',
              fontWeight: 500,
            }}>Failed to register.</Paper>}
          {this.state.success && <Paper
            style={{
              backgroundColor:'#00b1d6',
              marginBottom:'1rem',
              padding:'1rem',
              fontWeight: 500,
            }}>Success! Account created</Paper>}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              label="Email"
              variant="outlined"
              style={{ marginBottom: '0.8rem' }}
              value={this.state.email}
              onChange={e => {
                this.setState({ email: e.currentTarget.value });
                if (this.state.emailError) {
                  if (validateEmail(e.currentTarget.value)) {
                    this.setState({ emailError: false });
                  }
                }
              }}
              onBlur={() => {
                if (!validateEmail(this.state.email)) this.setState({ emailError: true });
                else this.setState({ emailError: false });
              }}
              error={this.state.emailError}
            />
            <TextField
              label="Username"
              variant="outlined"
              style={{ marginBottom: '0.8rem' }}
              value={this.state.username}
              onChange={e => {
                this.setState({ username: e.currentTarget.value });
                if (this.state.usernameError) {
                  if (e.currentTarget.value.length >= 4) {
                    this.setState({ usernameError: false });
                  }
                }
              }}
              onBlur={() => {
                if (this.state.username.length < 4) this.setState({ usernameError: true });
                else this.setState({ usernameError: false });
              }}
              error={this.state.usernameError}
            />
            <TextField
              type="password"
            label="Password"
            variant="outlined"
            style={{ marginBottom: '0.8rem' }}
            value={this.state.password}
            onChange={e => {
              this.setState({ password: e.currentTarget.value });
              if (this.state.passwordError) {
                if (e.currentTarget.value.length >= 4) {
                  this.setState({ passwordError: false });
                }
              }
            }}
            onBlur={() => {
              if (this.state.password.length < 4) this.setState({ passwordError: true });
              else this.setState({ passwordError: false });
            }}
            error={this.state.passwordError}
            />
            <TextField
              type="password"
              label="Confirm Password"
              variant="outlined"
              style={{ marginBottom: '0.8rem' }}
              value={this.state.confirmPassword}
              onChange={e => {
                this.setState({ confirmPassword: e.currentTarget.value });
                if (this.state.confirmPasswordError) {
                  if (e.currentTarget.value.length >= 4 && e.currentTarget.value === this.state.password) {
                    this.setState({ confirmPasswordError: false });
                  }
                }
              }}
              onBlur={() => {
                if (this.state.confirmPassword.length < 4 || this.state.confirmPassword !== this.state.password) this.setState({ confirmPasswordError: true });
                else this.setState({ confirmPasswordError: false });
              }}
              error={this.state.confirmPasswordError}
            />
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.submit}
              disabled={this.state.loading}
            >
              Register
            </Button>
          </div>
        </div>
        {this.state.loading
          ? <LinearProgress color="secondary"/>
          : <div style={{ height: '4px', width: '100%', backgroundColor: '#2a2a2a' }}/>
        }
      </div>
    );
  }
}

const sections = ['Login', 'Register'];
let content = [<LoginForm />, <RegisterForm />];


class LoginRegisterModal extends Component {
  constructor(props) {
    super(props);
    content = [<LoginForm onClose={props.onClose} />, <RegisterForm />];
  }
  render() {
    const { open, onClose } = this.props;
    return (
      <Modal
        open={open}
        onClose={onClose}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            outline: 0,
            pointerEvents: 'none',
          }}
        >
          <Paper style={{ pointerEvents: 'initial', paddingTop: '1rem' }}>
            <Tabs sections={sections} content={content} />

          </Paper>
        </div>
      </Modal>
    );
  }
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default LoginRegisterModal;
