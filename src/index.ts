import { useRender, useCore, useModels } from './hooks';
import createQae from './qae';
import ext from './ext/ext';
import locale from './locale';

export default function supernova(env: EnvironmentType) {
  locale(env.translator);

  return {
    qae: createQae(),
    ext: ext(env),
    component() {
      const core = useCore();
      const models = useModels({ core, visualizationApi: env.sense?.visualizationApi });
      useRender({ core, models });
    },
  };
}
