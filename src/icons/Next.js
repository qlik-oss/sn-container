import React from 'react';
import SvgIcon from './SvgIcon';

export default function (props) {
  return React.createElement(SvgIcon, {
    d: 'M8.5 8L4 3.5 5.5 2 11.5 8 5.5 14 4 12.5 8.5 8z',
    ...props,
  });
}
