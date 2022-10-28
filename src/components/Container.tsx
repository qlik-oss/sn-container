import React, { useState, useEffect } from 'react';
import { Tabs, Box, Typography } from '@mui/material';
import { TabButton, TextContainer } from './common/styled';
import ScrollButtons from './ScrollButtons';
import MenuButton from './MenuButton';
import TabPanel from './TabPanel';
import Chart from './Chart';
import EmptyContainer from './EmptyContainer';
import ViewDisabledIcon from '../icons/ViewDisabled';
import { COLORS } from '../theme/src/internal/variables';
import containerUtil from '../utils/container-util';
import { getMergedChildrenList } from '../utils/container-items';

interface ContainerProps {
  containerModel: ContainerModel;
}

const findIndexOfChild = (chartObjects: MergedLayoutChild[], value: string) => {
  const childIndex = chartObjects.findIndex((child: QChild) => child.qInfo.qId === value);
  return childIndex !== -1 ? childIndex : 0;
};

export default function Container({ containerModel }: ContainerProps) {
  const layout = containerModel.layoutService.getLayout();
  if (!layout) return null;
  const [chartObjects, setChartObjects] = useState(getMergedChildrenList(layout, !containerModel.constraints.active));
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const initialTabValue = layout.activeTab && layout.activeTab !== '' ? layout.activeTab : layout.defaultTab;
    const childIndex = findIndexOfChild(chartObjects, initialTabValue ?? '');
    if (childIndex !== tabValue) {
      setTabValue(childIndex !== -1 ? childIndex : 0);
    }
  }, [layout.activeTab]);

  useEffect(() => {
    setChartObjects(getMergedChildrenList(layout, !containerModel.constraints.active));
  }, [layout.children, layout.qChildList]);

  const handleChange = (_event: any, newValue: number) => {
    setTabValue(newValue);
    containerUtil.applySoftPatches(containerModel.model, layout.qChildList.qItems[newValue]?.qInfo.qId, 'activeTab');
  };

  const isContainerEmpty = chartObjects.length === 0;

  return (
    <Box
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      {isContainerEmpty && <EmptyContainer containerModel={containerModel} />}
      {!isContainerEmpty && layout.showTabs !== false && (
        <Box display="flex" alignItems="center">
          {layout.useScrollButton !== false && (
            <ScrollButtons chartObjects={chartObjects} tabValue={tabValue} handleChange={handleChange} />
          )}
          {layout.useDropdown !== false && (
            <MenuButton layout={layout} chartObjects={chartObjects} tabValue={tabValue} handleChange={handleChange} />
          )}
          <Tabs value={tabValue} onChange={handleChange} sx={{ display: 'inline-flex', minHeight: 'unset' }}>
            {chartObjects.map((chart: MergedLayoutChild) => (
              <TabButton
                id={`container-tab-${chart.refId}`}
                data-testid={`container-tab-${chart.refId}`}
                key={chart.refId}
                label={
                  <Box display="flex" width="100%">
                    <TextContainer
                      variant="inherit"
                      component="span"
                      fontSize="13px"
                      color={COLORS.TEXT_PRIMARY}
                      whiteSpace="nowrap"
                    >
                      {containerUtil.getTranslationFromChild(
                        chart,
                        containerModel.translator,
                        containerModel.visualizationApi?.visualizations
                      )}
                    </TextContainer>
                    {!chart.visible && (
                      <Typography variant="inherit" component="span" color={COLORS.TEXT_PRIMARY} paddingLeft="8px">
                        <ViewDisabledIcon />
                      </Typography>
                    )}
                  </Box>
                }
              ></TabButton>
            ))}
          </Tabs>
        </Box>
      )}
      {chartObjects.map(
        (chart: MergedLayoutChild, index: number) =>
          chart.qInfo && (
            <TabPanel data-testid={`tab-panel-${chart.refId}`} value={tabValue} activeTab={index} key={chart.qInfo.qId}>
              <Chart chart={chart} containerModel={containerModel} />
            </TabPanel>
          )
      )}
    </Box>
  );
}
