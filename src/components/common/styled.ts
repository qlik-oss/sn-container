/* eslint-disable @typescript-eslint/naming-convention */

import React from 'react';
import { Button, Tab, styled, ListItem, ListItemButton, Typography } from '@mui/material';
import { GREYSCALE } from '../../theme/src/internal/variables';

export const StyledButton = styled(Button)(() => ({
  border: `1px solid ${GREYSCALE.GREYSCALE_70}`,
  padding: '0px 9px',
  color: GREYSCALE.GREYSCALE_35,
  height: 28,
  borderRadius: 3,
  minWidth: 36,
})) as React.ElementType;

export const TabButton = styled(Tab)(() => ({
  padding: '8px 12px 10px 12px',
  fontFamily: 'inherit',
  alignItems: 'flex-start',
  minHeight: 'unset !important', // to avoid override from sprout-focus-visible
  height: 38,
  maxWidth: 200,
  minWidth: 100,
  '&:hover': {
    paddingBottom: 8,
  },
  '&:focus-visible': {
    padding: '6px 12px 8px 12px !important', // to avoid override from sprout-focus-visible
  },
})) as React.ElementType;

export const TextContainer = styled(Typography)(() => ({
  display: 'block',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  textAlign: 'left',
  flex: '1 1 0',
})) as React.ElementType;

export const PopoverListItemButton = styled(ListItemButton)({
  wordBreak: 'break-word',
  minHeight: '24px',
  padding: '4px 4px 4px 12px',
}) as React.ElementType;

export const PopoverListItem = styled(ListItem)({
  minHeight: '24px',
  height: '24px',
  padding: '0px 8px',
  fontSize: '12px',
  fontWeight: 'bold',
  borderBottom: '1px solid #E2E2E2',
}) as React.ElementType;
