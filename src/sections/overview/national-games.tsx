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
  color: 'red' | 'blue' | 'yellow' | 'purple' | 'orange' | 'cyan';
  draws: Draw[];
};

interface NationalGamesProps {
  gamesData: GameData[];
  onPlayClick?: (gameIndex: number) => void;
}

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

export const NationalGames: React.FC<NationalGamesProps> = ({ 
  gamesData, 
  onPlayClick 
}) => (
  <Box>
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
                className="animated infinite pulse"
                variant="contained"
                onClick={() => onPlayClick?.(index)}
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

// Export types for use in parent components
export type { GameData, Draw };