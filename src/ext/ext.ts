function fetchContainerTabs(qItems: QChild[], children: PropertiesChild[]) {
  const options: DropdownOption[] = [];
  children.forEach((child, index) => {
    const item = qItems.find(
      (item) => child.refId === item.qData.containerChildId || child.refId === item.qData.qExtendsId
    );
    if (item) {
      // ToDo - create a new nebula hook that picks up the registered visualizations
      // if (child?.label === '') {
      //   const libInfo = Visualizations.getType(item.qData.visualization).getLibraryInfo();
      //   translation = libInfo.translationKey ? translator.get(libInfo.translationKey) : libInfo.name;
      // } else {
      //   translation = child.label;
      // }
      options[index] = { translation: child.label, value: item.qInfo.qId };
    }
  });
  return options;
}

export default function ext() {
  const data = {
    uses: 'data',
    show: false,
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
              return fetchContainerTabs(handler.layout.qChildList.qItems, handler.layout.children);
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
      items: {
        data,
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
