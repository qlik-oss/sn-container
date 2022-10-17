import React, { useState } from 'react';
import ItemPopover from '../common/ItemPopover';

type TODO = any;

type ChartType = {
  values: TODO[];
  translation: string;
};

interface AddChartWrapperProps {
  target: HTMLElement | null;
  items: ChartType[];
  onSelect: (event: any, item: TODO) => void;
}

export default function AddChartWrapper({ target, items, onSelect }: AddChartWrapperProps) {
  const [anchorEl, setAnchorEl] = useState(target);
  const onClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnChart = (event: any, chart: TODO) => {
    onSelect(event, chart);
    onClose();
  };

  return <ItemPopover onSelect={handleClickOnChart} onClose={onClose} anchorEl={anchorEl} items={items} />;
}
