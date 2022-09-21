import { useElement, useState, useEffect } from '@nebula.js/stardust';
import useViewState from './use-view-state';

const useCore = () => {
  const element = useElement();
  const viewState = useViewState();

  const [core, setCore] = useState();
  useEffect(() => {
    if (!viewState || !element) return undefined;
    setCore({
      element,
    });
  }, [viewState, element]);

  return core;
};

export default useCore;
