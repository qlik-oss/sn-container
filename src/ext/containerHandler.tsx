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
  model.setProperties(model.properties).then(() => model.destroyChild(childId));
}

function getMasterObjects(layout: Layout) {
  return layout.children ? layout.children.filter((c) => c.isMaster).map((c) => c.refId) : [];
}

function getAvailableCharts(mo: MasterObject[], model: Model, { translator, sense }: EnvironmentType) {
  const { visualizations } = sense;
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
  const masterObjects = {
    translation: translator.get('Object.Container.MasterItems'),
    values: mo
      .filter(
        (mo) =>
          !containerUtil.forbiddenVisualization(mo.qData.visualization) && layoutMasterObjects.indexOf(mo.qInfo.qId) < 0
      )
      .map((mo) => {
        const icon = visualizations.getIconName(mo.qData.visualization);
        return {
          qExtendsId: mo.qInfo.qId,
          visualization: mo.qData.visualization,
          name: mo.qData.name,
          icon: icon ? `lui-icon--${icon}` : undefined,
        };
      })
      .sort((i1, i2) => (i1.name > i2.name ? 1 : -1)),
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

async function createVisualization(model: Model, childProps: TODO, visualizations: Visualizations) {
  const props = await propertiesGenerator.createProperties(
    model.app.enigmaModel,
    childProps.visualization,
    visualizations
  );
  return addItemToContainer(model, props, childProps.name);
}

function showAddItemDialog(model: Model, target: HTMLElement | null, env: EnvironmentType) {
  model.app.getMasterObjectList().then((mo) => {
    const items = getAvailableCharts(mo, model, env);
    ReactDOM.render(
      <AddChartWrapper
        target={target}
        items={items}
        onSelect={(_event, item) => {
          if (item.qExtendsId) {
            addItemToContainer(model, item, item.name);
          } else {
            createVisualization(model, item, env.sense.visualizations);
          }
        }}
      />,
      target
    );
  });
}

const ContainerHandler = (env: EnvironmentType) => {
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
      showAddItemDialog(model, target, env);
    },
    editProps(model: Model, refId: string) {
      const newChild = getMergedChild(model.layout, refId);
      console.log('newchild===', newChild);
      if (newChild && newChild.qInfo?.qId) {
        containerUtil.applySoftPatches(model, newChild.qInfo.qId, 'activeTab');
        containerUtil.onChildChange(true, model, newChild);
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
