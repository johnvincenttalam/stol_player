import React, { useRef, useState, useEffect } from 'react';

import { Box, Typography } from '@mui/material';

interface MarqueeBoxProps {
  text: string;
  speed?: number; // seconds it takes to complete one full scroll
}

export const MarqueeBox: React.FC<MarqueeBoxProps> = ({ text, speed = 20 }) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, [text]);

  return (
    <Box
      sx={{
        overflow: 'hidden',
        backgroundColor: '#D4070F',
        color: 'white',
        borderRadius: { sm: 0, lg: 1 },
        py: 1,
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          animation: `marquee ${speed}s linear infinite`,
          width: textWidth * 2, // move full text width * 2
          '&:hover': {
            animationPlayState: 'paused',
          },
        }}
      >
        {/* Content duplicated for seamless loop */}
        <Box
          ref={textRef}
          sx={{
            display: 'inline-block',
            px: 2,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          <Typography variant="caption" color="white">
            {text}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'inline-block',
            px: 2,
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          <Typography variant="caption" color="white">
            {text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
