import layout from './layout';

const layoutService = {
  getDataPages: () => layout.container.qHyperCube.qDataPages,
  getLayout: () => layout.container,
};

export default layoutService;
