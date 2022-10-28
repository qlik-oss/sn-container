import React, { useState, useEffect } from 'react';
import { Box, List, ListItem } from '@mui/material';
import BoxIcon from '../icons/Box';
import { StyledButton } from './common/styled';
import ContainerHandler from '../ext/containerHandler';

interface EmptyContaninerProps {
  containerModel: ContainerModel;
}

export default function EmptyContainer({ containerModel }: EmptyContaninerProps) {
  const { translator, model, visualizationApi } = containerModel;

  const [containerHandler, setContainerHandler] = useState(undefined);

  useEffect(() => {
    if (visualizationApi?.visualizations) {
      setContainerHandler(ContainerHandler(translator, visualizationApi));
    }
  }, [visualizationApi?.visualizations]);

  const handleAddChartButton = (event: any) => {
    console.log('event===', event);
    if (containerHandler) {
      containerHandler.addChild(model, event.target);
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
          <StyledButton sx={{ width: '250px' }} onClick={handleAddChartButton}>
            {translator.get('Object.Container.AddItem')}
          </StyledButton>
        </ListItem>
      </List>
    </Box>
  );
}
