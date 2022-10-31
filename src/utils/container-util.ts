type PropertyName = 'activeTab' | 'defaultTab';

function forbiddenVisualization(visualization: string) {
  const forbiddenVisualizations = [
    'container',
    'qlik-show-hide-container',
    'qlik-tabbed-container',
    'qlik-trellis-container',
  ];
  // ToDo get product info from environment
  // if (ProductInfo.isQCS()) {
  //   forbiddenVisualizations.push('qlik-on-demand-reporting');
  // }
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

function getTranslationFromChild(
  chartObject: MergedLayoutChild,
  translator: TranslatorType,
  visualizations?: Visualizations
) {
  let translation = '';
  if (chartObject?.label === '' && visualizations?.getType) {
    const libInfo = visualizations.getType(chartObject.qData.visualization).getLibraryInfo();
    translation = libInfo.translationKey ? translator.get(libInfo.translationKey) : libInfo.name;
  } else {
    translation = chartObject.label;
  }
  return translation;
}

function onChildChange(model: Model, child: MergedLayoutChild | undefined, visualizationApi: VisualizationApi) {
  const { changePropertyPanel } = visualizationApi;
  if (child && changePropertyPanel) {
    model.app.getObject(child.qInfo.qId).then((childObject) => {
      console.log('childObject===', childObject);
      if (!childObject.layout.qExtendsId) {
        changePropertyPanel(childObject, model);
      }
    });
  }
}

function evaluateCondition(condition: string | undefined) {
  if (!condition) {
    return true;
  }
  // case condition is commented
  if (condition && condition.length >= 2 && condition[0] === '/' && condition[1] === '/') {
    return true;
  }
  // convert to numeric with -1 (true) as the default
  const condVal = condition ? +condition : -1;
  // handle the string 'true' as true and all other strings as false
  if (Number.isNaN(+condVal)) {
    return condition.toLowerCase() === 'true';
  }
  return condVal !== 0;
}

export default {
  forbiddenVisualization,
  applySoftPatches,
  getTranslationFromChild,
  onChildChange,
  evaluateCondition,
};