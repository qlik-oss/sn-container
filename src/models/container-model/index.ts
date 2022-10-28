export default function createContainerModel({
  layoutService,
  themeService,
  embed,
  app,
  model,
  options,
  translator,
  constraints,
  visualizationApi,
}: ContainerModelProps) {
  const state = {
    layoutService,
    themeService,
    embed,
    app,
    model,
    options,
    translator,
    constraints,
    visualizationApi,
  };

  return {
    ...state,
  };
}
