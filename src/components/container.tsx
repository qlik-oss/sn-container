import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { COLORS } from '../theme/src/internal/variables';

type TODO = any;

interface TabPanelProps {
  children?: TODO;
  index: number;
  value: number;
}

export default function Container({ layout }: TODO) {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (_event: Event, newValue: number) => {
    setTabValue(newValue);
  };
  const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  };
  if (!layout) return null;
  return (
    <Box>
      <Tabs value={tabValue} onChange={handleChange}>
        {layout.children?.map((chart: TODO) => <Tab id={`container-tab-${chart.refId}`} label={<Typography color={COLORS.TEXT_PRIMARY}>{chart.label}</Typography>}></Tab>)}
      </Tabs>
      {layout.children?.map((chart: TODO, index: number) => <TabPanel value={chart.label} index={index}/>)}
    </Box>
  );
}
