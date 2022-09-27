import { useEffect, useState, useStaleLayout, useTheme, useEmbed, useApp, useOptions } from '@nebula.js/stardust';
import createContainerModel from '../models/container-model';
import { layoutService as createLayoutService, themeService as createThemeService } from 'qlik-chart-modules';
import themeStyleMatrix from '../services/theme-service/theme-style-matrix';
import layoutServiceMeta from '../services/layout-service/meta';

type UseModelsProps = {
  core?: {
    element: HTMLElement;
  };
};

const UseModels = ({ core }: UseModelsProps) => {
  const app = useApp();
  const layout = useStaleLayout();
  const theme = useTheme();
  const embed = useEmbed();
  const options = useOptions();

  const [models, setModels] = useState();

  useEffect(() => {
    if (!core) {
      return;
    }
    const layoutService = createLayoutService({
      source: layout,
      metaAdditionsFn: layoutServiceMeta(),
    });
    const themeService = createThemeService({ theme, styleMatrix: themeStyleMatrix });

    const containerModel = createContainerModel({ layoutService, themeService, embed, app, options });
    setModels({
      containerModel,
    });
  }, [core, layout, app, options]);

  return models;
};

export default UseModels;
