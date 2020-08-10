import React from 'react';
import ProductCard from './ProductCard.jsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: 1,
      relatedProductIds: null,
    };

    this.handleClick = this.handleClick.bind(this);
    this.updateRelatedItems = this.updateRelatedItems.bind(this);
  }

  componentDidMount() {
    this.updateRelatedItems();
  }

  updateRelatedItems() {
    axios.get(`http://52.26.193.201:3000/products/${this.state.currentProduct}/related`)
      .then((response) => {
        this.setState({
          relatedProductIds: response.data,
        });
      })
      .catch((err) => {
        console.log('Err getting related products', err);
      });
  }

  handleClick(id) {
    this.setState({
      currentProduct: id,
      relatedProductIds: null,
    }, () => {
      this.updateRelatedItems();
    });
  }

  render() {
    const containerStyle = {
      padding: '20px',
      border: '1px solid black',
      flexWrap: 'nowrap',
      overflow: 'hidden',
    };

    const { currentProduct } = this.state;
    const { relatedProductIds } = this.state;

    return (
      <div>
        <h1 id="related-items">Related Items</h1>
        <span>current product:</span>
        <span>{currentProduct}</span>
        <div>
          <h3 style={{ textAlign: 'center' }}>RELATED PRODUCTS</h3>
          <Grid container direction="row">
            <Grid item sm={3} />
            <Grid item container direction="row" spacing={3} sm={6} style={containerStyle}>
              {
                relatedProductIds
                  ? relatedProductIds.map((id, key) =>
                    <ProductCard id={id} key={key} handleClick={this.handleClick} />)
                  : <Typography>Waiting for data...</Typography>
              }
            </Grid>
            <Grid item sm={3} />
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
