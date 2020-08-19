import React from 'react';
import { Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const StarRating = ({ rating }) => {
  const total = Object.values(rating).reduce(
    (acc, val) => acc + val, 0
  );
  let weightedTotal = 0;
  for (let key in rating) {
    weightedTotal += parseInt(key) * parseInt(rating[key]);
  }
  const avg = weightedTotal / total;
  return (
    avg
      ? <Rating name="read-only" precision={0.25} value={avg} readOnly />
      : <p />
  );
};

export default StarRating;
