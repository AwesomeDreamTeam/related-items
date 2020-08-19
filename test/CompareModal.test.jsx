import React from 'react';
import axios from 'axios';

import { createShallow, createMount, createRender } from '@material-ui/core/test-utils';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactTestUtils from 'react-dom/test-utils';
import App from '../client/src/components/App';
import CompareModal from '../client/src/components/CompareModal';
import IconButton from '@material-ui/core/IconButton';

configure({ adapter: new Adapter() });

const mockProps = {
  comparedProductName: "Bright Future Sunglasses",
  comparedProductCategory: "Accessories",
  currentProductInfo: {
    name: "Camo Onesie",
    features: [{ feature: "Buttons", value: "Brass" }]
  },
  comparedProductFeatures: [{ feature: "Lenses", value: "Ultrasheen" },
  { feature: "UV Protection", value: "null" },
  { feature: "Frames", value: "LightCompose" }],
};

describe('Testing CompareModal component', () => {
  let wrapper;

  it('should render icon button', () => {
    wrapper = mount(<CompareModal {...mockProps} />);
    expect(wrapper.find(IconButton)).toHaveLength(1);
  });
});