import containerModel from '../index';
import layoutServiceMock from '../../../mocks/layout-service';
import translatorMock from '../../../mocks/translator';
import modelMock from '../../../mocks/model';

describe('qae index', () => {
  let layoutService: any;
  let themeService: ThemeService;
  let embed: any;
  let app: any;
  let options: Options;
  let translator: TranslatorType;
  const constraints = {};
  let visualizationApi: VisualizationApi | undefined;
  let model: any;

  beforeEach(() => {
    layoutService = layoutServiceMock;
    themeService = { getTheme: () => 'light' };
    embed = { key: 'embed' };
    app = { key: 'app' };
    options = { direction: 'ltr' };
    translator = translatorMock;
    model = modelMock;
  });
  it('should return proper structure of qae', () => {
    const definition = containerModel({
      layoutService,
      themeService,
      embed,
      app,
      model,
      options,
      translator,
      constraints,
      visualizationApi,
    });
    expect(definition).toHaveProperty('layoutService');
    expect(definition).toHaveProperty('themeService');
    expect(definition).toHaveProperty('embed');
    expect(definition).toHaveProperty('app');
    expect(definition).toHaveProperty('options');
  });
});
