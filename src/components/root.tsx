import React from 'react';
import { Box } from '@mui/material';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import Container from './Container';
import getTheme from '../theme/src';

interface RootProps {
  models: {
    containerModel: ContainerModel;
  }
};

export default function Root({models}: RootProps) {
  const rootStyle = {
    height: '100%',
    width: '100%',
  };
  const testLayout = { children: [{id: 0, label: 'BarChart'}, {id: 1, label: 'PieChart'}]};

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(getTheme())}>
        <Box className="container-root" style={rootStyle}>
          <Container layout={testLayout ?? models.containerModel.layoutService.getLayout()} />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
