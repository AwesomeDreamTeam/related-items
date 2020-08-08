import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';
import StarRating from './StarRating.jsx';
const axios = require('axios');

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentId: this.props.id,
      url: 'http://52.26.193.201:3000',
      thumbnail: null,
      category: null,
      name: null,
      price: null,
      rating: null,
      isLoaded: false,
    };
    this.getRating = this.getRating.bind(this);
  }

  componentDidMount() {
    axios.all([this.getRating(), this.getNameAndCategory(), this.getThumbnailAndPrice()])
      .then(axios.spread((rating, nameAndCategory, thumbnailAndPrice) => {
        this.setState({
          rating: rating.data.ratings,
          name: nameAndCategory.data.name,
          category: nameAndCategory.data.category,
          thumbnail: thumbnailAndPrice.data.results[0].photos[0].thumbnail_url,
          price: thumbnailAndPrice.data.results[0].original_price,
          isLoaded: true,
        });
      }));
  }

  getRating() {
    return axios.get(`${this.state.url}/reviews/${this.state.currentId}/meta`);
  }

  getNameAndCategory() {
    return axios.get(`${this.state.url}/products/${this.state.currentId}`);
  }

  getThumbnailAndPrice() {
    return axios.get(`${this.state.url}/products/${this.state.currentId}/styles`);
  }

  // props.id... will be passed in and we will use that to get all other info.
  render() {
    const cardStyle = {
      // border: '1px solid red',
      height: '500px',
      width: '315px',
    };

    const mediaStyle = {
      width: 'auto',
      height: '300px',
    };

    const contentStyle = {
      lineHeight: '1px',
      padding: '0',
      paddingLeft: '15px',
      height: '200px',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    };

    return (
      <Grid item>
        {
          this.state.isLoaded
            ? (
              <Card style={cardStyle} raised>
                <CardMedia
                  style={mediaStyle}
                  image={this.state.thumbnail || 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101029/112815932-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6'}
                  title="something"
                />
                <CardContent style={contentStyle}>
                  <Typography>{this.state.category.toUpperCase()}</Typography>
                  <Typography>{this.state.name}</Typography>
                  <Typography>${this.state.price}</Typography>
                  <StarRating rating={this.state.rating} />
                </CardContent>
              </Card>
            )
            : <p>Waiting for card data..</p>
        }
      </Grid>
    )
  }
}

export default ProductCard;
