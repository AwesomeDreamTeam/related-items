import React from 'react';
const axios = require('axios');
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid } from '@material-ui/core';

class ProductCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentId: this.props.id,
      thumbnail: null,

    }
  }


  componentDidMount() {
    // get request to get info
    let thumbnail;
    let name;
    let category;
    let price;
    let salePrice;

    axios.get(`http://52.26.193.201:3000/products/${this.state.currentId}/styles`)
      .then((response) => {
        console.log('resp from get styles', response.data);
      })
      .catch((err) => {
        console.log('Err getting styles', err);
      });
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
        <Card style={cardStyle} raised>
          <CardMedia
            style={mediaStyle}
            image="https://images.unsplash.com/photo-1560567546-4c6dbc16877b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80"
            title="something"
          />
          <CardContent style={contentStyle}>
            {/*
          1) Category
          2) Name of product
          3) Price
          4) star review
        */}
            <Typography>CATEGORY</Typography>
            <Typography>Name of Product</Typography>
            <Typography>Price</Typography>
            <Typography>Star reviews</Typography>
          </CardContent>

        </Card>
      </Grid>
    )
  }
}

export default ProductCard;
