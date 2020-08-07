import React from 'react';
import ProductCard from './ProductCard.jsx';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: 1,
    };
  }

  render() {

    // const breakStyle = {
    //   paddingTop: '40px',
    // };

    const containerStyle = {
      border: "1px solid black",
      flexWrap: "nowrap",
      overflow: 'hidden'
    };

    const { product } = this.state;

    return (
      <div>
        <h2>Hello, from the App component</h2>
        <span>current product:</span>
        <span>{product}</span>
        <div>
          <h3 style={{ textAlign: 'center' }}>RELATED PRODUCTS</h3>
          <Grid container direction="row">
            <Grid item sm={3} />
            <Grid item container sm={6} spacing={2} style={containerStyle}>
              <Grid item xs={12} sm={3} >
                <ProductCard />
              </Grid>
              <Grid item xs={12} sm={3}>
                <ProductCard />
              </Grid>
              <Grid item xs={12} sm={3} >
                <ProductCard />
              </Grid>
              <Grid item xs={12} sm={3} >
                <ProductCard />
              </Grid>

            </Grid>
            <Grid item sm={3} />
          </Grid>



          {/* <p style={breakStyle} />
          <Container maxWidth="lg">
            <h2>YOUR OUTFIT</h2>
            <Typography component="div" style={{ backgroundColor: 'black', height: '45vh' }} />
          </Container> */}
        </div>
      </div>
    );
  }
}

export default App;
