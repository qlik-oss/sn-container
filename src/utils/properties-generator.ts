import Visualizations from './visualizations';

export default {
  createProperties,
};

function getChartType(type: string) {
  return Visualizations.getType(type);
}

function getExtensionType(type: string) {
  return getChartType(type)?.getExtensionType();
}

function getInitialProperties(type: string) {
  return getChartType(type)?.getInitialProperties();
}

async function createProperties(app: App, type: string) {
  console.log('vizualizations===', Visualizations.getTypes());
  console.log('type===', type);
  const newExtension = await getExtensionType(type);
  const initialProperties = await getInitialProperties(type);
  newExtension.mapProperties();
  const hyperCubeHandler = newExtension.getCreatePropertyHandler.call(newExtension, app);
  hyperCubeHandler.setProperties(initialProperties);
  return initialProperties;
}
