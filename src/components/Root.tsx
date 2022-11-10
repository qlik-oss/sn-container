import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import Container from './Container';
import getTheme from '../theme/src';
import masterObjectList from '../utils/master-object-list';

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

  useEffect(() => {
    models.containerModel.app.getMasterObjectList().then((masterObjects) => {
      masterObjectList.loadMasterObjectList(masterObjects);
    });
  }, [models.containerModel.app]);

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
