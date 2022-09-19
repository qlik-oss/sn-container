import { useRender, useCore, useModels } from './hooks';
import createQae from './qae';
import ext from './ext/ext';
import locale from './locale';

export default function supernova(env: EnvironmentType) {
  locale(env.translator);

  return {
    qae: createQae(),
    ext: ext(),
    component() {
      const core = useCore();
      const models = useModels({ core });
      useRender({ core, models });
    },
  };
}
