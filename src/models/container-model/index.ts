export default function createContainerModel({ layoutService, themeService, embed }: ContainerModelProps) {
  const state = {
    layoutService,
    themeService,
    embed,
  };

  return {
    ...state,
  };
}
