import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';
import CompareModal from './CompareModal.jsx';


import StarRating from './StarRating.jsx';

const axios = require('axios');

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productView: this.props.productView,
      productViewInfo: null,
      currentId: this.props.id,
      thumbnail: null,
      category: null,
      name: null,
      price: null,
      rating: null,
      features: null,
      isLoaded: null,
    };

    this.url = 'http://52.26.193.201:3000';
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  componentDidMount() {
    this.updateProducts();
  }

  getProductView() {
    return axios.get(`${this.url}/products/${this.state.productView}`);
  }

  getRating() {
    return axios.get(`${this.url}/reviews/${this.state.currentId}/meta`);
  }

  getNameAndCategory() {
    return axios.get(`${this.url}/products/${this.state.currentId}`);
  }

  getThumbnailAndPrice() {
    return axios.get(`${this.url}/products/${this.state.currentId}/styles`);
  }

  updateProducts() {
    axios.all([this.getProductView(), this.getRating(), this.getNameAndCategory(), this.getThumbnailAndPrice()])
      .then(axios.spread((productView, rating, nameAndCategory, thumbnailAndPrice) => {
        this.setState({
          productViewInfo: productView.data,
          rating: rating.data.ratings,
          name: nameAndCategory.data.name,
          features: nameAndCategory.data.features,
          category: nameAndCategory.data.category,
          thumbnail: thumbnailAndPrice.data.results[0].photos[0].thumbnail_url,
          price: thumbnailAndPrice.data.results[0].original_price,
          isLoaded: true,
        });
      }));
  }

  handleCardClick(e) {
    e.preventDefault();
    this.props.handleClick(this.state.currentId);
  }

  render() {
    const cardStyle = {
      height: '500px',
      width: '315px',
    };

    const mediaStyle = {
      width: 'auto',
      height: '300px',
    };

    const contentStyle = {
      padding: '0',
      paddingLeft: '15px',
      height: '200px',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
    };

    const buttonStyle = {
      background: 'linear-gradient(0deg, rgba(168,168,168, 0) 0%, rgba(40,40,40,.8) 100%, rgba(0,212,255,1) 100%)',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    };

    const categoryStyle = {
      fontWeight: 'lighter',
    };

    const nameStyle = {
      fontWeight: 'bold',
      fontSize: '22px',
    };

    const priceStyle = {
      fontWeight: 'lighter',
    };

    return (
      <Grid item id={this.state.currentId}>
        {
          this.state.isLoaded
            ? (
              <Card style={cardStyle} raised>

                <CardMedia
                  style={mediaStyle}
                  image={this.state.thumbnail || 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101029/112815932-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6'}
                  title={this.state.name}
                >
                  <CardContent style={buttonStyle}>
                    <CompareModal comparedProductName={this.state.name} comparedProductCategory={this.state.category} currentProductInfo={this.state.productViewInfo} comparedProductFeatures={this.state.features} />
                  </CardContent>
                </CardMedia>
                <CardActionArea onClick={this.handleCardClick}>

                  <CardContent style={contentStyle}>
                    <Typography style={categoryStyle}>{this.state.category.toUpperCase()} </Typography>
                    <Typography style={nameStyle}>{this.state.name}</Typography>
                    <Typography style={priceStyle}>${this.state.price}</Typography>
                    <StarRating rating={this.state.rating} />
                  </CardContent>
                </CardActionArea>
              </Card>
            )
            : <p>Waiting for card data..</p>
        }
      </Grid>
    );
  }
}

export default ProductCard;
