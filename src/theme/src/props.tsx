import { ComponentsProps } from '@mui/material/styles/props';

const props: ComponentsProps = {
  MuiAppBar: {
    elevation: 0,
  },
  MuiButtonBase: {
    disableRipple: true,
    disableTouchRipple: true,
    focusVisibleClassName: 'sprout-focus-visible',
  },
  MuiButtonGroup: {
    disableRipple: true,
  },
  MuiButton: {
    focusVisibleClassName: 'sprout-focus-visible',
  },
  MuiTabs: {
    indicatorColor: 'primary',
    textColor: 'primary',
  },
  MuiToolbar: {
    disableGutters: true,
  },
  MuiTooltip: {
    arrow: true,
  },
};

export default props;
