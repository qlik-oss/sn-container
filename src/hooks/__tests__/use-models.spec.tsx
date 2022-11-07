/**
 * @jest-environment jsdom
 */

import * as nebula from '@nebula.js/stardust';
import * as qlikChartModules from 'qlik-chart-modules';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import useModels from '../use-models';

Enzyme.configure({ adapter: new Adapter() });

describe('use-core', () => {
  const core: any = {};
  let models;
  let setModels;
  const Component = () => {
    useModels({ core });
    return <div />;
  };

  beforeEach(() => {
    jest.spyOn(nebula, 'useEffect').mockImplementation(React.useEffect);
    setModels = jest.fn();
    jest.spyOn(nebula, 'useState').mockReturnValue([models, setModels]);
    jest.spyOn(nebula, 'useStaleLayout').mockReturnValue({});
    jest.spyOn(nebula, 'useTheme').mockReturnValue({});
    jest.spyOn(nebula, 'useEmbed').mockReturnValue({});
    jest.spyOn(nebula, 'useApp').mockReturnValue({});
    jest.spyOn(nebula, 'useOptions').mockReturnValue({});
    jest.spyOn(nebula, 'useModel').mockReturnValue({});
    jest.spyOn(nebula, 'useTranslator').mockReturnValue({});
    jest.spyOn(nebula, 'useConstraints').mockReturnValue({});
    jest.spyOn(qlikChartModules, 'themeService').mockReturnValue({});
    jest.spyOn(qlikChartModules, 'layoutService').mockReturnValue({});
    jest.mock('../../models/container-model', () => {
      return {
        default: jest.fn(),
      };
    });
    mount(<Component />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should trigger the useEffect', () => {
    expect(setModels).toHaveBeenCalled();
  });
});
