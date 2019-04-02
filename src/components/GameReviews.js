import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Review from './Review';
import api from '../api';

class GameReviews extends Component {
  constructor(props) {
    super(props);
    this.user = null;
    if (window.localStorage.getItem('user')) {
      this.user = JSON.parse(window.localStorage.getItem('user'));
    }
    this.state = {
      loading: false,
      reviews: [],
      myReview: null,
      title: '',
      description: '',
    };
  }

  saveReview = async () => {
    const { title, description } = this.state;
    const { game } = this.props;
    const body = { title, description };
    await api.postGameReview(game._id, this.user._id, body);
  }

  async componentDidMount() {
    const { game } = this.props;
    if (this.user) {
      const myReview = await api.getGameReviewUser(game._id, this.user._id);
      if (myReview) {
        this.setState({ title: myReview.title, description: myReview.description });
      }
    }
    const reviews = await api.getGameReviews(game._id);
    console.log(reviews);
    this.setState({ reviews });
  }

  render() {

    return (
      <div>
        <div style={{ marginLeft: '1rem', marginRight: '1rem' }}>
          <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
          <div style={{ fontSize: '22px', marginBottom: '0.5rem' }}>
            My Review
          </div>
          <TextField
            label="Tile"
            variant="outlined"
            fullWidth
            style={{ marginBottom: '0.8rem' }}
            value={this.state.title}
            onChange={e => this.setState({ title: e.currentTarget.value })}
          />
          <TextField
            label="Review"
            variant="outlined"
            fullWidth
            multiline
            rowsMin="4"
            style={{ marginBottom: '0.8rem' }}
            value={this.state.description}
            onChange={e => this.setState({ description: e.currentTarget.value })}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.saveReview}
            >
            Save
            </Button>
          </div>
          <Divider style={{ marginTop: '1rem', marginBottom: '1rem' }} />
        </div>
        <div>
          {this.state.reviews.map(review => {
            return (
              <Review key={review.userId} review={review}/>
            )
          })}
        </div>
      </div>
    )
  }
}

export default GameReviews;
