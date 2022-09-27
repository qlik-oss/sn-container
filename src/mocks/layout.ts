const cell = {
  qElemNumber: 0,
  qState: 'S',
  qText: 'test-value',
  qAttrExps: {
    qValues: [
      {
        qNum: 10,
      },
    ],
  },
};

const dataPage = {
  qMatrix: [[cell]],
};

const qHyperCube = {
  qDimensionInfo: [
    {
      qFallbackTitle: '',
      qAttrExprInfo: [],
      qAttrDimInfo: [],
    },
  ],
  qDataPages: [dataPage],
  qMode: 'S',
  qSize: {
    qcx: 0,
    qcy: 0,
  },
  qMeasureInfo: [],
};

const basicProps = {
  qInfo: {
    qId: 'containerId',
    qType: 'sn-container',
  },
  footnote: 'footnote',
  showDetails: false,
  showTitles: false,
  title: 'title',
  subtitle: 'subTitle',
  qSelectionInfo: {},
};

const children = [
  {
    refId: '700c5c46-acce-4f79-b482-7939818d05fb',
    label: 'barbull',
    isMaster: true,
    cId: 'LpPpcBz',
  },
  {
    refId: 'GmJHVvD',
    label: 'Pie chart',
    isMaster: false,
    cId: 'JyrDhv',
  },
  {
    refId: 'cKMAa',
    label: 'Pie chart',
    isMaster: false,
  },
];

const qChildListItems = [
  {
    qInfo: {
      qId: 'a21c88de-3d72-4712-8e7c-5f6e32ddb958',
      qType: 'sn-bullet-chart',
    },
    qMeta: {
      privileges: ['read', 'update', 'delete', 'exportdata'],
    },
    qData: {
      title: 'tieleee',
      visualization: 'sn-bullet-chart',
      containerChildId: '',
      qExtendsId: '700c5c46-acce-4f79-b482-7939818d05fb',
      showCondition: '',
    },
  },
  {
    qInfo: {
      qId: '0c691b1e-107a-48ce-8a40-8559cae56727',
      qType: 'piechart',
    },
    qMeta: {
      privileges: ['read', 'update', 'delete', 'exportdata'],
    },
    qData: {
      title: '',
      visualization: 'piechart',
      containerChildId: 'GmJHVvD',
      qExtendsId: '',
      showCondition: '',
    },
  },
  {
    qInfo: {
      qId: '72179ca1-58d2-40fc-b571-9823553e469b',
      qType: 'piechart',
    },
    qMeta: {
      privileges: ['read', 'update', 'delete', 'exportdata'],
    },
    qData: {
      title: '',
      visualization: 'piechart',
      containerChildId: 'cKMAa',
      qExtendsId: '',
      showCondition: '',
    },
  },
];

const layout = {
  container: {
    ...basicProps,
    qHyperCube,
  },
  containerWithChild: {
    ...basicProps,
    qHyperCube,
    children: [children[0]],
    qChildList: { qItems: [qChildListItems[0]] },
  },
  containerWithChildren: {
    ...basicProps,
    qHyperCube,
    children,
    qChildList: { qItems: qChildListItems },
  },
};

export default layout;
