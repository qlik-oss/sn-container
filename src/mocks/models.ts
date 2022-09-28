import layoutService from './layout-service';
import { themeService as createThemeService } from 'qlik-chart-modules';
import themeStyleMatrix from '../services/theme-service/theme-style-matrix';

export default {
  containerModel: {
    layoutService,
    themeService: createThemeService({ theme: 'light', styleMatrix: themeStyleMatrix }),
    embed: { render: jest.fn(async () => Promise.resolve({ data: {} })) },
    app: {},
    options: { direction: 'ltr' },
  },
};
