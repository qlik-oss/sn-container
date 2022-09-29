import React from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
  children?: any;
  activeTab: number;
  value: number | undefined;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, activeTab, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== activeTab}
      id={`simple-tabpanel-${activeTab}`}
      sx={{
        height: 'calc(100% - 48px)',
        width: '100%',
      }}
      {...other}
    >
      {value === activeTab && (
        <Box
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          {children}
        </Box>
      )}
    </Box>
  );
};

export default TabPanel;
