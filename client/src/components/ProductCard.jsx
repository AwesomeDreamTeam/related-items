import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import StarRating from './StarRating.jsx';

const axios = require('axios');

class ProductCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productView: this.props.productView,
      currentId: this.props.id,
      thumbnail: null,
      category: null,
      name: null,
      price: null,
      rating: null,
      isLoaded: null,
    };

    this.url = 'http://52.26.193.201:3000';
    this.handleCardClick = this.handleCardClick.bind(this);
  }

  componentDidMount() {
    this.updateProducts();
    this.currentNode();
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

  handleCardClick(e) {
    e.preventDefault();
    if (e.target.nodeName === 'svg' || e.target.nodeName === 'path' || e.target.nodeName === 'BUTTON') {
      console.log(`compare ${this.state.currentId} with ${this.state.productView}`);
    } else {
      console.log('clicked on card, e.target', e.target.nodeName);
      this.props.handleClick(this.state.currentId);
    }
  }

  currentNode() {
    const node = ReactDOM.findDOMNode(this);
    this.props.getNode(node);
  }

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

    const iconButtonStyle = {
      // backgroundColor: 'red',
    };

    const iconStyle = {
      color: 'white',
    };

    return (
      <Grid item id={this.state.currentId}>
        {
          this.state.isLoaded
            ? (
              <Card style={cardStyle} raised>
                <CardActionArea onClick={this.handleCardClick}>
                  <CardMedia
                    style={mediaStyle}
                    image={this.state.thumbnail || 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101029/112815932-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6'}
                    title={this.state.name}
                  >
                    <CardContent style={buttonStyle}>
                      <IconButton id="icon-button" title="Compare Products" style={iconButtonStyle}>
                        <CompareArrowsIcon id="icon" fontSize="large" style={iconStyle} />
                      </IconButton>
                    </CardContent>
                  </CardMedia>

                  <CardContent style={contentStyle}>
                    <Typography>{this.state.category.toUpperCase()}</Typography>
                    <Typography>{this.state.name}</Typography>
                    <Typography>${this.state.price}</Typography>
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
