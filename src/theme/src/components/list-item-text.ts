import { COLORS, SIZES, WEIGHTS } from '../internal/variables';

export const light = {
  styleOverrides: {
    root: {
      fontSize: '12px',
    },
    primary: {
      fontSize: SIZES.TEXT_MEDIUM,
      color: COLORS.TEXT_PRIMARY,
      lineHeight: '16px',
    },
    secondary: {
      fontSize: SIZES.TEXT_SMALL,
      fontWeight: WEIGHTS.LIGHT,
      lineHeight: '16px',
      color: COLORS.TEXT_SECONDARY,
    },
  },
};
