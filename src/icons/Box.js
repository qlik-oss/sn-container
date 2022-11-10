import React from 'react';
import SvgIcon from './SvgIcon';

export default function (props) {
  return React.createElement(SvgIcon, {
    d: 'M8,0 L15,4 L8,8 L1,4 L8,0 Z M9,16 L9,10 L15,6.5 L15,13 L9,16 Z M1,13 L1,6.5 L7.1,10 L7.1,16 L1,13 Z',
    ...props,
  });
}
