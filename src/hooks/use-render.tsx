import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from '@nebula.js/stardust';
import RootComponent from '../components/root';

type UseRenderProps = {
  core: {
    element: HTMLElement;
  };
};

const UseRender = ({ core }: UseRenderProps) => {
  useEffect(() => {
    if (core?.element) {
      ReactDOM.render(<RootComponent />, core.element);
    }
  }, [core]);
};

export default UseRender;
