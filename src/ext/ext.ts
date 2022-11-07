import ContainerHandler from './containerHandler';
import containerUtil from '../utils/container-util';

function fetchContainerTabs(qItems: QChild[], children: LayoutChild[], { translator, sense }: EnvironmentType) {
  const options: DropdownOption[] = [];
  children.forEach((child, index) => {
    const item = qItems.find(
      (item) => child.refId === item.qData.containerChildId || child.refId === item.qData.qExtendsId
    );
    if (item) {
      const translation = containerUtil.getTranslationFromChild(
        { ...child, ...item, visible: undefined },
        translator,
        sense.visualizationApi?.visualizations
      );
      options[index] = { translation, value: item.qInfo.qId };
    }
  });
  return options;
}

export default function ext(env: EnvironmentType) {
  const containerHandler = ContainerHandler(env.translator, env.sense.visualizationApi);
  const data = {
    uses: 'data',
    show: false,
  };
  const content = {
    type: 'items',
    translation: 'Object.Container.Props.Content',
    items: [
      {
        translation: 'Object.Container.Props.Chart',
        component: 'text',
        show(properties: ContainerProperties) {
          return properties.children.length <= 1;
        },
      },
      {
        translation: 'Common.Charts',
        component: 'text',
        show(properties: ContainerProperties) {
          return properties.children.length > 1;
        },
      },
      {
        type: 'array',
        ref: 'children',
        itemTitleRef(properties: ContainerProperties) {
          return properties.label;
        },
        allowAdd: true,
        customAdd: true,
        allowMove: true,
        allowRemove: true,
        addTranslation: 'Object.Container.Props.Add',
        grouped: true,
        remove(item: PropertiesChild, _properties: ContainerProperties, handler: PropertyHandler, args: PropertyArgs) {
          handler.layout.qChildList.qItems.forEach((child: QChild) => {
            if (
              child.qData.containerChildId === item.refId ||
              (child.qData.qExtendsId && child.qData.qExtendsId === item.refId)
            ) {
              containerHandler.removeChild(args.model, child.qInfo.qId);
            }
          });
        },
        add(_item: PropertiesChild, properties: ContainerProperties, handler: PropertyHandler, args: any) {
          console.log('addChild child _item===', _item);
          console.log('addChild child _data===', properties);
          console.log('addChild child args===', args);
          console.log('addChild child handler===', handler);
          console.log('args.model.items==', args.model.items);
          const button = document.querySelector('.pp-toplist-add-button');
          let popoverWrapper = button?.querySelector('.add-chart-popover');
          if (!popoverWrapper) {
            popoverWrapper = document.createElement('div');
            popoverWrapper.classList.add('add-chart-popover');
            button?.appendChild(popoverWrapper);
          }
          containerHandler.addChild(args.model, popoverWrapper);
        },
        items: {
          label: {
            ref: 'label',
            type: 'string',
            translation: 'Object.Container.Props.Label',
            expression: 'optional',
            show: (item: PropertiesChild, handler: PropertyHandler) => {
              return (
                !item.isMaster ||
                (item.isMaster &&
                  containerHandler.isValidMaster(item.refId) &&
                  !containerHandler.isAppPublished(handler.app))
              );
            },
          },
          condition: {
            ref: 'condition',
            translation: 'Object.Container.Props.ShowCondition',
            type: 'string',
            defaultValue: '',
            expression: 'optional',
            change(properties: ContainerProperties) {
              // inject = if there isn't one
              if (
                properties.condition &&
                !properties.condition.qStringExpression &&
                properties.condition[0] !== '/' &&
                properties.condition[1] !== '/'
              ) {
                properties.condition = { qStringExpression: { qExpr: `=${properties.condition}` } };
              }
            },
            show: (item: PropertiesChild, handler: PropertyHandler) => {
              return (
                !item.isMaster ||
                (item.isMaster &&
                  containerHandler.isValidMaster(item.refId) &&
                  !containerHandler.isAppPublished(handler.app))
              );
            },
          },
          editProps: {
            component: 'button',
            translation: 'Object.Container.Props.EditProperties',
            action(item: PropertiesChild, _handler: PropertyHandler, args: PropertyArgs) {
              containerHandler.editProps(args.model, item.refId);
            },
            show(item: PropertiesChild) {
              return !item.isMaster;
            },
          },
          editMasterHeader: {
            component: 'text',
            style: 'sHeader',
            translation: 'Object.Linked.NoEdit.PropPanel.Title',
            show(item: PropertiesChild) {
              return item.isMaster;
            },
          },
          editMasterText: {
            component: 'text',
            translation: 'Object.Linked.Edit.PropPanel.Text',
            show: (item: PropertiesChild, handler: PropertyHandler) => {
              return (
                item.isMaster &&
                containerHandler.isValidMaster(item.refId) &&
                !containerHandler.isAppPublished(handler.app)
              );
            },
          },
          notEditMasterText: {
            component: 'text',
            translation: 'Object.Linked.NoEdit.PropPanel.Text',
            show: (item: PropertiesChild, handler: PropertyHandler) => {
              return (
                item.isMaster &&
                containerHandler.isValidMaster(item.refId) &&
                containerHandler.isAppPublished(handler.app)
              );
            },
          },
          editMaster: {
            component: 'button',
            translation: 'Object.Container.Props.Edit',
            action(_item: PropertiesChild) {
              // containerHandler.editMasterProps(item.refId);
            },
            show: (item: PropertiesChild, handler: PropertyHandler) => {
              return (
                item.isMaster &&
                containerHandler.isValidMaster(item.refId) &&
                !containerHandler.isAppPublished(handler.app)
              );
            },
          },
          invalidMasterText: {
            component: 'text',
            translation: 'Object.Invalid.Info',
            show: (item: PropertiesChild) => {
              return item.isMaster && !containerHandler.isValidMaster(item.refId);
            },
          },
        },
      },
    ],
  };

  const settings = {
    type: 'items',
    uses: 'settings',
    component: 'expandable-items',
    translation: 'Common.Appearance',
    items: {
      presentation: {
        type: 'items',
        translation: 'properties.presentation',
        items: {
          borders: {
            ref: 'borders',
            type: 'string',
            translation: 'Object.Container.Props.Borders',
            defaultValue: 'auto',
            component: 'dropdown',
            tid: 'container-border-property',
            options: [
              {
                value: 'auto',
                translation: 'Common.Auto',
              },
              {
                value: 'border',
                translation: 'Object.Container.Props.Borders.Border',
              },
              {
                value: 'noBorder',
                translation: 'Object.Container.Props.Borders.NoBorder',
              },
            ],
          },
        },
      },
      container: {
        type: 'items',
        translation: 'Object.Container.Props.Container',
        items: {
          showTabs: {
            type: 'boolean',
            translation: 'Object.Container.Props.ShowTabs',
            ref: 'showTabs',
            defaultValue: true,
            component: 'switch',
            options: [
              {
                value: true,
                translation: 'properties.on',
              },
              {
                value: false,
                translation: 'properties.off',
              },
            ],
          },
          useDropdown: {
            type: 'boolean',
            translation: 'Object.Container.Props.UseDropdown',
            label: 'Menu',
            ref: 'useDropdown',
            component: 'switch',
            options: [
              {
                value: true,
                translation: 'Common.Auto',
              },
              {
                value: false,
                translation: 'properties.off',
              },
            ],
            defaultValue: true,
            show(data: ContainerProperties) {
              return data.showTabs !== false;
            },
          },
          useScrollButton: {
            type: 'boolean',
            translation: 'Object.Container.Props.UseScrollButtons',
            ref: 'useScrollButton',
            component: 'switch',
            options: [
              {
                value: true,
                translation: 'Common.Auto',
              },
              {
                value: false,
                translation: 'properties.off',
              },
            ],
            defaultValue: true,
            show(data: ContainerProperties) {
              return data.showTabs !== false;
            },
          },
          activeTab: {
            type: 'string',
            translation: 'Object.Container.Props.DefaultTab',
            ref: 'activeTab',
            defaultValue: undefined,
            tid: 'container-active-tab',
            show() {
              return false;
            },
          },
          defaultTab: {
            type: 'string',
            translation: 'Object.Container.Props.DefaultTab',
            ref: 'defaultTab',
            component: 'dropdown',
            defaultValue: undefined,
            tid: 'container-default-tab',
            options(_data: ContainerProperties, handler: PropertyHandler) {
              return fetchContainerTabs(handler.layout.qChildList.qItems, handler.layout.children, env);
            },
          },
        },
      },
    },
  };

  return {
    definition: {
      type: 'items',
      component: 'accordion',
      defaultActiveTabIndex: 0,
      items: {
        data,
        content,
        settings,
      },
    },
    support: {
      cssScaling: false,
      snapshot: false,
      export: false,
      exportData: true,
      sharing: false,
    },
  };
}
