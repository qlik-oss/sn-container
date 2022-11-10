import Util from './util';

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

function onChildEdit(model: Model, child: MergedLayoutChild | undefined, visualizationApi: VisualizationApi) {
  const { changePropertyPanel } = visualizationApi;
  if (child && changePropertyPanel) {
    model.app.getObject(child.qInfo.qId).then((childObject) => {
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
  if (condition.length >= 2 && condition[0] === '/' && condition[1] === '/') {
    return true;
  }
  // convert to numeric with -1 (true) as the default
  const condVal = +condition;
  // handle the string 'true' as true and all other strings as false
  if (Number.isNaN(+condVal)) {
    return condition.toLowerCase() === 'true';
  }
  return condVal !== 0;
}

function getMasterObjects(layout: Layout) {
  return layout.children ? layout.children.filter((c) => c.isMaster).map((c) => c.refId) : [];
}

async function getAvailableCharts(model: Model, visualizations: Visualizations, translator: TranslatorType) {
  const mo = await model.app.getMasterObjectList();
  const layoutMasterObjects = getMasterObjects(model.layout);
  const chartValues = visualizations.getRegisteredNames().map((visualization: string) => {
    const libInfo = visualizations.getType(visualization).getLibraryInfo();
    return {
      name: libInfo.translationKey ? translator.get(libInfo.translationKey) : libInfo.name,
      visualization,
      visible: libInfo.visible,
      isLibraryItem: libInfo.isLibraryItem,
      isThirdParty: libInfo.isThirdParty,
    };
  });

  const moSorted = Util.localeOrderBy(translator, mo, (t: MasterObject) => t.qData.name);
  const masterObjects = {
    translation: translator.get('Object.Container.MasterItems'),
    values: moSorted
      .filter(
        (masterObject) =>
          !forbiddenVisualization(masterObject.qData.visualization) &&
          layoutMasterObjects.indexOf(masterObject.qInfo.qId) < 0
      )
      .map((masterObject) => {
        return {
          name: masterObject.qData.name,
          visualization: masterObject.qData.visualization,
          qExtendsId: masterObject.qInfo.qId,
        };
      }),
  };
  const charts = {
    translation: translator.get('Common.Charts'),
    values: chartValues
      .filter((item) => {
        const flag = item.visible && item.isLibraryItem && !forbiddenVisualization(item.visualization);
        return flag && !item.isThirdParty;
      })
      .sort((i1, i2) => (i1.name > i2.name ? 1 : -1)),
  };
  const customObjects = {
    translation: translator.get('Common.CustomObjects'),
    values: chartValues
      .filter((item) => {
        const flag = item.visible && item.isLibraryItem && !forbiddenVisualization(item.visualization);
        return flag && item.isThirdParty;
      })
      .sort((i1, i2) => (i1.name > i2.name ? 1 : -1)),
  };
  return [masterObjects, charts, customObjects];
}

export default {
  getAvailableCharts,
  forbiddenVisualization,
  applySoftPatches,
  getTranslationFromChild,
  onChildEdit,
  evaluateCondition,
};
