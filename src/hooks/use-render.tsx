import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from '@nebula.js/stardust';
import RootComponent from '../components/root';

type TODO = any;

type UseRenderProps = {
  core: {
    element: HTMLElement;
    layout: TODO;
  };
};

const UseRender = ({ core }: UseRenderProps) => {
  useEffect(() => {
    if (core?.element && core.layout) {
      ReactDOM.render(<RootComponent layout={core.layout} />, core.element);
    }
  }, [core]);
};

export default UseRender;
