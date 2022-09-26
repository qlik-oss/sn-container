import containerModel from '../index';
import layoutServiceMock from '../../../mocks/layout-service';

describe('qae index', () => {
  let layoutService: LayoutService;
  let themeService: ThemeService;
  let embed: any;
  let app: any;
  let options: Options;

  beforeEach(() => {
    layoutService = layoutServiceMock;
    themeService = { getTheme: () => 'light' };
    embed = { key: 'embed' };
    app = { key: 'app' };
    options = { direction: 'ltr' };
  });

  it('should return proper structure of qae', () => {
    const definition = containerModel({ layoutService, themeService, embed, app, options });
    expect(definition).toHaveProperty('layoutService');
    expect(definition).toHaveProperty('themeService');
    expect(definition).toHaveProperty('embed');
    expect(definition).toHaveProperty('app');
    expect(definition).toHaveProperty('options');
  });
});
