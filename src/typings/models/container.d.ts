declare interface ContainerModelProps {
  layoutService: LayoutService;
  themeService: ThemeService;
  embed: Embed;
  app: App;
  model: Model;
  options: Options;
  translator: TranslatorType;
  constraints: Constraints;
  visualizationApi?: VisualizationApi;
}

declare interface ContainerModel {
  layoutService: LayoutService;
  themeService: ThemeService;
  embed: Embed;
  app: App;
  model: Model;
  options: Options;
  translator: TranslatorType;
  constraints: Constraints;
  visualizationApi?: VisualizationApi;
}
