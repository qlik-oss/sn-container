import React, { useState } from 'react';
import { Tabs, Box, Typography } from '@mui/material';
import { TabButton, TextContainer } from './common/styled';
import ScrollButtons from './ScrollButtons';
import MenuButton from './MenuButton';
import TabPanel from './TabPanel';
import Chart from './Chart';
import { COLORS } from '../theme/src/internal/variables';
import containerUtil from '../utils/container-util';

interface CotaninerProps {
  containerModel: ContainerModel;
}

export default function Container({ containerModel }: CotaninerProps) {
  const layout = containerModel.layoutService.getLayout();
  if (!layout) return null;
  const [tabValue, setTabValue] = useState(
    layout.defaultTab
      ? layout.qChildList?.qItems.findIndex((child: QChild) => child.qInfo.qId === layout.defaultTab)
      : 0
  );

  const chartObjects: ChartObject[] = [];
  layout.children?.map((child: PropertiesChild) => {
    const childListItem = layout.qChildList?.qItems.find((innerItem: any) =>
      child.isMaster ? innerItem.qData.qExtendsId === child.refId : innerItem.qData.containerChildId === child.refId
    );
    if (childListItem) {
      chartObjects.push({ ...child, ...childListItem });
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
      {layout.showTabs !== false && (
        <Box display="flex" alignItems="center">
          {layout.useScrollButton !== false && (
            <ScrollButtons chartObjects={chartObjects} tabValue={tabValue} setTabValue={setTabValue} />
          )}
          {layout.useDropdown !== false && (
            <MenuButton layout={layout} chartObjects={chartObjects} tabValue={tabValue} setTabValue={setTabValue} />
          )}
          <Tabs value={tabValue} onChange={handleChange} sx={{ display: 'inline-flex', minHeight: 'unset' }}>
            {chartObjects.map((chart: ChartObject) => (
              <TabButton
                id={`container-tab-${chart.refId}`}
                data-testid={`container-tab-${chart.refId}`}
                key={chart.refId}
                label={
                  <TextContainer>
                    <Typography
                      variant="inherit"
                      component="span"
                      fontSize="13px"
                      color={COLORS.TEXT_PRIMARY}
                      whiteSpace="nowrap"
                    >
                      {containerUtil.getTranslationFromChild(chart, containerModel.translator)}
                    </Typography>
                  </TextContainer>
                }
              ></TabButton>
            ))}
          </Tabs>
        </Box>
      )}
      {chartObjects.map(
        (chart: ChartObject, index: number) =>
          chart.qInfo && (
            <TabPanel data-testid={`tab-panel-${chart.refId}`} value={tabValue} activeTab={index} key={chart.qInfo.qId}>
              <Chart chart={chart} containerModel={containerModel} />
            </TabPanel>
          )
      )}
    </Box>
  );
}
