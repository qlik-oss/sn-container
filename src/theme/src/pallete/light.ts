import { PaletteOptions } from '@mui/material/styles/createPalette';
import { COLORS } from '../internal/variables';

const palette: PaletteOptions = {
  primary: {
    light: COLORS.GREEN_PALE,
    main: COLORS.GREEN,
    dark: COLORS.GREEN_DARK,
    contrastText: COLORS.WHITE,
  },
  secondary: {
    light: COLORS.BLUE_PALE,
    main: COLORS.BLUE,
    dark: COLORS.BLUE_DARK,
    contrastText: COLORS.WHITE,
  },
  error: {
    light: COLORS.RED_PALE,
    main: COLORS.RED,
    dark: COLORS.RED_DARK,
    contrastText: COLORS.WHITE,
  },
  warning: {
    light: COLORS.ORANGE_PALE,
    main: COLORS.ORANGE,
    dark: COLORS.ORANGE_DARK,
    contrastText: COLORS.WHITE,
  },
  success: {
    light: COLORS.GREEN_PALE,
    main: COLORS.GREEN,
    dark: COLORS.GREEN_DARK,
    contrastText: COLORS.WHITE,
  },
  info: {
    light: COLORS.BLUE_PALE,
    main: COLORS.BLUE,
    dark: COLORS.BLUE_DARK,
    contrastText: COLORS.WHITE,
  },
  text: {
    primary: COLORS.TEXT_PRIMARY,
    secondary: COLORS.TEXT_SECONDARY,
    disabled: COLORS.GREYSCALE_0_30,
  },
  action: {
    hover: COLORS.GREYSCALE_0_03,
    hoverOpacity: 0.05,
  },
  background: {
    paper: COLORS.WHITE,
    default: COLORS.GREYSCALE_95,
  },
  divider: COLORS.GREYSCALE_0_15,
};

export default palette;
