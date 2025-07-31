import React from 'react';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Avatar,
} from '@mui/material';

type Draw = {
  time: string;
  numbers: string[];
};

type GameData = {
  image: string;
  logo: string;
  color: 'red' | 'blue' | 'gold' | 'purple';
  draws: Draw[];
};

const gamesData: GameData[] = [
  {
    image: '/assets/images/carousel/slide1.jpg',
    logo: '2D',
    color: 'red',
    draws: [
      { time: '2:00PM', numbers: ['22', '19'] },
      { time: '5:00PM', numbers: ['01', '11'] },
      { time: '9:00PM', numbers: ['02', '17'] },
    ],
  },
  {
    image: '/assets/images/carousel/slide1.jpg',
    logo: '3D',
    color: 'blue',
    draws: [
      { time: '2:00PM', numbers: ['07', '03', '09'] },
      { time: '5:00PM', numbers: ['03', '04', '06'] },
      { time: '9:00PM', numbers: ['02', '01', '09'] },
    ],
  },
  {
    image: '/assets/images/carousel/slide1.jpg',
    logo: '4D',
    color: 'gold',
    draws: [{ time: '9:00PM', numbers: ['06', '03', '04', '09'] }],
  },
  {
    image: '/assets/images/carousel/slide1.jpg',
    logo: '6D',
    color: 'purple',
    draws: [{ time: '9:00PM', numbers: ['04', '03', '01', '05', '06', '08'] }],
  },
];

const getColor = (color: string): string => {
  switch (color) {
    case 'red':
      return '#f44336';
    case 'blue':
      return '#2196f3';
    case 'gold':
      return '#fbc02d';
    case 'purple':
      return '#9c27b0';
    default:
      return '#ccc';
  }
};

export const NationalGames: React.FC = () => (
  <Box>
    <Typography variant="h4" fontWeight="bold" color="text.primary" mb={3}>
      National Games
    </Typography>
    
    <Stack spacing={2}>
      {gamesData.map((game, index) => (
        <Card key={index} sx={{ backgroundColor: '#E9F3FF', borderRadius: 2 }}>
          <CardContent sx={{ p: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: getColor(game.color),
                    width: 50,
                    height: 50,
                    borderRadius: 1.2,
                  }}
                >
                  <Stack direction="row" alignItems="baseline" spacing={0.5}>
                    <Typography variant="body2" fontWeight="bold" color="white">
                      {game.logo}
                    </Typography>
                    <Typography variant="caption" color="white" sx={{ fontSize: '8px' }}>
                      LOTTO
                    </Typography>
                  </Stack>
                </Avatar>
                <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                  Winning Numbers
                </Typography>
              </Stack>

              <Button 
                variant="contained" 
                sx={{ 
                  bgcolor: '#D4070F', 
                  '&:hover': { bgcolor: '#b71c1c' },
                  px: 2,
                  py: 0.5,
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  borderRadius: '999px',
                }}
              >
                PLAY
              </Button>
            </Stack>

            <Stack direction="row" justifyContent="space-between" alignItems="center">
              {game.draws.map((draw, drawIndex) => (
                <Stack key={drawIndex} alignItems="center" spacing={1}>
                  <Stack direction="row" spacing={0.5}>
                    {draw.numbers.map((num, numIndex) => (
                      <Box
                        key={numIndex}
                        sx={{
                          width: game.logo === '3D' ? 28 : 32,
                          height: game.logo === '3D' ? 28 : 32,
                          borderRadius: '50%',
                          backgroundColor: getColor(game.color),
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: game.logo === '3D' ? '0.775rem' : '0.875rem',
                        }}
                      >
                        {num}
                      </Box>
                    ))}
                  </Stack>
                  <Typography variant="caption" color="text.secondary" fontWeight="medium">
                    {draw.time}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  </Box>
);