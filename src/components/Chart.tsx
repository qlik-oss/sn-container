import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface ChartComponentProps {
  chart: ChartObject;
  containerModel: ContainerModel;
}

export default function Chart({ chart, containerModel }: ChartComponentProps) {
  const { embed, app, options, layoutService } = containerModel;
  const el = useRef();
  const direction = options.direction;
  const layout = layoutService.getLayout();
  const chartOptions: EmbedOptions = {
    direction,
    isReadonly: false,
    isPopover: false,
    navigation: true,
    selections: true,
  };

  const style: EmbedStyle = {
    height: '100%',
    width: '100%',
    border: 'unset',
  };

  useEffect(() => {
    const chartId = chart.qInfo.qId;
    app.getObject(chartId).then((model) => {
      embed.render({
        id: chartId,
        element: el.current,
        options: chartOptions,
        model,
        style,
      });
    });
  }, [chart.qInfo.qId]);

  return (
    <Box
      ref={el}
      sx={{
        '.qv-object-wrapper .qv-object.qvt-visualization': {
          border: layout.borders !== 'noBorder' ? '' : 'unset !important',
        },
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
    />
  );
}
