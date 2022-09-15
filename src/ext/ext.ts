export default function ext() {
  const content = {
    uses: 'data',
    items: {
      dimensions: {
        disabledRef: '',
        show: false,
      },
    },
  };

  const settings = {
    type: 'items',
    uses: 'settings',
    component: 'expandable-items',
    translation: 'Common.Appearance',
  };

  return {
    definition: {
      type: 'items',
      component: 'accordion',
      items: {
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
