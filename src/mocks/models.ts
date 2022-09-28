import layoutService from './layout-service';

export default {
  containerModel: {
    layoutService,
    themeService: { getTheme: () => 'light' },
    embed: { render: jest.fn(async () => Promise.resolve({ data: {} })) },
    app: {},
    options: { direction: 'ltr' },
  },
};
