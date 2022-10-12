import React, { useState } from 'react';
import ItemPopover from '../common/ItemPopover';

type ChartType = {
  values: MasterObject[];
  translation: string;
};

interface AddChartPopOverProps {
  target: HTMLElement | null;
  items: ChartType[];
  onSelect: (event: any, item: MasterObject) => void;
}

export default function AddChartPopOver({ target, items, onSelect }: AddChartPopOverProps) {
  console.log('items===', items);
  const [anchorEl, setAnchorEl] = useState(target);
  const onClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnChart = (event: any, chart: MasterObject) => {
    onSelect(event, chart);
    onClose();
  };

  return <ItemPopover onSelect={handleClickOnChart} onClose={onClose} anchorEl={anchorEl} items={items} />;
}
