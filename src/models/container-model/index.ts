export default function createContainerModel({
  layoutService,
  themeService,
  embed,
  app,
  options,
  translator,
}: ContainerModelProps) {
  const state = {
    layoutService,
    themeService,
    embed,
    app,
    options,
    translator,
  };

  return {
    ...state,
  };
}
