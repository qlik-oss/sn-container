import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import TabPanel from './TabPanel';
import { COLORS } from '../theme/src/internal/variables';

type TODO = any;

export default function Container({ layout }: TODO) {
  const [tabValue, setTabValue] = useState(0);
  if (!layout) return null;

  const handleChange = (_event: Event, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box>
      <Tabs value={tabValue} onChange={handleChange}>
        {layout.children?.map((chart: TODO) => <Tab id={`container-tab-${chart.refId}`} label={<Typography color={COLORS.TEXT_PRIMARY}>{chart.label}</Typography>}></Tab>)}
      </Tabs>
      {layout.children?.map((chart: TODO, index: number) => <TabPanel value={chart.label} index={index}/>)}
    </Box>
  );
}
