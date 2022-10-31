import React from 'react';
import ReactDOM from 'react-dom';
import AddChartWrapper from '../components/ext/AddChartWrapper';
import Util from '../utils/util';
import containerUtil from '../utils/container-util';
import propertiesGenerator from '../utils/properties-generator';
import { getMergedChild } from '../utils/container-items';

type TODO = any;

function removeObject(model: Model, childId: string) {
  const qChild = model.layout.qChildList.qItems.filter((c: QChild) => c.qInfo.qId === childId);
  const refId = qChild.length > 0 ? qChild[0].qData.qExtendsId || qChild[0].qData.containerChildId : '';
  model.properties.children = model.properties.children.filter(
    (child) => child.cId !== childId && child.refId !== refId
  );
  model.setProperties(model.properties).then(async () => model.destroyChild(childId));
}

function getMasterObjects(layout: Layout) {
  return layout.children ? layout.children.filter((c) => c.isMaster).map((c) => c.refId) : [];
}

function getAvailableCharts(
  mo: MasterObject[],
  model: Model,
  translator: TranslatorType,
  visualizations: Visualizations
) {
  const layoutMasterObjects = getMasterObjects(model.layout);
  const chartValues = visualizations.getRegisteredNames().map((visualization: string) => {
    const libInfo = visualizations.getType(visualization).getLibraryInfo();
    return {
      name: libInfo.translationKey ? translator.get(libInfo.translationKey) : libInfo.name,
      visualization,
      icon: libInfo.icon ? `lui-icon--${libInfo.icon}` : undefined,
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
          !containerUtil.forbiddenVisualization(masterObject.qData.visualization) &&
          layoutMasterObjects.indexOf(masterObject.qInfo.qId) < 0
      )
      .map((masterObject) => {
        return {
          qExtendsId: masterObject.qInfo.qId,
          visualization: masterObject.qData.visualization,
          name: masterObject.qData.name,
        };
      }),
  };
  const charts = {
    translation: translator.get('Common.Charts'),
    values: chartValues
      .filter((item) => {
        const flag = item.visible && item.isLibraryItem && !containerUtil.forbiddenVisualization(item.visualization);
        return flag && !item.isThirdParty;
      })
      .sort((i1, i2) => (i1.name > i2.name ? 1 : -1)),
  };
  const customObjects = {
    translation: translator.get('Common.CustomObjects'),
    values: chartValues
      .filter((item) => {
        const flag = item.visible && item.isLibraryItem && !containerUtil.forbiddenVisualization(item.visualization);
        return flag && item.isThirdParty;
      })
      .sort((i1, i2) => (i1.name > i2.name ? 1 : -1)),
  };
  return [masterObjects, charts, customObjects];
}

async function addItemToContainer(model: Model, childProps: TODO, childName: string) {
  if (containerUtil.forbiddenVisualization(childProps.visualization)) {
    return undefined;
  }
  childProps.qInfo = { ...childProps.qInfo, qType: childProps.visualization || childProps.qInfo.qType };
  if (!childProps.qExtendsId) {
    childProps.containerChildId = Util.generateId();
  }
  const undoInfo = await model.app.getUndoInfoObject();
  const groupId: string = await undoInfo.startGroup();
  const reply = await model.createChild(childProps);
  const containerProps = await model.getProperties();
  containerProps.children.push({
    refId: childProps.qExtendsId || childProps.containerChildId,
    label: childName,
    isMaster: !!childProps.qExtendsId,
  });
  containerUtil.applySoftPatches(model, reply.id, 'activeTab');
  await model.setProperties(containerProps);
  return undoInfo.endGroup(groupId);
}

async function createVisualization(model: Model, childProps: TODO, visualizations: Visualizations | undefined) {
  const props = await propertiesGenerator.createProperties(
    model.app.enigmaModel,
    childProps.visualization,
    visualizations
  );
  return addItemToContainer(model, props, childProps.name);
}

function showAddItemDialog(
  model: Model,
  target: HTMLElement | null,
  translator: TranslatorType,
  visualizationApi: VisualizationApi | undefined
) {
  model.app.getMasterObjectList().then((mo) => {
    if (visualizationApi?.visualizations) {
      const items = getAvailableCharts(mo, model, translator, visualizationApi.visualizations);
      ReactDOM.render(
        <AddChartWrapper
          target={target}
          items={items}
          onSelect={(_event, item) => {
            if (item.qExtendsId) {
              addItemToContainer(model, item, item.name);
            } else {
              createVisualization(model, item, visualizationApi.visualizations);
            }
          }}
        />,
        target
      );
    }
  });
}

const ContainerHandler = (translator: TranslatorType, visualizationApi: VisualizationApi | undefined) => {
  // ToDo find a way to load appMasterObjects before the show()
  // const appMasterObjects: string[] = [];
  // app.getMasterObjectList().then((masterObjects) => {
  //   masterObjects.forEach((mo) => {
  //     appMasterObjects.push(mo.qInfo.qId);
  //   });
  // });

  return {
    removeChild(model: Model, id: string) {
      removeObject(model, id);
    },
    addChild(model: Model, target: HTMLElement) {
      showAddItemDialog(model, target, translator, visualizationApi);
    },
    editProps(model: Model, refId: string) {
      const newChild = getMergedChild(model.layout, refId);
      if (newChild && newChild.qInfo?.qId && visualizationApi?.visualizations) {
        containerUtil.applySoftPatches(model, newChild.qInfo.qId, 'activeTab');
        containerUtil.onChildChange(model, newChild, visualizationApi);
      }
    },
    isValidMaster(_refId: string, _app: App) {
      return true;
      // ToDo find a way to load appMasterObjects before the show()
      // return appMasterObjects.indexOf(refId) > -1;
    },
    isAppPublished(app: App) {
      return app.properties.published;
    },
    editMasterProps(_id: string, _handler: PropertyHandler) {
      // Todo: Find how to edit the master items
      // Todo 2: open the angular warning message before editing master visualization
      // const qChild = handler.layout.qChildList.qItems.filter((c: QChild) => c.qData.qExtendsId === id);
      // const type = qChild.length > 0 ? qChild[0].qData.visualization : '';
      // GridService.editMaster(id, type);
    },
    getDimensions() {
      return [];
    },
    getMeasures() {
      return [];
    },
  };
};

export default ContainerHandler;