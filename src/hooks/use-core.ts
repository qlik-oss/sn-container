import { useElement, useState, useEffect, useLayout } from '@nebula.js/stardust';
import useViewState from './use-view-state';

const useCore = () => {
  const element = useElement();
  const layout = useLayout();
  const viewState = useViewState();

  const [core, setCore] = useState();
  useEffect(() => {
    if (!viewState || !element) return undefined;
    setCore({
      element,
      layout,
    });
  }, [viewState, element, layout]);

  return core;
};

export default useCore;
