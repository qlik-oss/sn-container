import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import TabPanel from './TabPanel';
import Chart from './Chart';
import { COLORS } from '../theme/src/internal/variables';

interface CotaninerProps {
  containerModel: ContainerModel;
}

export default function Container({ containerModel }: CotaninerProps) {
  const [tabValue, setTabValue] = useState(0);
  const layout = containerModel.layoutService.getLayout();
  if (!layout) return null;

  const children: ChartObject[] = [];
  layout.children?.map((child: LayoutChild) => {
    const childListItem = layout.qChildList?.qItems.find((innerItem) =>
      child.isMaster ? innerItem.qData.qExtendsId === child.refId : innerItem.qData.containerChildId === child.refId
    );
    if (childListItem) {
      children.push({ ...child, ...childListItem });
    }
  });

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
        {children.map((chart: ChartObject) => (
          <Tab
            id={`container-tab-${chart.refId}`}
            data-testid={`container-tab-${chart.refId}`}
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
      {children.map(
        (chart: ChartObject, index: number) =>
          chart.qInfo && (
            <TabPanel data-testid={`tab-panel-${chart.refId}`} value={tabValue} index={index} key={chart.qInfo.qId}>
              <Chart chart={chart} containerModel={containerModel} />
            </TabPanel>
          )
      )}
    </Box>
  );
}
