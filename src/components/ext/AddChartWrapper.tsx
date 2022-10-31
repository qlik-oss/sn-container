import React, { useState, useEffect } from 'react';
import ItemPopover from '../common/ItemPopover';

type TODO = any;

type ChartType = {
  values: TODO[];
  translation: string;
};

interface AddChartWrapperProps {
  target: Element | null;
  items: ChartType[];
  onSelect: (event: any, item: TODO) => void;
  key: string;
}

export default function AddChartWrapper({ target, key, items, onSelect }: AddChartWrapperProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  useEffect(() => {
    setAnchorEl(target);
  }, [key]);
  const onClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnChart = (event: any, chart: TODO) => {
    onSelect(event, chart);
    onClose();
  };

  return <ItemPopover onSelect={handleClickOnChart} onClose={onClose} anchorEl={anchorEl} items={items} />;
}
