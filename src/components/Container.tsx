import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Button } from '@mui/material';
import TabPanel from './TabPanel';
import Chart from './Chart';
import NextIcon from '../icons/Next';
import PreviousIcon from '../icons/Previous';
import UnorderedListIcon from '../icons/UnorderedList';
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
      cId: 'LpPpcBz',
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
          qId: 'a21c88de-3d72-4712-8e7c-5f6e32ddb958',
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
    ],
  },
  supportRefresh: false,
  hasExternalChildren: false,
  qHasSoftPatches: true,
};

export default function Container({ containerModel }: CotaninerProps) {
  const layout = containerModel.layoutService.getLayout();
  const [tabValue, setTabValue] = useState(
    layout.defaultTab
      ? mockedLayout.qChildList?.qItems.findIndex((child: QChild) => child.qInfo.qId === layout.defaultTab)
      : 0
  );
  if (!layout) return null;

  const children: ChartObject[] = [];
  mockedLayout.children?.map((child: LayoutChild) => {
    const childListItem = mockedLayout.qChildList?.qItems.find((innerItem: any) =>
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
      {layout.showTabs !== false && (
        <Box>
          {layout.useScrollButton && (
            <>
              <Button>
                <PreviousIcon />
              </Button>
              <Button>
                <NextIcon />
              </Button>
            </>
          )}
          {layout.useDropdown && (
            <Button sx={{ paddingLeft: layout.useScrollButton ? 4 : 0 }}>
              <UnorderedListIcon />
            </Button>
          )}
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
        </Box>
      )}
      {children.map(
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
