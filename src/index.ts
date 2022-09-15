import { useRender, useCore } from './hooks';
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
      useRender({ core });
    },
  };
}
