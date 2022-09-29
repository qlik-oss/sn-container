import React from 'react';
import SvgIcon from './SvgIcon';

export default function (props) {
  return React.createElement(SvgIcon, {
    d: 'M7 8L11.5 12.5 10 14 4 8 10 2 11.5 3.5z',
    ...props,
  });
}
