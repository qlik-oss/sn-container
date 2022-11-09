/**
 * @jest-environment jsdom
 */

import * as nebula from '@nebula.js/stardust';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import * as useViewState from '../use-view-state';

import useCore from '../use-core';

Enzyme.configure({ adapter: new Adapter() });

describe('use-core', () => {
  let core: { element: HTMLElement };
  let setCore: Function;
  const Component = () => {
    useCore();
    return <div />;
  };

  beforeEach(() => {
    jest.spyOn(nebula, 'useState').mockReturnValue([core, setCore]);
    jest.spyOn(nebula, 'useEffect').mockImplementation(React.useEffect);
    jest.spyOn(nebula, 'useElement').mockReturnValue({});
    jest.spyOn(useViewState, 'default').mockReturnValue('some-view-state');
    setCore = jest.fn();
    mount(<Component />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger the useEffect', () => {
    expect(setCore).toHaveBeenCalled();
  });
});
