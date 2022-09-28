import React from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
  children?: any;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      sx={{
        height: 'calc(100% - 48px)',
        width: '100%',
      }}
      {...other}
    >
      {value === index && (
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
