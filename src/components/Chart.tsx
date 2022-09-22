import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

interface ChartProps {
  id: String;
  embed: Embed;
}

export default function Chart({ id, embed }: ChartProps) {
  const el = useRef();
  useEffect(() => {
    embed.render({
      id,
      element: el.current,
    });
  }, [id]);

  return (
    <Box
      ref={el}
      sx={{
        height: '100%',
        width: '100%',
      }}
    />
  );
}
