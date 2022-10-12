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

  let border = '';
  if (layout.borders === 'noBorder') {
    border = 'unset !important';
  } else if (layout.borders === 'border') {
    border = '1px solid rgba(0, 0, 0, 0.1) !important';
  }

  return (
    <Box
      ref={el}
      sx={{
        '.qv-object-wrapper .qv-object.qvt-visualization': {
          border,
        },
        position: 'relative',
        height: '100%',
        width: '100%',
      }}
    />
  );
}
