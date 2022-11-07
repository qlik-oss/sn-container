import layoutServiceMock from './layout-service';
import modelMock from './model';
import translatorMock from './translator';
import appMock from './app';

export default {
  containerModel: {
    layoutService: layoutServiceMock,
    themeService: { getTheme: () => 'light' },
    embed: { render: jest.fn(async () => Promise.resolve({ data: {} })) },
    app: appMock,
    constraints: undefined,
    model: modelMock,
    options: { direction: 'ltr' },
    translator: translatorMock,
    visualizationApi: undefined,
  },
};
