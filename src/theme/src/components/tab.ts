import { SIZES, COLORS, WEIGHTS } from '../internal/variables';

export const light = {
  styleOverrides: {
    root: {
      fontSize: SIZES.TEXT_MEDIUM,
      fontWeight: WEIGHTS.MEDIUM,
      textTransform: 'none',
      minWidth: 'auto',
      boxSizing: 'border-box',
      '&:hover': {
        borderBottom: `2px solid ${COLORS.GREYSCALE_80}`,
        paddingBottom: '10px',
      },
      '&.sprout-focus-visible': {
        boxShadow: `inset 0 0 0 2px ${COLORS.MISC_FOCUS_BORDER}`,
        paddingTop: '4px',
        backgroundColor: COLORS.GREYSCALE_0_03,
        borderRadius: SIZES.BORDER_RADIUS,
        minHeight: '44px',
        paddingBottom: '4px',
        border: 'none',
      },
      '&$disabled': {
        opacity: 0.3,
      },
    },
    textColorPrimary: {
      color: COLORS.GREYSCALE_25,
      '&$selected': {
        color: COLORS.GREYSCALE_25,
      },
    },
    textColorInherit: {
      opacity: 'unset',
    },
    fullWidth: {
      '&.sprout-focus-visible': {
        paddingRight: 12,
        paddingLeft: 12,
      },
    },
    wrapper: {
      alignItems: 'initial',
    },
    labelIcon: {
      minWidth: '40px',
      minHeight: '48px',

      '&.sprout-focus-visible': {
        minHeight: 'auto',
        height: '30px',
        marginTop: 9,
        marginBottom: 9,
        flexDirection: 'column',
        paddingRight: '12px',
        paddingBottom: '2px',
      },
      '& $wrapper': {
        display: 'block',
      },
    },
  },
};
