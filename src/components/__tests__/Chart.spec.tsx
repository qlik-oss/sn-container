/**
 * @jest-environment jsdom
 */

import React from 'react';
import Chart from '../Chart';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import layoutService from '../../mocks/layout-service';

Enzyme.configure({ adapter: new Adapter() });

describe('<Chart>', () => {
  let containerModel;
  let chart;
  let renderMock;
  beforeEach(() => {
    renderMock = jest.fn();
    containerModel = {
      layoutService,
      app: { getObject: () => Promise.resolve({}) },
      embed: { render: renderMock },
      options: {},
    };
    chart = {
      qInfo: {
        qId: 'chartId',
      },
    };
    mount(<Chart containerModel={containerModel} chart={chart} />);
  });

  it('renders the component correctly', () => {
    expect(renderMock).toHaveBeenCalledTimes(1);
  });
});
