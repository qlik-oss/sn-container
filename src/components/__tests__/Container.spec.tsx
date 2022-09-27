/**
 * @jest-environment jsdom
 */

import React from 'react';
import Container from '../Container';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import layoutService from '../../mocks/layout-service';
import layout from '../../mocks/layout';

Enzyme.configure({ adapter: new Adapter() });

describe('<Container>', () => {
  let containerModel;
  let renderMock;
  let wrapper;
  beforeEach(() => {
    renderMock = jest.fn();
    containerModel = {
      layoutService,
      app: { getObject: () => Promise.resolve({}) },
      embed: { render: renderMock },
      options: {},
    };
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the component without children correctly', () => {
    wrapper = shallow(<Container containerModel={containerModel} />);
    expect(wrapper.find('#simple-tabpanel-0')).toHaveLength(0);
  });

  it('renders the component with a child correctly', () => {
    containerModel.layoutService.getLayout = () => layout.containerWithChild;
    wrapper = shallow(<Container containerModel={containerModel} />);
    expect(wrapper.find(`#container-tab-${layout.containerWithChild.children[0].refId}`)).toHaveLength(1);
  });

  it('renders the component with many children correctly', () => {
    containerModel.layoutService.getLayout = () => layout.containerWithChildren;
    wrapper = shallow(<Container containerModel={containerModel} />);
    expect(wrapper.find(`#container-tab-${layout.containerWithChildren.children[0].refId}`)).toHaveLength(1);
    expect(wrapper.find(`#container-tab-${layout.containerWithChildren.children[1].refId}`)).toHaveLength(1);
  });
});
