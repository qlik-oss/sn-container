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
  target: Element | null,
  translator: TranslatorType,
  visualizationApi: VisualizationApi | undefined
) {
  if (visualizationApi?.visualizations) {
    const key = Util.generateId();
    containerUtil.getAvailableCharts(model, visualizationApi.visualizations, translator).then((items) => {
      ReactDOM.render(
        <AddChartWrapper
          target={target}
          items={items}
          key={key}
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
    });
  }
}

const ContainerHandler = (translator: TranslatorType, visualizationApi: VisualizationApi | undefined) => {
  // ToDo find a way to load appMasterObjects before the show()
  const appMasterObjects: string[] = [];

  return {
    removeChild(model: Model, id: string) {
      removeObject(model, id);
    },
    addChild(model: Model, target: Element | null) {
      showAddItemDialog(model, target, translator, visualizationApi);
    },
    editProps(model: Model, refId: string) {
      const newChild = getMergedChild(model.layout, refId);
      if (newChild && newChild.qInfo?.qId && visualizationApi?.visualizations) {
        console.log('newChild.qInfo===', newChild.qInfo);
        containerUtil.applySoftPatches(model, newChild.qInfo.qId, 'activeTab');
        containerUtil.onChildChange(model, newChild, visualizationApi);
      }
    },
    isValidMaster(refId: string, app: App) {
      app.getMasterObjectList().then((masterObjects) => {
        masterObjects.forEach((mo) => {
          appMasterObjects.push(mo.qInfo.qId);
        });
      });
      return appMasterObjects.indexOf(refId) > -1;
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
