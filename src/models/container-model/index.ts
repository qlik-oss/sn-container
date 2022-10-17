export default function createContainerModel({
  layoutService,
  themeService,
  embed,
  app,
  model,
  options,
  translator,
}: ContainerModelProps) {
  const state = {
    layoutService,
    themeService,
    embed,
    app,
    model,
    options,
    translator,
  };

  return {
    ...state,
  };
}
