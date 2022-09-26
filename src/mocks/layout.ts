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

const layout = {
  container: {
    ...basicProps,
    qHyperCube,
  },
};

export default layout;
