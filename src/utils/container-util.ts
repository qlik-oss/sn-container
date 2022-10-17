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
function applySoftPatches(model: Model, newValue: string | number, propertyName: PropertyName) {
  const { layout } = model;
  // applyPatches when the model has implemented the applyPatches function
  if (model.applyPatches) {
    const op = layout[propertyName] !== undefined ? 'replace' : 'add';
    const patches = [
      {
        // this is the path where the property is located
        qPath: `/${propertyName}`,
        qOp: op.toString(),
        qValue: JSON.stringify(newValue),
      },
    ];
    model.applyPatches(patches, true);
  }
}

function getTranslationFromChild(chartObject: MergedLayoutChild, translator: TranslatorType) {
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
