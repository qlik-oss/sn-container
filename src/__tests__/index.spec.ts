import env from '../mocks/environment';
import supernova from '..';
import qae from '../qae';
import ext from '../ext/ext';
import locale from '../locale';
import { useRender, useCore } from '../hooks';

jest.mock('../qae', () => jest.fn());
jest.mock('../ext/ext', () => jest.fn());
jest.mock('../locale', () => jest.fn());
jest.mock('../hooks', () => ({
  useCore: jest.fn(),
  useRender: jest.fn(),
}));

describe('container supernova', () => {
  beforeEach(() => {
    jest.mock('@nebula.js/stardust', () => jest.fn());
    const container = supernova(env);
    container.component();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call qae', () => {
    expect(qae).toHaveBeenCalledTimes(1);
  });

  it('should call ext', () => {
    expect(ext).toHaveBeenCalledTimes(1);
  });

  it('should call locale', () => {
    expect(locale).toHaveBeenCalledTimes(1);
  });

  it('should call all hooks', () => {
    expect(useCore).toHaveBeenCalledTimes(1);
    expect(useRender).toHaveBeenCalledTimes(1);
  });
});
