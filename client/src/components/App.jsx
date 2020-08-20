import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import AddItemCard from './AddItemCard.jsx';
import ProductCard from './ProductCard.jsx';
import OutfitCard from './OutfitCard.jsx';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProduct: 1,
      relatedProductIds: null,
      currentProductName: null,
      position: 0,
      endOfScroll: false,
      outfitList: [],
      clickedItem: false,
    };

    this.containerRef = React.createRef();

    this.handleClick = this.handleClick.bind(this);
    this.shiftLeft = this.shiftLeft.bind(this);
    this.shiftRight = this.shiftRight.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
    this.handleClickAddItem = this.handleClickAddItem.bind(this);
    this.removeItemFromOutfit = this.removeItemFromOutfit.bind(this);
  }

  componentDidMount() {
    this.updateRelatedItems();
    this.getCurrentProductName();
  }

  getCurrentProductName() {
    axios.get(`http://52.26.193.201:3000/products/${this.state.currentProduct}`)
      .then((response) => {
        this.setState({
          currentProductName: response.data.name,
        });
      })
      .catch((err) => {
        console.log('Err could not get product name', err);
      });
  }

  updateRelatedItems() {
    axios.get(`http://52.26.193.201:3000/products/${this.state.currentProduct}/related`)
      .then((response) => {
        this.setState({
          relatedProductIds: response.data,
          position: 0,
          endOfScroll: false,
          clickedItem: false,
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
      this.getCurrentProductName();
    });
  }

  shiftLeft() {
    let scrollAmount = 340;
    const container = this.containerRef.current;
    const { updatePosition } = this;

    const slideTimer = setInterval(() => {
      container.scrollLeft += 34;

      updatePosition(container.scrollLeft);
      scrollAmount -= 34;
      if (scrollAmount <= 0) {
        window.clearInterval(slideTimer);
      }
    }, 20);
  }

  shiftRight() {
    let scrollAmount = 340;
    const container = this.containerRef.current;
    const updatePosition = this.updatePosition;

    const sliderTimer = setInterval(() => {
      container.scrollLeft -= 34;

      updatePosition(container.scrollLeft);
      scrollAmount -= 34;
      if (scrollAmount <= 0) {
        window.clearInterval(sliderTimer);
      }
    }, 20);
  }

  updatePosition(scrollPosition) {
    const tempBool = this.containerRef.current.scrollWidth - Math.ceil(this.containerRef.current.scrollLeft)
      === this.containerRef.current.clientWidth - 1 || this.containerRef.current.scrollWidth - Math.ceil(this.containerRef.current.scrollLeft) === this.containerRef.current.clientWidth;

    this.setState({
      position: scrollPosition,
      endOfScroll: tempBool,
    });
  }

  handleClickAddItem(e) {
    const clickedId = this.state.currentProduct;
    const list = this.state.outfitList;
    const isItemInList = list.includes(clickedId);
    if (!this.state.clickedItem && !isItemInList) {
      const joined = this.state.outfitList.concat(clickedId);
      this.setState({
        outfitList: joined,
        clickedItem: true,
      });
    }
  }

  removeItemFromOutfit(itemId) {
    let tempList = this.state.outfitList;
    let index = tempList.indexOf(itemId);
    tempList.splice(index, 1);
    if (index !== -1) {
      this.setState({
        outfitList: tempList,
        clickedItem: false,
      });
    }
  }

  render() {
    const containerStyle = {
      marginTop: '10px',
      flexWrap: 'nowrap',
      overflow: 'hidden',
    };
    const outfitContainerStyle = {
      marginTop: '10px',
      flexWrap: 'nowrap',
      overflow: 'scroll',
      // boxShadow: '0 0 1px #FFF',
    };
    const leftGridStyle = {
      textAlign: 'right',
      position: 'relative',
      zIndex: '1',
    };

    const leftArrowStyle = {
      marginLeft: '-50',
      cursor: 'pointer',
      position: 'absolute',
      height: '100%',
      width: '70px',
      background: 'linear-gradient(90deg, rgba(48,48,48,1), rgba(48,48,48,1), rgba(48,48,48,1), rgba(48,48,48,.5), rgba(48,48,48,0))',
    };

    const rightGridStyle = {
      textAlign: 'left',
      position: 'relative',
      zIndex: '1',
    };

    const rightArrowStyle = {
      cursor: 'pointer',
      marginLeft: '-104',
      left: '50px',
      position: 'absolute',
      height: '100%',
      width: '70px',
      background: 'linear-gradient(90deg, rgba(48,48,48,0), rgba(48,48,48,.5), rgba(48,48,48,1), rgba(48,48,48,1), rgba(48,48,48,1))',
    };

    const headerStyle = {
      marginLeft: '15px',
      fontSize: '22px',
      fontWeight: 'lighter',
    };
    const cardStyle = {
      height: '500px',
      width: '315px',
    };

    const mediaStyle = {
      width: 'auto',
      height: '300px',
    };

    const contentStyle = {
      height: '200px',
      backgroundColor: 'transparent',
    };

    const { currentProduct } = this.state;
    const { relatedProductIds } = this.state;

    return (
      <div>
        <h1 id="related-items">Related Items</h1>
        <span>current product:</span>
        <span>{currentProduct}</span>
        <div>
          <Grid container direction="row">
            <Grid item sm={2} lg={3} />
            <Grid item container direction="row" spacing={4} sm={8} lg={6}>
              <h3 style={headerStyle}>RELATED PRODUCTS</h3>
            </Grid>
            <Grid item sm={2} lg={3} />
          </Grid>

          <Grid container direction="row">
            <Grid item sm={2} lg={3} style={leftGridStyle}>
              {
                this.state.position > 0
                  ? <NavigateBeforeIcon fontSize="small" style={leftArrowStyle} onClick={this.shiftRight} />
                  : null
              }
            </Grid>
            <Grid ref={this.containerRef} item container direction="row" spacing={4} sm={8} lg={6} style={containerStyle}>
              {
                relatedProductIds
                  // eslint-disable-next-line max-len
                  ? relatedProductIds.map((id, key) => <ProductCard id={id} key={key} productView={this.state.currentProduct} handleClick={this.handleClick} />)
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
            <Grid item sm={2} lg={3} style={rightGridStyle}>
              {
                !this.state.endOfScroll
                  ? <NavigateNextIcon fontSize="small" style={rightArrowStyle} onClick={this.shiftLeft} />
                  : null
              }
            </Grid>
          </Grid>
        </div>
        <div style={{ paddingTop: '50px', paddingBottom: '25px' }}>
          <Grid container direction="row">
            <Grid item sm={2} lg={3} />
            <Grid item container direction="row" spacing={4} sm={8} lg={6}>
              <h3 style={headerStyle}>MY OUTFIT</h3>
            </Grid>
            <Grid item sm={2} lg={3} />
          </Grid>


          <Grid container diretion="row">
            <Grid item sm={2} lg={3} />
            <Grid item container direction="row" spacing={4} sm={8} lg={6} style={outfitContainerStyle}>
              {
                this.state.currentProductName
                  ? (
                    <AddItemCard
                      itemName={this.state.currentProductName}
                      handleAddItem={this.handleClickAddItem}
                    />
                  )
                  : null
              }
              {
                this.state.outfitList.length
                  ? this.state.outfitList.map((id) => {
                    return <OutfitCard itemId={id} key={id} handleRemoveItem={this.removeItemFromOutfit} />
                  })
                  : null
              }
            </Grid>
            <Grid item sm={2} lg={3} />
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
