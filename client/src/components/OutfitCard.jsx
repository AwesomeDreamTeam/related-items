import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';
import StarRating from './StarRating.jsx';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const axios = require('axios');

class OutfitCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // currentId: this.props.itemId,
      thumbnail: null,
      category: null,
      name: null,
      price: null,
      rating: null,
      isLoaded: null,
    };

    this.url = 'http://52.26.193.201:3000';
  }

  componentDidMount() {
    this.updateProducts();
  }

  getRating() {
    return axios.get(`${this.url}/reviews/${this.props.itemId}/meta`);
  }

  getNameAndCategory() {
    return axios.get(`${this.url}/products/${this.props.itemId}`);
  }

  getThumbnailAndPrice() {
    return axios.get(`${this.url}/products/${this.props.itemId}/styles`);
  }

  updateProducts() {
    axios.all([
      this.getRating(),
      this.getNameAndCategory(),
      this.getThumbnailAndPrice()])
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
      <Grid item id={this.props.itemId}>
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
                    <IconButton onClick={() => this.props.handleRemoveItem(this.props.itemId)}>
                      <HighlightOffIcon fontSize="large" />
                    </IconButton>
                  </CardContent>
                </CardMedia>

                <CardContent style={contentStyle}>
                  <Typography style={categoryStyle}>
                    {this.state.category.toUpperCase()}
                  </Typography>
                  <Typography style={nameStyle}>
                    {this.state.name}
                  </Typography>
                  <Typography style={priceStyle}>
                    ${this.state.price}
                  </Typography>
                  <StarRating rating={this.state.rating} />
                </CardContent>

              </Card>
            )
            : (
              <Card style={cardStyle}>
                <CardMedia
                  style={mediaStyle}
                  image="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
                />
                <CardContent style={contentStyle} />
              </Card>
            )
        }
      </Grid>
    );
  }
}

export default OutfitCard;
