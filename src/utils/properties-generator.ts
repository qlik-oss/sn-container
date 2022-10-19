export default {
  createProperties,
};

function getChartType(type: string, visualizations: Visualizations) {
  return visualizations.getType(type);
}

function getExtensionType(type: string, visualizations: Visualizations) {
  return getChartType(type, visualizations)?.getExtensionType();
}

function getInitialProperties(type: string, visualizations: Visualizations) {
  return getChartType(type, visualizations)?.getInitialProperties();
}

async function createProperties(app: App, type: string, visualizations: Visualizations) {
  const newExtension = await getExtensionType(type, visualizations);
  const initialProperties = await getInitialProperties(type, visualizations);
  newExtension.mapProperties();
  const hyperCubeHandler = newExtension.getCreatePropertyHandler.call(newExtension, app);
  hyperCubeHandler.setProperties(initialProperties);
  return initialProperties;
}
