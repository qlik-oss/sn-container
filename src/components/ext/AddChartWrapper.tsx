import React, { useState } from 'react';
import ItemPopover from '../common/ItemPopover';

type TODO = any;

type ChartType = {
  values: TODO[];
  translation: string;
};

interface AddChartPopOverProps {
  target: HTMLElement | null;
  items: ChartType[];
  onSelect: (event: any, item: TODO) => void;
}

export default function AddChartPopOver({ target, items, onSelect }: AddChartPopOverProps) {
  console.log('items===', items);
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
