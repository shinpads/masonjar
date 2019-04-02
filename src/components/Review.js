import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import api from '../api';

const Review = ({
  review,
}) => {
  return (
    <div style={{paddingLeft: '1rem', paddingRight: '1rem' }}>
      <div style={{ fontSize: '32px', fontWeight: 600 }}>
        "{review.title}"
      </div>
      <div>
        {review.description}
      </div>
    </div>
  )
}

export default Review;
