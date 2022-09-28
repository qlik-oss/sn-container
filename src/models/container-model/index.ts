export default function createContainerModel({
  layoutService,
  themeService,
  embed,
  app,
  options,
}: ContainerModelProps) {
  const state = {
    layoutService,
    themeService,
    embed,
    app,
    options,
  };

  return {
    ...state,
  };
}
