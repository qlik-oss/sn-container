import React from 'react';
import { StyledButton } from './common/styled';
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
      <StyledButton
        onClick={(e: any) => handleChange(e, tabValue - 1)}
        sx={{
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          ...(isFirstTabSelected && { opacity: 0.6, cursor: 'default', pointerEvents: 'none' }),
        }}
      >
        <PreviousIcon />
      </StyledButton>
      <StyledButton
        onClick={(e: any) => handleChange(e, tabValue + 1)}
        sx={{
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          ...(isLastTabSelected && { opacity: 0.6, cursor: 'default', pointerEvents: 'none' }),
        }}
      >
        <NextIcon />
      </StyledButton>
    </>
  );
}
