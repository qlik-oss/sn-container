/* copied from sprout */
/**
 * Generate React components for using SVG icons.
 */
const defaultComponentCode = `import React from 'react';

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function getFontSize(size) {
  if (size === 'large') return '20px';else if (size === 'small') return '12px';else if (size === 'inherit') return 'null';else return '16px';
}

var SvgIcon = function SvgIcon(_ref) {
  var d = _ref.d,
      size = _ref.size,
      style = _ref.style,
      extraProps = _objectWithoutProperties(_ref, ["d", "size", "style"]);

  return React.createElement("i", _extends({
    style: _objectSpread({
      fontSize: getFontSize(size),
      display: 'inline-block',
      fontStyle: 'normal',
      lineHeight: '0',
      textAlign: 'center',
      textTransform: 'none',
      verticalAlign: '-.125em',
      textRendering: 'optimizeLegibility',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale'
    }, style)
  }, extraProps), React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    width: "1em",
    height: "1em",
    viewBox: "0 0 16 16",
    fill: "currentColor"
  }, React.createElement("path", {
    d: d
  })));
};

export default SvgIcon;
`;

/*

Generated from Babel Repl (https://babeljs.io/repl) with:

function getFontSize(size) {
  if (size === 'large') return '20px';
  else if (size === 'small') return '12px';
  else if (size === 'inherit') return null;
  else return '16px';
}

const SvgIcon = ({ d, size, style, ...extraProps }) => (
  <i style={{
    fontSize: getFontSize(size),
    display: 'inline-block',
    fontStyle: 'normal',
    lineHeight: '0',
    textAlign: 'center',
    textTransform: 'none',
    verticalAlign: '-.125em',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    ...style
  }} {...extraProps}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d={d} />
    </svg>
  </i>
);


*/

const defaultComponentTypeScriptType = `import React from 'react';
declare type Props = React.HTMLAttributes<HTMLElement> &
  Pick<React.SVGProps<SVGPathElement>, 'd'> & {
    size?: 'large' | 'medium' | 'small' | 'inherit';
  };
declare const SvgIcon: (
  ref: Props
) => React.DetailedReactHTMLElement<Props, HTMLElement>;
export default SvgIcon;
`;

const iconComponentName = (name) =>
  name
    .split('-')
    .map((part) => `${part[0].toUpperCase()}${part.substr(1)}`)
    .join('');

const iconComponentCode = ({ d }) => `import React from 'react';
import SvgIcon from './SvgIcon';

export default function (props) {
  return React.createElement(SvgIcon, {
    d:
      "${d}"
  , ...props});
}
`;

const iconComponentTypeScriptType = () => `import React from 'react';
import SvgIcon from './SvgIcon';
declare type Props = Omit<React.ComponentProps<typeof SvgIcon>, 'd'>;
export default function(props: Props): React.FunctionComponentElement<Props>;
`;

module.exports = (glyphs) =>
  glyphs
    .map(({ className, d }) => {
      const componentName = iconComponentName(className);
      const componentCode = iconComponentCode({ d });
      const typeScriptTypeCode = iconComponentTypeScriptType();
      return [
        {
          filename: `${componentName}.js`,
          name: componentName,
          code: componentCode,
        },
        {
          filename: `${componentName}.d.ts`,
          name: componentName,
          code: typeScriptTypeCode,
        },
      ];
    })
    .reduce((acc, val) => acc.concat(val), [])
    .concat([
      {
        filename: 'SvgIcon.js',
        name: 'SvgIcon',
        code: defaultComponentCode,
      },
      {
        filename: 'SvgIcon.d.ts',
        name: 'SvgIcon',
        code: defaultComponentTypeScriptType,
      },
    ]);
