import { COLORS } from '../internal/variables';

export const light = {
  styleOverrides: {
    root: {
      height: '48px',
    },
    gutters: {
      paddingLeft: '12px',
      paddingRight: '12px',
    },
    button: {
      '&:hover': {
        backgroundColor: COLORS.GREYSCALE_0_03,
      },
      '&:active': {
        backgroundColor: COLORS.GREYSCALE_0_05,
      },
    },
  },
};
