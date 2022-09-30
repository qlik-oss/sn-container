import React from 'react';
import { NavigationButton } from './common/styled';
import NextIcon from '../icons/Next';
import PreviousIcon from '../icons/Previous';

interface ScrollButtonsProps {
  tabValue: number;
  setTabValue: (newTabValue: number) => void;
  chartObjects: ChartObject[];
}

export default function ScrollButtons({ tabValue, setTabValue, chartObjects }: ScrollButtonsProps) {
  const isFirstTabSelected = !tabValue;
  const isLastTabSelected = tabValue >= chartObjects.length - 1;
  return (
    <>
      <NavigationButton
        onClick={() => !isFirstTabSelected && setTabValue(tabValue - 1)}
        sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, ...(isFirstTabSelected && { opacity: 0.6 }) }}
      >
        <PreviousIcon />
      </NavigationButton>
      <NavigationButton
        onClick={() => !isLastTabSelected && setTabValue(tabValue + 1)}
        sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, ...(isLastTabSelected && { opacity: 0.6 }) }}
      >
        <NextIcon />
      </NavigationButton>
    </>
  );
}
