import getPalette from './pallete';
import getComponents from './components';
import { COLORS, SIZES, VARIOUS, WEIGHTS } from './internal/variables';
import props from './props';

export default (variant: string = 'light'): any | undefined => {
  const components = getComponents(variant);
  const palette = getPalette(variant);
  return {
    palette,
    props,
    breakpoints: {
      keys: ['xs', 'sm', 'md', 'lg', 'xl'],
      values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
    },
    spacing: 8,
    shadows: [
      'none',
      '0px 1px 2px 0px rgba(0,0,0,0.15)',
      '0px 1px 2px 0px rgba(0,0,0,0.15)',
      '0px 1px 2px 0px rgba(0,0,0,0.15)',
      '0px 1px 2px 0px rgba(0,0,0,0.15)',
      '0px 1px 2px 0px rgba(0,0,0,0.15)',
      '0px 1px 2px 0px rgba(0,0,0,0.15)',

      '0px 2px 4px 0px rgba(0,0,0,0.15)',
      '0px 2px 4px 0px rgba(0,0,0,0.15)',
      '0px 2px 4px 0px rgba(0,0,0,0.15)',
      '0px 2px 4px 0px rgba(0,0,0,0.15)',
      '0px 2px 4px 0px rgba(0,0,0,0.15)',
      '0px 2px 4px 0px rgba(0,0,0,0.15)',

      '0px 4px 10px 0px rgba(0,0,0,0.15)',
      '0px 4px 10px 0px rgba(0,0,0,0.15)',
      '0px 4px 10px 0px rgba(0,0,0,0.15)',
      '0px 4px 10px 0px rgba(0,0,0,0.15)',
      '0px 4px 10px 0px rgba(0,0,0,0.15)',
      '0px 4px 10px 0px rgba(0,0,0,0.15)',

      '0px 6px 20px 0px rgba(0,0,0,0.15)',
      '0px 6px 20px 0px rgba(0,0,0,0.15)',
      '0px 6px 20px 0px rgba(0,0,0,0.15)',
      '0px 6px 20px 0px rgba(0,0,0,0.15)',
      '0px 6px 20px 0px rgba(0,0,0,0.15)',
      '0px 6px 20px 0px rgba(0,0,0,0.15)',
    ],
    components,
    transitions: {
      easing: {
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      },
      duration: {
        standard: 300,
        short: 250,
        enteringScreen: 225,
        shorter: 200,
        leavingScreen: 195,
        shortest: 150,
        complex: 375,
      },
    },
    typography: {
      fontSize: SIZES.TEXT_MEDIUM,
      fontWeightLight: WEIGHTS.LIGHT,
      fontWeightRegular: WEIGHTS.REGULAR,
      fontWeightMedium: WEIGHTS.MEDIUM,
      fontWeightBold: WEIGHTS.BOLD,
      htmlFontSize: SIZES.TEXT_MEDIUM,
      fontFamily: VARIOUS.FONT_FAMILY,
      button: {
        fontWeight: WEIGHTS.MEDIUM,
        fontSize: SIZES.TEXT_MEDIUM,
        textTransform: 'none',
      },
      body1: {
        fontSize: SIZES.TEXT_LARGE,
        lineHeight: '24px',
      },
      body2: {
        fontSize: SIZES.TEXT_MEDIUM,
        lineHeight: '20px',
      },
      h1: {
        fontSize: 32,
        lineHeight: '32px',
      },
      h2: {
        fontSize: 28,
        lineHeight: '32px',
      },
      h3: {
        fontSize: SIZES.TEXT_EXTRA_LARGE,
        lineHeight: '24px',
      },
      h4: {
        fontSize: 20,
        lineHeight: '24px',
      },
      h5: {
        fontSize: SIZES.TEXT_LARGE,
        fontWeight: WEIGHTS.MEDIUM,
        lineHeight: '16px',
      },
      h6: {
        fontSize: SIZES.TEXT_MEDIUM,
        fontWeight: WEIGHTS.MEDIUM,
        lineHeight: '16px',
      },
      caption: {
        color: COLORS.TEXT_SECONDARY,
      },
      subtitle1: {
        fontSize: SIZES.TEXT_MEDIUM,
        color: COLORS.TEXT_SECONDARY,
      },
      subtitle2: {
        fontSize: SIZES.TEXT_SMALL,
        color: COLORS.TEXT_SECONDARY,
      },
    },
    zIndex: {
      modal: 1200,
      snackbar: 1200,
      drawer: 1200,
      appBar: 1200,
      mobileStepper: 1200,
      tooltip: 1200,
    },
    shape: {
      borderRadius: SIZES.BORDER_RADIUS,
    },
  };
};
