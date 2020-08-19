import React from 'react';
import axios from 'axios';

import { createShallow, createMount, createRender } from '@material-ui/core/test-utils';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactTestUtils from 'react-dom/test-utils';
import App from '../client/src/components/App';
import ProductCard from '../client/src/components/ProductCard';

configure({ adapter: new Adapter() });

const mockCurrentProduct = 1;
const mockPosition = 0;
const mockEndOfScroll = false;
const mockRelated = [2, 3, 8, 7];

describe('Test of App component', () => {
  let wrapper;

  it('shallow renders App state', () => {
    wrapper = shallow(<App />);
    expect(wrapper.state('position')).toEqual(mockPosition);
    expect(wrapper.state('endOfScroll')).toBe(mockEndOfScroll);
  });

  test('should default to use product id 1', () => {
    wrapper = shallow(<App />);
    expect(wrapper.state('currentProduct')).toEqual(mockCurrentProduct);
  });

  it('should update position when scroll buttons are clicked', () => {
    wrapper = mount(<App />);
    const appInstance = wrapper.instance();

    appInstance.updatePosition(10);
    expect(wrapper.state('position')).toBe(10);

    appInstance.updatePosition(-10);
    expect(wrapper.state('position')).toBe(-10);
  });

  it('should map all given related items', () => {
    wrapper = mount(<App />);
    const appInstance = wrapper.instance();
    appInstance.setState({ relatedProductIds: mockRelated });
    expect(wrapper.state('relatedProductIds')).toEqual(mockRelated);
  });

  //  expect(wrapper.find(ProductCard).length).toBe(4);
  it('should update current id when card is clicked', () => {
    wrapper = mount(<App />);
    const appInstance = wrapper.instance();
    appInstance.handleClick(3);
    expect(wrapper.state('currentProduct')).toBe(3);
  });
});
