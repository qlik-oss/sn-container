import React, { useState } from 'react';
import { Tabs, Box, Typography } from '@mui/material';
import { TabButton, TextContainer } from './common/styled';
import ScrollButtons from './ScrollButtons';
import MenuButton from './MenuButton';
import TabPanel from './TabPanel';
import Chart from './Chart';
import { COLORS } from '../theme/src/internal/variables';

interface CotaninerProps {
  containerModel: ContainerModel;
}

const mockedLayout: any = {
  qInfo: {
    qId: 'GYkrkKt',
    qType: 'container',
  },
  qMeta: {
    privileges: ['read', 'update', 'delete', 'exportdata'],
  },
  qSelectionInfo: {},
  children: [
    {
      refId: '700c5c46-acce-4f79-b482-7939818d05fb',
      label: 'barbull',
      isMaster: true,
    },
    {
      refId: 'GmJHVvD',
      label: 'Pie chartwith',
      isMaster: false,
      cId: 'JyrDhv',
    },
    {
      refId: 'GmJHVvD',
      label: 'Pie chartwith 2',
      isMaster: false,
      cId: 'JyrDhv',
    },
    {
      refId: 'GmJHVvD',
      label: 'Pie chart 3',
      isMaster: false,
      cId: 'JyrDhv',
    },
    {
      refId: 'GmJHVvD',
      label: 'Pie chartwith a veryveryveryveryveryveryveryveryveryvery',
      isMaster: false,
      cId: 'JyrDhv',
    },
  ],
  showTitles: false,
  title: '',
  subtitle: '',
  footnote: '',
  disableNavMenu: false,
  showDetails: false,
  showDetailsExpression: false,
  borders: 'auto',
  showTabs: true,
  useDropdown: true,
  useScrollButton: true,
  showIcons: false,
  activeTab: 'a21c88de-3d72-4712-8e7c-5f6e32ddb958',
  defaultTab: '',
  visualization: 'container',
  qChildList: {
    qItems: [
      {
        qInfo: {
          qId: 'c8b39d19-d5dc-481c-8c96-b16ec9daf8f6',
          qType: 'sn-bullet-chart',
        },
        qMeta: {
          privileges: ['read', 'update', 'delete', 'exportdata'],
        },
        qData: {
          title: 'tieleee',
          visualization: 'sn-bullet-chart',
          containerChildId: '',
          qExtendsId: '700c5c46-acce-4f79-b482-7939818d05fb',
          showCondition: '',
        },
      },
      {
        qInfo: {
          qId: '0c691b1e-107a-48ce-8a40-8559cae56727',
          qType: 'piechart',
        },
        qMeta: {
          privileges: ['read', 'update', 'delete', 'exportdata'],
        },
        qData: {
          title: '',
          visualization: 'piechart',
          containerChildId: 'GmJHVvD',
          qExtendsId: '',
          showCondition: '',
        },
      },
      {
        qInfo: {
          qId: '0c691b1e-107a-48ce-8a40-8559cae56727',
          qType: 'piechart',
        },
        qMeta: {
          privileges: ['read', 'update', 'delete', 'exportdata'],
        },
        qData: {
          title: '',
          visualization: 'piechart',
          containerChildId: 'GmJHVvD',
          qExtendsId: '',
          showCondition: '',
        },
      },
      {
        qInfo: {
          qId: '0c691b1e-107a-48ce-8a40-8559cae56727',
          qType: 'piechart',
        },
        qMeta: {
          privileges: ['read', 'update', 'delete', 'exportdata'],
        },
        qData: {
          title: '',
          visualization: 'piechart',
          containerChildId: 'GmJHVvD',
          qExtendsId: '',
          showCondition: '',
        },
      },
    ],
  },
  supportRefresh: false,
  hasExternalChildren: false,
  qHasSoftPatches: true,
};

export default function Container({ containerModel }: CotaninerProps) {
  const layout = containerModel.layoutService.getLayout();
  if (!layout) return null;
  const [tabValue, setTabValue] = useState(
    layout.defaultTab
      ? mockedLayout.qChildList?.qItems.findIndex((child: QChild) => child.qInfo.qId === layout.defaultTab)
      : 0
  );

  const chartObjects: ChartObject[] = [];
  mockedLayout.children?.map((child: PropertiesChild) => {
    const childListItem = mockedLayout.qChildList?.qItems.find((innerItem: any) =>
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
                      {chart.label}
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
