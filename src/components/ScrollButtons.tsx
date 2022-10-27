import React from 'react';
import { NavigationButton } from './common/styled';
import NextIcon from '../icons/Next';
import PreviousIcon from '../icons/Previous';

interface ScrollButtonsProps {
  chartObjects: MergedLayoutChild[];
  tabValue: number;
  handleChange: (event: any, newTabValue: number) => void;
}

export default function ScrollButtons({ chartObjects, tabValue, handleChange }: ScrollButtonsProps) {
  const isFirstTabSelected = !tabValue;
  const isLastTabSelected = tabValue >= chartObjects.length - 1;
  return (
    <>
      <NavigationButton
        onClick={(e: any) => handleChange(e, tabValue - 1)}
        sx={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          ...(isFirstTabSelected && { opacity: 0.6, cursor: 'default', pointerEvents: 'none' }),
        }}
      >
        <PreviousIcon />
      </NavigationButton>
      <NavigationButton
        onClick={(e: any) => handleChange(e, tabValue + 1)}
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          ...(isLastTabSelected && { opacity: 0.6, cursor: 'default', pointerEvents: 'none' }),
        }}
      >
        <NextIcon />
      </NavigationButton>
    </>
  );
}
