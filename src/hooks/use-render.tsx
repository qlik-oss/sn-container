import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from '@nebula.js/stardust';
import Root from '../components/Root';

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
      ReactDOM.render(<Root layout={core.layout} />, core.element);
    }
  }, [core]);
};

export default UseRender;
