import { COLORS, SIZES } from '../internal/variables';

export const light = {
  styleOverrides: {
    root: {
      height: '32px',
      lineHeight: '16px',
      minWidth: '24px',
      fontSize: 14,
      borderRadius: SIZES.BORDER_RADIUS,
      '& > $label > i:only-child': {
        marginLeft: '-9px',
        marginRight: '-9px',
      },
    },
    text: {
      padding: '8px 16px',
      '&:active': {
        backgroundColor: COLORS.GREYSCALE_0_10,
      },
      '&$focusVisible': {
        boxShadow: `0 0 0 2px ${COLORS.MISC_FOCUS_BORDER}`,
      },
    },
    outlined: {
      padding: '7px 16px',
      borderColor: COLORS.GREYSCALE_0_15,
      backgroundColor: COLORS.GREYSCALE_100_60,
      '&:active': {
        backgroundColor: COLORS.GREYSCALE_0_10,
      },
      '&$focusVisible': {
        borderColor: COLORS.MISC_FOCUS_BORDER,
        boxShadow: `0 0 0 1px ${COLORS.MISC_FOCUS_BORDER}`,
      },
    },
    contained: {
      padding: '8px 16px',
      boxShadow: 'none',
      '&:hover': {
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
      },
    },
    containedPrimary: {
      '&:hover': {
        backgroundColor: COLORS.GREEN_PALE,
      },
      '&:active': {
        backgroundColor: COLORS.GREEN_DARK,
      },
      '&$focusVisible': {
        borderColor: COLORS.GREEN_PALE,
        boxShadow: '0 0 0 3px',
      },
    },
    containedSecondary: {
      '&:hover': {
        backgroundColor: COLORS.BLUE_PALE,
      },
      '&:active': {
        backgroundColor: COLORS.BLUE_DARK,
      },
      '&$focusVisible': {
        borderColor: COLORS.BLUE_PALE,
        boxShadow: '0 0 0 3px',
      },
    },
    sizeSmall: {
      fontSize: 12,
      height: '24px',
      '& > $label > i:only-child': {
        marginLeft: '-7px',
        marginRight: '-7px',
      },
    },
    sizeLarge: {
      fontSize: 16,
      height: '40px',
      lineHeight: '20px',
      '& > $label > i:only-child': {
        marginLeft: '-10px',
        marginRight: '-10px',
      },
    },
    textSizeSmall: {
      padding: '4px 11px',
    },
    textSizeLarge: {
      padding: '10px 19px',
    },
    outlinedSizeSmall: {
      padding: '3px 11px',
    },
    outlinedSizeLarge: {
      padding: '9px 19px',
    },
    containedSizeSmall: {
      padding: '4px 11px',
    },
    containedSizeLarge: {
      padding: '10px 19px',
    },
  },
};
