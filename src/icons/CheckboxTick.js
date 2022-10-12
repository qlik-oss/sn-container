import React from 'react';
import SvgIcon from './SvgIcon';

export default function (props) {
  return React.createElement(SvgIcon, {
    d: 'M10.102 5.293 6.737 8.657l-.83-.828a1 1 0 1 0-1.414 1.414l1.536 1.535a1 1 0 0 0 1.415 0l4.073-4.07a1 1 0 1 0-1.415-1.414v-.001Z',
    ...props,
  });
}
