import React, { useState, useEffect } from 'react';
import { Tabs, Box, Typography } from '@mui/material';
import { TabButton, TextContainer } from './common/styled';
import ScrollButtons from './ScrollButtons';
import MenuButton from './MenuButton';
import TabPanel from './TabPanel';
import Chart from './Chart';
import ViewDisabledIcon from '../icons/ViewDisabled';
import { COLORS } from '../theme/src/internal/variables';
import containerUtil from '../utils/container-util';
import { getMergedChildrenList } from '../utils/container-items';

interface CotaninerProps {
  containerModel: ContainerModel;
}

const findIndexOfChild = (layout: Layout, value: string) => {
  const childIndex = layout.qChildList?.qItems.findIndex((child: QChild) => child.qInfo.qId === value);
  return childIndex !== -1 ? childIndex : 0;
};

export default function Container({ containerModel }: CotaninerProps) {
  const layout = containerModel.layoutService.getLayout();
  if (!layout) return null;
  const initialTabValue = layout.activeTab && layout.activeTab !== '' ? layout.activeTab : layout.defaultTab;
  const [tabValue, setTabValue] = useState(initialTabValue ? findIndexOfChild(layout, initialTabValue) : 0);

  useEffect(() => {
    const childIndex = findIndexOfChild(layout, layout.activeTab ?? '');
    if (childIndex !== tabValue) {
      setTabValue(childIndex);
    }
  }, [layout.activeTab]);

  const [chartObjects, setChartObjects] = useState(getMergedChildrenList(layout, !containerModel.constraints.active));

  useEffect(() => {
    setChartObjects(getMergedChildrenList(layout, !containerModel.constraints.active));
  }, [layout.children, layout.qChildList]);

  const handleChange = (_event: any, newValue: number) => {
    setTabValue(newValue);
    containerUtil.applySoftPatches(containerModel.model, layout.qChildList.qItems[newValue]?.qInfo.qId, 'activeTab');
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
                        containerModel.visualizations
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
