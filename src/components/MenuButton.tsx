import React, { useState } from 'react';
import { Popover, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import { NavigationButton, PopoverListItemButton } from './common/styled';
import UnorderedListIcon from '../icons/UnorderedList';
import CheckboxTickIcon from '../icons/CheckboxTick';
import { COLORS } from '../theme/src/internal/variables';

interface MenuButtonProps {
  layout: Layout;
  chartObjects: MergedLayoutChild[];
  tabValue: number;
  handleChange: (event: any, newTabValue: number) => void;
}

export default function MenuButton({ layout, chartObjects, tabValue, handleChange }: MenuButtonProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handlePopoverOpen = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnChart = (event: any, index: number) => {
    handleChange(event, index);
    handlePopoverClose();
  };

  return (
    <>
      <NavigationButton
        sx={{ marginLeft: layout.useScrollButton !== false ? '4px' : '0px' }}
        onClick={handlePopoverOpen}
      >
        <UnorderedListIcon />
      </NavigationButton>
      <Popover
        onClose={handlePopoverClose}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        elevation={8}
        sx={{ border: '1px solid #E9E9E9', fontFamily: 'inherit' }}
        PaperProps={{ style: { width: '230px' } }}
      >
        <List>
          {chartObjects.map((chart, index) => (
            <PopoverListItemButton
              component="li"
              onClick={(e: any) => handleClickOnChart(e, index)}
              key={chart.cId}
              title={chart.label}
            >
              <ListItem component="div" sx={{ p: 0, height: 'auto', flex: '1 1 0' }}>
                <Typography variant="inherit" component="span" fontSize="14px" color={COLORS.TEXT_PRIMARY}>
                  {chart.label}
                </Typography>
              </ListItem>
              <ListItemIcon sx={{ minWidth: 'unset', margin: 0, ...(tabValue !== index && { visibility: 'hidden' }) }}>
                <CheckboxTickIcon />
              </ListItemIcon>
            </PopoverListItemButton>
          ))}
        </List>
      </Popover>
    </>
  );
}
