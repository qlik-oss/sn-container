import React from 'react';
declare type Props = React.HTMLAttributes<HTMLElement> &
  Pick<React.SVGProps<SVGPathElement>, 'd'> & {
    size?: 'large' | 'medium' | 'small' | 'inherit';
  };
declare const SvgIcon: (ref: Props) => React.DetailedReactHTMLElement<Props, HTMLElement>;
export default SvgIcon;
