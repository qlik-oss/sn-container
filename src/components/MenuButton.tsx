import React from 'react';
import { NavigationButton } from './common/styled';
import UnorderedListIcon from '../icons/UnorderedList';

interface MenuButtonProps {
  layout: Layout;
}

export default function MenuButton({ layout }: MenuButtonProps) {
  return (
    <NavigationButton sx={{ marginLeft: layout.useScrollButton !== false ? '4px' : '0px' }}>
      <UnorderedListIcon />
    </NavigationButton>
  );
}
