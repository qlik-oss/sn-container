import React, { useState, useEffect, useRef } from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import BoxIcon from '../icons/Box';
import { StyledButton } from './common/styled';
import ContainerHandler from '../ext/containerHandler';

interface EmptyContaninerProps {
  containerModel: ContainerModel;
}

export default function EmptyContainer({ containerModel }: EmptyContaninerProps) {
  const { translator, model, visualizationApi } = containerModel;

  const popupElementRef = useRef(null);
  const [containerHandler, setContainerHandler] = useState(undefined);

  useEffect(() => {
    if (visualizationApi?.visualizations) {
      setContainerHandler(ContainerHandler(translator, visualizationApi));
    }
  }, [visualizationApi?.visualizations]);

  const handleAddChartButton = () => {
    if (containerHandler) {
      containerHandler.addChild(model, popupElementRef.current);
    }
  };

  return (
    <Box
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <List>
        <ListItem sx={{ justifyContent: 'center' }}>
          <BoxIcon style={{ fontSize: '24px' }} />
        </ListItem>
        <ListItem>
          {containerModel.constraints?.active && (
            <StyledButton sx={{ width: '250px' }} onClick={handleAddChartButton}>
              <Typography variant="inherit">{translator.get('Object.Container.AddItem')}</Typography>
            </StyledButton>
          )}
          {!containerModel.constraints?.active && (
            <Box>
              <Typography variant="inherit">{translator.get('Object.Container.EmptyHint')}</Typography>
            </Box>
          )}
        </ListItem>
      </List>
      <Box ref={popupElementRef} />
    </Box>
  );
}
