export default {
  createProperties,
};

function getChartType(type: string, visualizations: Visualizations) {
  return visualizations.getType(type);
}

async function getExtensionType(type: string, visualizations: Visualizations) {
  return getChartType(type, visualizations)?.getExtensionType();
}

async function getInitialProperties(type: string, visualizations: Visualizations) {
  return getChartType(type, visualizations)?.getInitialProperties();
}

async function createProperties(enigmaModel: Model, type: string, visualizations: Visualizations | undefined) {
  if (!visualizations) return undefined;
  const newExtension = await getExtensionType(type, visualizations);
  const initialProperties = await getInitialProperties(type, visualizations);
  newExtension.mapProperties();
  const hyperCubeHandler = newExtension.getCreatePropertyHandler.call(newExtension, enigmaModel);
  hyperCubeHandler.setProperties(initialProperties);
  return initialProperties;
}
