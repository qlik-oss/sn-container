import React from 'react';
import { Box, Typography } from '@mui/material';

type TODO = any;

interface TabPanelProps {
  children?: TODO;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      style={{
        height: 'calc(100% - 48px)',
        width: '100%',
      }}
      {...other}
    >
      {value === index && (
        <Box
          p={3}
          style={{
            height: '100%',
            width: '100%',
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
