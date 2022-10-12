import React from 'react';
import { Popover, List, ListItem, Typography } from '@mui/material';
import { PopoverListItem, PopoverListItemButton } from '../common/styled';
import { COLORS } from '../../theme/src/internal/variables';

type ItemType = {
  values: any[];
  translation: string;
};

interface ItemPopoverProps {
  anchorEl: HTMLElement | null;
  onClose(): void;
  onSelect: (event: any, item: any) => void;
  items: ItemType[];
}

export default function ItemPopover({ anchorEl, onClose, onSelect, items }: ItemPopoverProps) {
  return (
    <Popover
      onClose={onClose}
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
      PaperProps={{ style: { width: 230, height: 250 } }}
    >
      <List>
        {items.map((itemType) => (
          <>
            <PopoverListItem>
              {' '}
              <span title={itemType.translation}>{itemType.translation}</span>
            </PopoverListItem>
            {itemType.values.map((item) => (
              <PopoverListItemButton
                component="li"
                onClick={(e: any) => onSelect(e, item)}
                key={item.name}
                title={item.name}
              >
                <ListItem component="div" sx={{ p: 0, height: 'auto', flex: '1 1 0' }}>
                  <Typography variant="inherit" component="span" fontSize="14px" color={COLORS.TEXT_PRIMARY}>
                    {item.name}
                  </Typography>
                </ListItem>
              </PopoverListItemButton>
            ))}
          </>
        ))}
      </List>
    </Popover>
  );
}
