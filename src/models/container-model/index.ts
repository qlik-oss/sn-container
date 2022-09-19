export default function createContainerModel({ layoutService, themeService }: any) {
  const state = {
    layoutService,
    themeService,
  };

  return {
    ...state
  };
}
