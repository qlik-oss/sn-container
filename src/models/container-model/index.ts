export default function createContainerModel({
  layoutService,
  themeService,
  embed,
  app,
  model,
  options,
  translator,
  constraints,
  visualizations,
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
    visualizations,
  };

  return {
    ...state,
  };
}
