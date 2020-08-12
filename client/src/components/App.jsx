import React from 'react';
import ProductCard from './ProductCard.jsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Grid } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: 1,
      relatedProductIds: null,
      firstCard: null,
      lastCard: null,
      overflowRight: false,
      overflowLeft: false,
      lastCardEdge: null,
      firstCardEdge: null,
      containerRightEdge: null,
      containerLeftEdge: null,
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
    let last = this.nodes[this.nodes.length - 1];
    let lastRect = last.getBoundingClientRect();
    let contRect = this.containerRef.current.getBoundingClientRect();

    this.setState({
      lastCardEdge: lastRect.right,
      containerRightEdge: this.containerRef.current.clientWidth,
      containerLeftEdge: contRect.left,
    });


    // console.log('this.containerRef.current.clientWidth', this.containerRef.current.clientWidth);
    // //el.scrollWidth > el.clientWidth ?
    // console.log('this.containerRef.current.scrollWidth', this.containerRef.current.scrollWidth);
    console.log(`first card: ${this.state.firstCard}, last card ${this.state.lastCard}`);

    // this.nodes.forEach((node) => console.log('node.id'));
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
      // border: '1px solid black',
      flexWrap: 'nowrap',
      overflow: 'auto',
    };

    const leftGridStyle = {
      // border: '1px solid red',
      textAlign: 'right',
      position: 'relative',
      background: 'rgba(255, 255, 255, 1)',
      zIndex: '1',
    };

    const leftArrowStyle = {
      // border: '1px solid red',
      position: 'absolute',
      height: '100%',
      width: '70px',
      background: 'linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,.5), rgba(255,255,255,0))',
    };

    const rightGridStyle = {
      backgroundColor: 'rgba(255, 255,255,0)',
      // border: '1px solid red',
      textAlign: 'left',
      position: 'relative',
      // background: 'rgba(255, 255, 255, 1)',
      zIndex: '1',
    };

    const rightArrowStyle = {
      marginLeft: '-52',
      // border: '1px solid red',
      position: 'absolute',
      height: '100%',
      width: '70px',
      background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.5), rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,1))',
    };

    const { currentProduct } = this.state;
    const { relatedProductIds } = this.state;

    console.log('last card edge', this.state.lastCardEdge);

    return (
      <div>
        <h1 id="related-items">Related Items</h1>
        <span>current product:</span>
        <span>{currentProduct}</span>
        <div>
          <h3 style={{ textAlign: 'center' }}>RELATED PRODUCTS</h3>
          <Grid container direction="row">
            <Grid item sm={2} lg={3} style={leftGridStyle}>
              <ArrowBackIosIcon fontSize="small" style={leftArrowStyle} />
            </Grid>
            <Grid ref={this.containerRef} item container direction="row" spacing={4} sm={8} lg={6} style={containerStyle}>

              {
                relatedProductIds
                  ? relatedProductIds.map((id, key) =>
                    <ProductCard id={id} key={key} productView={this.state.currentProduct} handleClick={this.handleClick} getNode={this.retrieveNodes} />)
                  : <Typography>Waiting for data...</Typography>
              }
            </Grid>
            <Grid item sm={2} lg={3} style={rightGridStyle}>
              <ArrowForwardIosIcon fontSize="small" style={rightArrowStyle} />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
