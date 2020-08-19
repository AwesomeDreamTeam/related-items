import React from 'react';
import axios from 'axios';

import { createShallow, createMount, createRender } from '@material-ui/core/test-utils';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactTestUtils from 'react-dom/test-utils';
import App from '../client/src/components/App';
import StarRating from '../client/src/components/StarRating';
import Rating from '@material-ui/lab/Rating';

configure({ adapter: new Adapter() });

const mockRating = { 1: 1, 2: 3, 3: 11, 4: 12, 5: 8 };

describe('Testing StarRating component', () => {
  let wrapper;

  it('should render a rating component if there is a rating', () => {
    wrapper = mount(<StarRating rating={mockRating} />);
    expect(wrapper.find(Rating)).toHaveLength(1);
  });
});
