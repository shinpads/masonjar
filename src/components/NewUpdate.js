import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';


class NewUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
    };
  }

  render() {
    const { open } = this.props;
    if (!open) return <div />
    return (
      <div>
        <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
        <TextField
          label="Tile"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '0.8rem' }}
          value={this.state.email}
          onChange={e => this.setState({ title: e.currentTarget.value })}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '0.8rem' }}
          value={this.state.email}
          onChange={e => this.setState({ content: e.currentTarget.value })}
        />
        <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
      </div>
    )
  }
}

export default NewUpdate;
