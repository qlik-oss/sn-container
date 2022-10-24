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

function createSelectedObject(model: Model, childObject: GenericObject, visualizations: Visualizations) {
  const { app } = model;
  const selObj = {
    id: childObject.id,
    async getAllPropertyPanelContent() {
      const childModel = childObject.enigmaModel;
      return new Promise(async () => {
        const appLayout = await app.getLayout();
        const properties = await childModel.getProperties();
        const layout = await childModel.getLayout();
        console.log('layout==', layout);
        console.log('appLayout==', appLayout);
        console.log('properties==', properties);
        const visType = visualizations.getType(layout.visualization);
        console.log('visType==', visType);
        await visType.load();
        const ext = await visType.getExtensionType();
        console.log('ext===', ext);
        ext.mapProperties();
        if (!ext.model) {
          ext.model = model; // SUI-6568
        }
        const ppContent = {
          // definition: propertyMapper.mapDefinition(ext.definition),
          definition: ext.definition,
          globalChangeListeners: undefined,
          type: layout.visualization,
          ext,
          handler: ext.getCreatePropertyHandler.call(ext, childModel),
          iconName: visType.getIconName(),
          titleRef: 'title',
          headerLabel: 'Back',
          headerAction() {},
          properties: properties,
          layout: layout,
          localeInfo: appLayout.qLocaleInfo,
          app,
          model,
        };
        console.log('ppContent===', ppContent);
        return ppContent;
      });
    },
  };
  return selObj;
}

// function createSelectedObject(model: Model, childObject: GenericObject, child: MergedLayoutChild, visualizations: Visualizations) {
//   const { app } = model;
//   const chartId = child.qInfo.qId;
//   const selObj = {
//     id: chartId,
//     type: 'gridCell',
//     customObject: childObject,
//     remove() {
//       app.getUndoInfoObject().then(async (undoInfo) => {
//         undoInfo.startGroup().then((groupId: string) => {
//           model.getProperties().then((props) => {
//             const refId = child.qData.qExtendsId || child.qData.containerChildId || '';
//             props.children = props.children.filter((propChild) => propChild.cId !== refId && propChild.refId !== refId);
//             model.setProperties(props);
//             undoInfo.endGroup(groupId);
//           });
//         });
//       });
//     },
//     async getAllPropertyPanelContent() {
//       const childModel = childObject.enigmaModel;
//       return new Promise(async () => {
//         const appLayout = await app.getLayout();
//         const properties = await childModel.getProperties();
//         const layout = await childModel.getLayout();
//         console.log('layout==', layout);
//         console.log('appLayout==', appLayout);
//         console.log('properties==', properties);
//         const visType = visualizations.getType(layout.visualization);
//         console.log('visType==', visType);
//         await visType.load();
//         const ext = await visType.getExtensionType();
//         console.log('ext===', ext);
//         ext.mapProperties();
//         if (!ext.model) {
//           ext.model = model; // SUI-6568
//         }
//         const cellTab = model.layout.children.filter(
//           (c) => c.refId === child.qData.containerChildId || c.refId === child.qData.qExtendsId
//         );
//         const ppContent = {
//           // definition: propertyMapper.mapDefinition(ext.definition),
//           definition: ext.definition,
//           globalChangeListeners: undefined,
//           type: layout.visualization,
//           ext,
//           handler: ext.getCreatePropertyHandler.call(ext, app),
//           iconName: visType.getIconName(),
//           titleRef: 'title',
//           headerLabel: cellTab.length > 0 ? cellTab[0].label : 'Back',
//           headerAction() {},
//           properties: properties,
//           layout: layout,
//           localeInfo: appLayout.qLocaleInfo,
//           app,
//           model,
//         };
//         console.log('ppContent===', ppContent);
//         return ppContent;
//       });
//     },
//   };
//   return selObj;
// }

function onChildChange(model: Model, child: MergedLayoutChild | undefined, visualizationApi: VisualizationApi) {
  const { stageState, visualizations } = visualizationApi;
  if (child && stageState) {
    model.app.getObject(child.qInfo.qId).then((childObject) => {
      console.log('childObject===', childObject);
      if (!childObject.layout.qExtendsId) {
        if (stageState.propertiesOpen) {
          stageState.setSelectedObject(createSelectedObject(model, childObject, visualizations));
          stageState.propertiesOpen = true;
        }
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
