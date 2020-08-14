import React from 'react';
import axios from 'axios';

import { createShallow, createMount, createRender } from '@material-ui/core/test-utils';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactTestUtils from 'react-dom/test-utils';
import App from '../client/src/components/App';

configure({ adapter: new Adapter() });

const mockCurrentProduct = 1;
const mockPosition = 0;
const mockEndOfScroll = false;
const mockRelated = [2, 3, 8, 7];

describe('Test of App component', () => {
  let wrapper;
  let shallow;
  let render;
  let mount;

  beforeAll(() => {
    shallow = createShallow();
    render = createRender();
    mount = createMount();
  });

  it('shallow renders App state', () => {
    wrapper = shallow(<App />);
    const appInstance = wrapper.instance();
    appInstance.componentDidMount();
    expect(wrapper.state('position')).toEqual(mockPosition);
    expect(wrapper.state('endOfScroll')).toBe(mockEndOfScroll);
  });

  test('should fetch related item ids', () => {
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
});
