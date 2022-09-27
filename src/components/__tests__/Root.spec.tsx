/**
 * @jest-environment jsdom
 */

import React from 'react';
import Root from '../Root';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import layoutService from '../../mocks/layout-service';

Enzyme.configure({ adapter: new Adapter() });

describe('<Root>', () => {
  let models;
  let wrapper;
  beforeEach(() => {
    models = { containerModel: { layoutService } };
    wrapper = shallow(<Root models={models} />);
  });

  it('renders the component correctly', () => {
    expect(wrapper.find('.container-root')).toHaveLength(1);
  });
});
