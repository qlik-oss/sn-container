import React from 'react';
import { Box } from '@mui/material';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import Container from './container';
import getTheme from '../theme/src';

type TODO = any;

interface RootProps {
  layout: TODO;
};

export default function Root({layout}: RootProps) {
  const rootStyle = {
    height: '100%',
    width: '100%',
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={createTheme(getTheme())}>
        <Box className="container-root" style={rootStyle}>
          <Container layout={layout} />
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
