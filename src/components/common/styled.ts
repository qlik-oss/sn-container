import { Button, Tab, styled, Box, ListItemButton } from '@mui/material';
import React from 'react';
import { GREYSCALE } from '../../theme/src/internal/variables';

export const NavigationButton = styled(Button)(() => ({
  border: `1px solid ${GREYSCALE.GREYSCALE_70}`,
  padding: '0px 9px',
  color: GREYSCALE.GREYSCALE_35,
  height: 28,
  borderRadius: 3,
  minWidth: 36,
  maxWidth: 36,
})) as React.ElementType;

export const TabButton = styled(Tab)(() => ({
  minHeight: 'unset',
  padding: '8px 8px 10px 16px',
  fontFamily: 'inherit',
  maxWidth: 200,
  minWidth: 100,
  flex: '1 1 0',
  alignItems: 'flex-start',
  height: 38,
  '&:hover': {
    paddingBottom: 8,
  },
})) as React.ElementType;

export const TextContainer = styled(Box)(() => ({
  textAlign: 'left',
  width: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
})) as React.ElementType;

export const PopoverListItemButton = styled(ListItemButton)({
  wordBreak: 'break-word',
  minHeight: '24px',
  padding: '4px 4px 4px 12px',
}) as React.ElementType;
