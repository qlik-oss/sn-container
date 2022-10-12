/**
 * @jest-environment jsdom
 */

import React from 'react';
import TabPanel from '../TabPanel';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('<TabPanel>', () => {
  it('renders the component correctly', () => {
    const wrapper = shallow(
      <TabPanel activeTab={0} value={0}>
        <div id="childElementId" />
      </TabPanel>
    );
    expect(wrapper.find('#simple-tabpanel-0')).toHaveLength(1);
    expect(wrapper.find('#childElementId')).toHaveLength(1);
  });
});
