import {
  useEffect,
  useState,
  useStaleLayout,
  useTheme,
  useEmbed,
  useApp,
  useModel,
  useOptions,
  useConstraints,
  useTranslator,
} from '@nebula.js/stardust';
import createContainerModel from '../models/container-model';
import { layoutService as createLayoutService, themeService as createThemeService } from 'qlik-chart-modules';
import themeStyleMatrix from '../services/theme-service/theme-style-matrix';
import layoutServiceMeta from '../services/layout-service/meta';

interface UseModelsProps {
  core?: {
    element: HTMLElement;
  };
  visualizations?: Visualizations;
}

const UseModels = ({ core, visualizations }: UseModelsProps) => {
  const app = useApp();
  const layout = useStaleLayout();
  const theme = useTheme();
  const embed = useEmbed();
  const options = useOptions();
  const translator = useTranslator();
  const model = useModel();
  const constraints = useConstraints();

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

    const containerModel = createContainerModel({
      layoutService,
      themeService,
      embed,
      app,
      constraints,
      model,
      options,
      translator,
      visualizations,
    });
    setModels({
      containerModel,
    });
  }, [core, layout, app, constraints, model, options, embed, translator, visualizations]);

  return models;
};

export default UseModels;
