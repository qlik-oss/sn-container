import * as MuiList from './list';
import * as MuiListItem from './list-item';
import * as MuiListItemIcon from './list-item-icon';
import * as MuiListItemText from './list-item-text';
import * as MuiTab from './tab';
import * as MuiButton from './button';
import * as MuiButtonBase from './button-base';

const allVariantOverrides: any = {
  MuiList,
  MuiListItem,
  MuiListItemIcon,
  MuiListItemText,
  MuiTab,
  MuiButton,
  MuiButtonBase,
};

const getOverrides = (themeVariant: string) => {
  const overrides: any = {};
  Object.keys(allVariantOverrides).forEach((key) => {
    const override = allVariantOverrides[key];
    const themeOverride = override[themeVariant] || override.light;
    overrides[key] = themeOverride;
  });

  return overrides;
};

export default getOverrides;
