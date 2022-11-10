import layoutMock from './layout';

const model = {
  createChild: jest.fn(async () => Promise.resolve('childId')),
  getPropertie: jest.fn(async () => Promise.resolve({} as any)),
  getLayout: jest.fn(async () => Promise.resolve({} as any)),
  id: jest.fn(),
  layout: layoutMock,
  properties: {},
  handler: undefined,
  setProperties: jest.fn(),
  destroyChild: jest.fn(),
  showPP: true,
  app: undefined,
  applyPatches: jest.fn(async () => Promise.resolve()),
};

export default model;
