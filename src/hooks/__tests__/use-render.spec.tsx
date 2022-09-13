/**
 * @jest-environment jsdom
 */

import * as nebula from '@nebula.js/stardust';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import useRender from '../use-render';

Enzyme.configure({ adapter: new Adapter() });

describe('use-render', () => {
  jest.spyOn(nebula, 'useEffect').mockImplementation(React.useEffect);
  const element = document.createElement('div');
  const core: any = { element };
  const Component = () => {
    useRender({ core });
    return <div />;
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger useEffect', () => {
    mount(<Component />);
    expect(element.querySelector('.container-root')).toBeDefined();
  });
});
