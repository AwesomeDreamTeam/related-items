import React from 'react';
import ProductCard from './ProductCard.jsx';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: 1,
      relatedProductIds: null,
      position: 0,
      endOfScroll: false,
    };

    this.containerRef = React.createRef();

    this.handleClick = this.handleClick.bind(this);
    this.shiftLeft = this.shiftLeft.bind(this);
    this.shiftRight = this.shiftRight.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  componentDidMount() {
    this.updateRelatedItems();
  }

  updateRelatedItems() {
    axios.get(`http://52.26.193.201:3000/products/${this.state.currentProduct}/related`)
      .then((response) => {
        this.setState({
          relatedProductIds: response.data,
          position: 0,
          endOfScroll: false,
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

  shiftLeft() {
    let scrollAmount = 335;
    const container = this.containerRef.current;
    const updatePosition = this.updatePosition;

    const slideTimer = setInterval(() => {
      container.scrollLeft += 33.5;

      updatePosition(container.scrollLeft);
      scrollAmount -= 33.5;
      if (scrollAmount <= 0) {
        window.clearInterval(slideTimer);
      }
    }, 20);
  }

  shiftRight() {
    let scrollAmount = 335;
    const container = this.containerRef.current;
    const updatePosition = this.updatePosition;

    const sliderTimer = setInterval(() => {
      container.scrollLeft -= 33.5;

      updatePosition(container.scrollLeft);
      scrollAmount -= 33.5;
      if (scrollAmount <= 0) {
        window.clearInterval(sliderTimer);
      }
    }, 20);
  }

  updatePosition(scrollPosition) {
    const tempBool = this.containerRef.current.scrollWidth - Math.ceil(this.containerRef.current.scrollLeft) === this.containerRef.current.clientWidth - 1;

    this.setState({
      position: scrollPosition,
      endOfScroll: tempBool,
    });
  }

  render() {
    const containerStyle = {
      padding: '20px',
      // border: '1px solid black',
      flexWrap: 'nowrap',
      overflow: 'hidden',
      // backgroundColor: '#f8f8ff',
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
      cursor: 'pointer',
      position: 'absolute',
      height: '100%',
      width: '70px',
      background: 'linear-gradient(90deg, rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,.5), rgba(255,255,255,0))',
    };

    const rightGridStyle = {
      // border: '1px solid red',
      textAlign: 'left',
      position: 'relative',
      zIndex: '1',
    };

    const rightArrowStyle = {
      cursor: 'pointer',
      marginLeft: '-104',
      left: '50px',
      // border: '1px solid red',
      position: 'absolute',
      height: '100%',
      width: '70px',
      background: 'linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,1))',
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
            <Grid item sm={3} style={leftGridStyle}>
              {
                this.state.position > 0
                  ? <NavigateBeforeIcon fontSize="small" style={leftArrowStyle} onClick={this.shiftRight} />
                  : null
              }
            </Grid>
            <Grid ref={this.containerRef} item container direction="row" spacing={4} sm={6} style={containerStyle}>
              {
                relatedProductIds
                  // eslint-disable-next-line max-len
                  ? relatedProductIds.map((id, key) => <ProductCard id={id} key={key} productView={this.state.currentProduct} handleClick={this.handleClick} />)
                  : <Typography>Waiting for data...</Typography>
              }
            </Grid>
            <Grid item sm={3} style={rightGridStyle}>
              {
                !this.state.endOfScroll
                  ? <NavigateNextIcon fontSize="small" style={rightArrowStyle} onClick={this.shiftLeft} />
                  : null
              }
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
