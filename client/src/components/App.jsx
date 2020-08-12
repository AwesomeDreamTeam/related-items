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
      firstCard: null,
      lastCard: null,
      // nodes: [],
    };

    this.containerRef = React.createRef();

    this.nodes = [];
    this.count = 0;

    this.handleClick = this.handleClick.bind(this);
    this.updateRelatedItems = this.updateRelatedItems.bind(this);
    this.retrieveNodes = this.retrieveNodes.bind(this);
  }

  componentDidMount() {
    this.updateRelatedItems();
  }

  updateRelatedItems() {
    axios.get(`http://52.26.193.201:3000/products/${this.state.currentProduct}/related`)
      .then((response) => {
        this.setState({
          relatedProductIds: response.data,
          firstCard: response.data[0],
          lastCard: response.data[response.data.length - 1],
        }, () => {
          this.count = 0;
          this.nodes = [];
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

  isOverflown() {
    console.log('this.containerRef.current.clientWidth', this.containerRef.current.clientWidth);
    //el.scrollWidth > el.clientWidth ?
    console.log('this.containerRef.current.scrollWidth', this.containerRef.current.scrollWidth);
    console.log(`first card: ${this.state.firstCard}, last card ${this.state.lastCard}`);

    // this.nodes.forEach((node) => console.log('node.id'));
    console.log('this.state.nodes.length', this.nodes);
  }

  retrieveNodes(node) {
    // let joined = this.state.nodes.concat(node);
    this.count++;
    console.log(`adding node ${node}`);
    this.nodes.push(node);

    if (this.state.relatedProductIds.length === this.count) {
      this.isOverflown();
    }
  }

  render() {
    const containerStyle = {
      padding: '20px',
      border: '1px solid black',
      flexWrap: 'nowrap',
      overflow: 'auto',
    };

    const { currentProduct } = this.state;
    const { relatedProductIds } = this.state;

    // if (relatedProductIds) {
    //   this.isOverflown();
    // }

    return (
      <div>
        <h1 id="related-items">Related Items</h1>
        <span>current product:</span>
        <span>{currentProduct}</span>
        <div>
          <h3 style={{ textAlign: 'center' }}>RELATED PRODUCTS</h3>
          <Grid container direction="row">
            <Grid item sm={2} />
            <Grid ref={this.containerRef} item container direction="row" spacing={3} sm={8} style={containerStyle}>
              {
                relatedProductIds
                  ? relatedProductIds.map((id, key) =>
                    <ProductCard id={id} key={key} productView={this.state.currentProduct} handleClick={this.handleClick} getNode={this.retrieveNodes} />)
                  : <Typography>Waiting for data...</Typography>
              }
            </Grid>
            <Grid item sm={2} />
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
