import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import TabPanel from './TabPanel';
import Chart from './Chart';
import { COLORS } from '../theme/src/internal/variables';

type TODO = any;

interface CotaninerProps {
  containerModel: ContainerModel;
}

export default function Container({ containerModel }: CotaninerProps) {
  const [tabValue, setTabValue] = useState(0);
  const layout = containerModel.layoutService.getLayout();
  if (!layout) return null;

  const handleChange = (_event: any, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <Box
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <Tabs value={tabValue} onChange={handleChange}>
        {layout.children?.map((chart: TODO) => (
          <Tab
            id={`container-tab-${chart.refId}`}
            key={chart.refId}
            sx={{ fontFamily: 'inherit', maxWidth: 200, minWidth: 100, flex: '1 1 0', alignItems: 'flex-start' }}
            label={
              <Typography variant="inherit" fontSize="13px" color={COLORS.TEXT_PRIMARY}>
                {chart.label}
              </Typography>
            }
          ></Tab>
        ))}
      </Tabs>
      {layout.qChildList?.qItems.map((chart: TODO, index: number) => (
        <TabPanel value={tabValue} index={index} key={chart.qInfo.qId}>
          <Chart chart={chart} containerModel={containerModel} />
        </TabPanel>
      ))}
    </Box>
  );
}
