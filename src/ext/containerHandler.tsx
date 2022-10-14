import React from 'react';
import ReactDOM from 'react-dom';
import Visualizations from '../utils/visualizations';
import AddChartWrapper from '../components/ext/AddChartWrapper';
import Util from '../utils/util';
import containerUtil from '../utils/container-util';
import propertiesGenerator from '../utils/properties-generator';

type TODO = any;

function removeObject(model: PropertyModel, childId: string) {
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

function getAvailableCharts(mo: MasterObject[], model: PropertyModel, translator: TranslatorType) {
  const layoutMasterObjects = getMasterObjects(model.layout);
  const chartValues = Visualizations.getRegisteredNames().map((visualization: string) => {
    const libInfo = Visualizations.getType(visualization).getLibraryInfo();
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
        const icon = Visualizations.getIconName(mo.qData.visualization);
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

function addItemToContainer(model: PropertyModel, childProps: TODO, childName: string) {
  if (containerUtil.forbiddenVisualization(childProps.visualization)) {
    return undefined;
  }
  childProps.qInfo = { ...childProps.qInfo, qType: childProps.visualization || childProps.qInfo.qType };
  if (!childProps.qExtendsId) {
    childProps.containerChildId = Util.generateId();
  }
  return model.app.getUndoInfoObject().then((undoInfo) =>
    undoInfo.startGroup().then((groupId: string) =>
      model.createChild(childProps).then((reply) =>
        model.getProperties().then((containerProps) => {
          containerProps.children.push({
            refId: childProps.qExtendsId || childProps.containerChildId,
            label: childName,
            isMaster: !!childProps.qExtendsId,
          });
          // TODO: Update the activeTab soft property
          // model.items.activeTab = reply.id;
          // containerUtil.applySoftPatches(model.layout, model, 'activeTab');
          return model.setProperties(containerProps).then(() => {
            undoInfo.endGroup(groupId);
          });
        })
      )
    )
  );
}

function createVisualization(model: PropertyModel, childProps: TODO) {
  return propertiesGenerator
    .createProperties(model.app.enigmaModel, childProps.visualization)
    .then((props) => addItemToContainer(model, props, childProps.name));
}

function showAddItemDialog(model: PropertyModel, target: HTMLElement | null, translator: TranslatorType) {
  model.app.getMasterObjectList().then((mo) => {
    const items = getAvailableCharts(mo, model, translator);
    ReactDOM.render(
      <AddChartWrapper
        target={target}
        items={items}
        onSelect={(_event, item) => {
          if (item.qExtendsId) {
            console.log('adding item to container, item===', item);
            addItemToContainer(model, item, item.name);
          } else {
            console.log('adding visualization to container item====', item);
            createVisualization(model, item);
          }
        }}
      />,
      target
    );
  });
}

const ContainerHandler = ({ translator }: EnvironmentType) => {
  // const appMasterObjects: string[] = [];
  // app.getMasterObjectList().then((masterObjects) => {
  //   masterObjects.forEach((mo) => {
  //     appMasterObjects.push(mo.qInfo.qId);
  //   });
  // });

  return {
    removeChild(model: PropertyModel, id: string) {
      removeObject(model, id);
    },
    addChild(model: PropertyModel, target: HTMLElement) {
      showAddItemDialog(model, target, translator);
    },
    editProps(refId: string, model: PropertyModel) {
      model.showPP = true;
      model.items.switchTo(refId);
    },
    isValidMaster(_refId: string, _app: App) {
      return true;
      // return appMasterObjects.indexOf(refId) > -1;
    },
    isAppPublished(app: App) {
      return app.properties.published;
    },
    editMasterProps(_id: string, _handler: PropertyHandler) {
      // Todo: Find how to edit the master items
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
