declare interface ContainerModelProps {
  layoutService: LayoutService;
  themeService: ThemeService;
  embed: Embed;
  app: App;
  model: Model;
  options: Options;
  translator: TranslatorType;
  constraints: Constraints;
  visualizations?: Visualizations;
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
  visualizations?: Visualizations;
}
