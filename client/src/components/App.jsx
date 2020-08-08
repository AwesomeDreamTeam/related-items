import React from 'react';
import ProductCard from './ProductCard.jsx';
const axios = require('axios');
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: 1,
      relatedProductIds: null,
    };
  }

  componentDidMount() {
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
        <span>current product:</span>
        <span>{currentProduct}</span>
        <div>
          <h3 style={{ textAlign: 'center' }}>RELATED PRODUCTS</h3>
          <Grid container direction="row">
            <Grid item sm={3} />
            {/* conditionally render until relatedProductIds get from */}
            <Grid item container direction="row" spacing={3} sm={6} style={containerStyle}>
              {/* this.state.relatedProductIds.map() */}
              {
                relatedProductIds
                  ? relatedProductIds.map((id, key) => <ProductCard id={id} key={key} />)
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
