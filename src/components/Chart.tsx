import React, { useEffect, useRef } from 'react';

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
    <div
      ref={el}
      style={{
        height: '100%',
        width: '100%',
      }}
    />
  );
}
