import React from 'react';

import { Box, Typography, Stack, Grid, Card } from '@mui/material';

interface Game {
  name: string;
  image: string;
  color?: string;
}

interface LocalGameDataItem {
  regionName: string;
  regionCode: string;
  map: string;
  gradientColor: string;
  backgroundImage: string;
  games: Game[];
}

interface LocalGamesProps {
  data: LocalGameDataItem[];
}

export const LocalGames: React.FC<LocalGamesProps> = ({ data }) => (
  <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
    {data.map((region) => (
      <Grid
        key={region.regionCode}
        size={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Card
          className={`local-game-card-${region.regionCode.toLowerCase()}`}
          sx={{
            width: '100%',
            height: 140,
            overflow: 'hidden',
            position: 'relative',
            background: `linear-gradient(to right, ${region.gradientColor}, ${region.gradientColor}59), url(${region.backgroundImage}) center/cover no-repeat`,
            color: 'white',
            p: 2.5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            cursor: 'pointer',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          }}
        >
          {/* Header Section */}
          <Box sx={{ zIndex: 2, position: 'relative' }}>
            <Typography
              variant="h3"
              textTransform="uppercase"
              sx={{
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                lineHeight: 1.2,
              }}
            >
              {region.regionCode}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
              }}
            >
              {region.regionName}
            </Typography>
          </Box>

          {/* Game Icons Section */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ zIndex: 2, position: 'relative', mt: 1 }}
          >
            {region.games.map((game, gameIndex) => (
              <Box
                key={gameIndex}
                component="img"
                src={game.image}
                alt={game.name}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 0.75,
                  backgroundColor: '#fff',
                  padding: '2px',
                  transition: 'transform 0.2s ease'
                }}
              />
            ))}
          </Stack>

          {/* Map Silhouette */}
          <Box
            component="img"
            src={region.map}
            alt={`${region.regionCode} map`}
            sx={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              right: 0,
              height: '100px',
              width: 'auto',
              zIndex: 1,
            }}
          />

          {/* Subtle Background Pattern Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
              zIndex: 0,
            }}
          />
        </Card>
      </Grid>
    ))}
  </Grid>
);
