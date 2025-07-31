import React from 'react';

import { Box, Typography } from '@mui/material';

export const JackpotDisplay: React.FC = () => (
  <Box
    sx={{
      backgroundImage: `url('/assets/images/stol/jackpot.png')`, // optional background image
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      mx: 'auto',
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '120px',
    }}
  >
    <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '62px', right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 1 }}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          color: '#FFD700', // golden yellow
          textShadow: '1px 1px 2px rgba(0,0,0,0.4)',
        }}
      >
        999,999,999.00
      </Typography>
    </Box>
  </Box>
);
