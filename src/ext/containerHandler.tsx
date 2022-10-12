import React from 'react';
import ReactDOM from 'react-dom';
import Visualizations from '../utils/visualizations';
import AddChartWrapper from '../components/ext/AddChartWrapper';

function removeObject(model: PropertyModel, childId: string) {
  const qChild = model.layout.qChildList.qItems.filter((c: QChild) => c.qInfo.qId === childId);
  const refId = qChild.length > 0 ? qChild[0].qData.qExtendsId || qChild[0].qData.containerChildId : '';
  model.properties.children = model.properties.children.filter(
    (child) => child.cId !== childId && child.refId !== refId
  );
  model.setProperties(model.properties);
  model.destroyChild(childId);
}

function getMasterObjects(layout: Layout) {
  return layout.children ? layout.children.filter((c) => c.isMaster).map((c) => c.refId) : [];
}

function forbiddenVisualization(visualization: any) {
  const forbiddenVisualizations = [
    'container',
    'qlik-show-hide-container',
    'qlik-tabbed-container',
    'qlik-trellis-container',
  ];
  return forbiddenVisualizations.indexOf(visualization) > -1;
}

function getAvailableCharts(mo: MasterObject[], model: PropertyModel, translator: TranslatorType) {
  const layoutMasterObjects = getMasterObjects(model.layout);
  const chartValues = Visualizations.getRegisteredNames().map((visualization: any) => {
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
        (mo: any) => !forbiddenVisualization(mo.qData.visualization) && layoutMasterObjects.indexOf(mo.qInfo.qId) < 0
      )
      .map((mo: any) => {
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
      .filter((item: any) => {
        const flag = item.visible && item.isLibraryItem && !forbiddenVisualization(item.visualization);
        return flag && !item.isThirdParty;
      })
      .sort((i1, i2) => (i1.name > i2.name ? 1 : -1)),
  };
  const customObjects = {
    translation: translator.get('Common.CustomObjects'),
    values: chartValues
      .filter((item: any) => {
        const flag = item.visible && item.isLibraryItem && !forbiddenVisualization(item.visualization);
        return flag && item.isThirdParty;
      })
      .sort((i1, i2) => (i1.name > i2.name ? 1 : -1)),
  };

  return [masterObjects, charts, customObjects];
}

function showAddItemDialog(model: PropertyModel, target: HTMLElement | null, translator: TranslatorType) {
  model.app.getMasterObjectList().then((mo) => {
    const items = getAvailableCharts(mo, model, translator);
    ReactDOM.render(
      <AddChartWrapper
        target={target}
        items={items}
        onSelect={(event, item) => {
          if (item.qExtendsId) {
            console.log('adding item to container');
            // addItemToContainer(
            //   model,
            //   {
            //     qExtendsId: item.qExtendsId,
            //     visualization: item.visualization,
            //   },
            //   item.name
            // );
          } else {
            console.log('adding visualization to container');
            // createVisualization(
            //   {
            //     id: item.visualization,
            //     name: item.name,
            //   },
            //   model
            // );
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
    addChild(model: PropertyModel, target: any) {
      showAddItemDialog(model, target, translator);
    },
    editProps(refId: any, model: PropertyModel) {
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
    editMasterProps(_id: any, _handler: PropertyHandler) {
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
