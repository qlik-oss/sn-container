import Vizualisations from './visualizations';

type PropertyName = 'activeTab' | 'defaultTab';

function forbiddenVisualization(visualization: string) {
  const forbiddenVisualizations = [
    'container',
    'qlik-show-hide-container',
    'qlik-tabbed-container',
    'qlik-trellis-container',
  ];
  return forbiddenVisualizations.indexOf(visualization) > -1;
}

// apply soft patches
function applySoftPatches(layout: Layout, model: PropertyModel, propertyName: PropertyName) {
  const modelItems = model.items;
  // applyPatches when the model has implemented the applyPatches function
  if (canApplySoftPatches(modelItems, propertyName, model)) {
    const op = layout[propertyName] !== undefined ? 'replace' : 'add';
    const patches = [
      {
        // this is the path where the property is located
        qPath: getQPath(propertyName),
        qOp: op.toString(),
        qValue: JSON.stringify(modelItems[propertyName]),
      },
    ];
    model.applyPatches(patches, true);
  }
}

function canApplySoftPatches(modelItems: any, propertyName: PropertyName, model: PropertyModel) {
  return modelItems[propertyName] && model.applyPatches;
}

function getQPath(propertyName: PropertyName) {
  return propertyName === 'activeTab' ? '/activeTab' : '/defaultTab';
}

function getTranslationFromChild(chartObject: ChartObject, translator: TranslatorType) {
  let translation = '';
  if (chartObject?.label === '') {
    const libInfo = Vizualisations.getType(chartObject.qData.visualization).getLibraryInfo();
    translation = libInfo.translationKey ? translator.get(libInfo.translationKey) : libInfo.name;
  } else {
    translation = chartObject.label;
  }
  return translation;
}

export default {
  forbiddenVisualization,
  applySoftPatches,
  getTranslationFromChild,
};
