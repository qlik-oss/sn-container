import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from '@nebula.js/stardust';
import Root from '../components/Root';

interface UseRenderProps {
  core: {
    element: HTMLElement;
  };
  models: {
    containerModel: ContainerModel;
  };
}

const UseRender = ({ core, models }: UseRenderProps) => {
  useEffect(() => {
    if (core?.element && models) {
      ReactDOM.render(<Root models={models} />, core.element);
    }
  }, [core, models]);
};

export default UseRender;
