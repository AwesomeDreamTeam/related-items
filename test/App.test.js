import React from 'react';
import App from '../client/src/components/App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

test(`Should contain the title 'Related Items'`, () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('#related-items').text()).toBe('Related Items');
});