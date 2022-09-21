import React from 'react';
import { Box } from '@mui/material';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import Container from './Container';
import getTheme from '../theme/src';

interface RootProps {
  models: {
    containerModel: ContainerModel;
  };
}

export default function Root({ models }: RootProps) {
  const rootStyle = {
    height: '100%',
    width: '100%',
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(getTheme())}>
        <Box className="container-root" style={rootStyle}>
          <Container containerModel={models.containerModel} />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
