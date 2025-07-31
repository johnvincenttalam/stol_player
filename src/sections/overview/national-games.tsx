import React from 'react';

import Avatar from '@mui/material/Avatar';
import { Box, Card, CardContent, Typography, Button, Stack } from '@mui/material';

type Draw = {
  time: string;
  numbers: string[];
};

type GameData = {
  image: string;
  logo: string;
  color: 'red' | 'blue' | 'yellow' | 'purple';
  draws: Draw[];
};

const gamesData: GameData[] = [
  {
    image: '/assets/images/games/2d.png',
    logo: '2D',
    color: 'red',
    draws: [
      { time: '2:00PM', numbers: ['22', '19'] },
      { time: '5:00PM', numbers: ['01', '11'] },
      { time: '9:00PM', numbers: ['02', '17'] },
    ],
  },
  {
    image: '/assets/images/games/3d.png',
    logo: '3D',
    color: 'blue',
    draws: [
      { time: '2:00PM', numbers: ['07', '03', '09'] },
      { time: '5:00PM', numbers: ['03', '04', '06'] },
      { time: '9:00PM', numbers: ['02', '01', '09'] },
    ],
  },
  {
    image: '/assets/images/games/4d.png',
    logo: '4D',
    color: 'yellow',
    draws: [{ time: '9:00PM', numbers: ['06', '03', '04', '09'] }],
  },
  {
    image: '/assets/images/games/6d.png',
    logo: '6D',
    color: 'purple',
    draws: [{ time: '9:00PM', numbers: ['04', '03', '01', '05', '06', '08'] }],
  },
];

const getColor = (color: string): string => {
  switch (color) {
    case 'blue':
      return 'radial-gradient(circle at top left, #4C9BFF 0%, #0066E7 55%, #0058C8 85%, #0058C8 100%)';
    case 'red':
      return 'radial-gradient(circle at top left, #FF4C4C 0%, #DB0100 55%, #BE0200 85%, #BE0200 100%)';
    case 'yellow':
      return 'radial-gradient(circle at top left, #FFE86C 0%, #EDC800 55%, #D8B600 85%, #D8B600 100%)';
    case 'purple':
      return 'radial-gradient(circle at top left, #AB3CFF 0%, #8300E7 55%, #7300CA 85%, #7300CA 100%)';
    case 'orange':
      return 'radial-gradient(circle at top left, #FF9C35 0%, #F18009 55%, #D56D00 85%, #D56D00 100%)';
    case 'cyan':
      return 'radial-gradient(circle at top left, #9DFCFF 0%, #4CDDE1 55%, #2BBFC3 85%, #2BBFC3 100%)';
    default:
      return '#ccc';
  }
};


export const NationalGames: React.FC = () => (
  <Box sx={{ mb: 3}}>
    <Stack spacing={2}>
      {gamesData.map((game, index) => (
        <Card key={index} sx={{ backgroundColor: '#fff', borderRadius: 2 }}>
          <CardContent sx={{ p: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  variant="rounded"
                  src={game.image}
                  alt={game.logo}
                  sx={{
                    bgcolor: 'white',
                    color: getColor(game.color),
                    width: 50,
                    height: 50,
                    borderRadius: 1.2,
                  }}
                />
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
                  <Stack direction="row" spacing={0.75}>
                    {draw.numbers.map((num, numIndex) => (
                      <Box
                        key={numIndex}
                        sx={{
                          width: game.logo === '3D' ? 28 : 36,
                          height: game.logo === '3D' ? 28 : 36,
                          borderRadius: '50%',
                          background: getColor(game.color),
                          color: game.color === 'yellow' ? "#000" : '#fff',
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
