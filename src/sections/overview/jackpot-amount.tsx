import React, { useState, useEffect } from 'react';

import { Box, Typography } from '@mui/material';

export const JackpotDisplay: React.FC = () => {
  const [jackpot, setJackpot] = useState(99999999.00);
  const [displayJackpot, setDisplayJackpot] = useState(99999999.00);

  useEffect(() => {
    const interval = setInterval(() => {
      setJackpot(prev => prev + Math.random() * 100 + 10);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Smooth counter animation
  useEffect(() => {
    const startValue = displayJackpot;
    const endValue = jackpot;
    const duration = 5000; // 2.5 second animation
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for more realistic animation
      const easeOut = 1 - Math.pow(1 - progress, 2);
      const currentValue = startValue + (endValue - startValue) * easeOut;
      
      setDisplayJackpot(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    if (startValue !== endValue) {
      animate();
    }
  }, [jackpot, displayJackpot]);

  const formatJackpot = (amount: number): string =>
    amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  return (
    <Box
      sx={{
        backgroundImage: `url('/assets/images/stol/jackpot.png')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        mx: 'auto',
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: { xs: '130px', sm: '150px', md: '180px' },
        mb: 5,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: '90px',
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          zIndex: 1,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            color: '#FFD700',
            textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
            fontFamily: 'monospace', // For consistent digit spacing
            fontSize: { xs: '1.6rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          {formatJackpot(displayJackpot)}
        </Typography>
      </Box>
    </Box>
  );
};