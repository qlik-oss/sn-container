import React, { useState, useEffect } from 'react';
import ItemPopover from '../common/ItemPopover';

type ChartType = {
  values: ChartOfAnyType[];
  translation: string;
};

interface AddChartWrapperProps {
  target: Element | null;
  items: ChartType[];
  onSelect: (event: HTMLLIElement, item: ChartOfAnyType) => void;
  key: string;
}

export default function AddChartWrapper({ target, key, items, onSelect }: AddChartWrapperProps) {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  useEffect(() => {
    setAnchorEl(target);
  }, [key]);
  const onClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnChart = (event: HTMLLIElement, chart: ChartOfAnyType) => {
    onSelect(event, chart);
    onClose();
  };

  return <ItemPopover onSelect={handleClickOnChart} onClose={onClose} anchorEl={anchorEl} items={items} />;
}
