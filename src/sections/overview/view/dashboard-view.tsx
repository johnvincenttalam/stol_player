import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';

import { MarqueeBox } from '../marquee-box';
import { LocalGames } from '../local-games';
import { LuckyWinners } from '../lucky-winners';
import { EmblaCarousel } from '../embla-carousel';
import { JackpotDisplay } from '../jackpot-amount';
import { NationalGames, GameData } from '../national-games';

// ----------------------------------------------------------------------

export function DashboardView() {
  const [loading, setLoading] = useState(true);

  const nationalGameData = [
    {
      image: '/assets/images/games/2D_lotto.png',
      logo: '2D',
      color: 'red' as const,
      draws: [
        { time: '2:00PM', numbers: ['22', '19'] },
        { time: '5:00PM', numbers: ['01', '11'] },
        { time: '9:00PM', numbers: ['02', '17'] },
      ],
    },
    {
      image: '/assets/images/games/3D_lotto.png',
      logo: '3D',
      color: 'blue' as const,
      draws: [
        { time: '2:00PM', numbers: ['07', '03', '09'] },
        { time: '5:00PM', numbers: ['03', '04', '06'] },
        { time: '9:00PM', numbers: ['02', '01', '09'] },
      ],
    },
    {
      image: '/assets/images/games/4D_lotto.png',
      logo: '4D',
      color: 'yellow' as const,
      draws: [{ time: '9:00PM', numbers: ['06', '03', '04', '09'] }],
    },
    {
      image: '/assets/images/games/6D_lotto.png',
      logo: '6D',
      color: 'purple' as const,
      draws: [{ time: '9:00PM', numbers: ['04', '03', '01', '05', '06', '08'] }],
    },
  ];

  // Example: Local games data
  const localGameData = [
    {
      regionName: 'National Capital Region',
      regionCode: 'NCR',
      gradientColor: '#F70307',
      backgroundPosition: 'center right',
      backgroundImage: '/assets/images/places/ncr.jpg',
      map: '/assets/images/maps/ncr.png',
      games: [
        { name: '3D', image: '/assets/images/games/3D_lotto.png', color: 'blue' },
        { name: 'EZ2', image: '/assets/images/games/EZ2_lotto.png', color: 'green' },
        { name: '2D', image: '/assets/images/games/2D_lotto.png', color: 'orange' },
      ],
    },
    {
      regionName: 'CALABARZON',
      regionCode: 'Region IV-A',
      gradientColor: '#7F007F',
      backgroundPosition: 'center right',
      backgroundImage: '/assets/images/places/ncr.jpg',
      map: '/assets/images/maps/region-4-a.png',
      games: [{ name: '6/42', image: '/assets/images/games/6_42_lotto.png', color: 'purple' }],
    },
    {
      regionName: 'Central Visayas',
      regionCode: 'Region VII',
      gradientColor: '#F85C71',
      backgroundPosition: 'center right',
      backgroundImage: '/assets/images/places/ncr.jpg',
      map: '/assets/images/maps/region-7.png',
      games: [{ name: '3D', image: '/assets/images/games/3D_lotto.png', color: 'blue' },
        { name: 'EZ2', image: '/assets/images/games/EZ2_lotto.png', color: 'green' },
        { name: '2D', image: '/assets/images/games/2D_lotto.png', color: 'orange' },],
    },
    {
      regionName: 'Davao Region',
      regionCode: 'Region XI',
      gradientColor: '#8C6876',
      backgroundPosition: 'center right',
      backgroundImage: '/assets/images/places/ncr.jpg',
      map: '/assets/images/maps/region-11.png',
      games: [],
    },
  ];

  const handlePlayClick = (gameIndex: number) => {
    const game = nationalGameData[gameIndex];
    console.log(`Play clicked for ${game.logo}`);
    // Add your play logic here
  };

  return (
    <DashboardContent maxWidth="xl" disablePadding>
      <Container disableGutters>
        <MarqueeBox
          text="🚀 Receive your winnings fast and easy. Licensed and regulated for safe betting. 🎉"
          speed={15}
        />
        <EmblaCarousel />
      </Container>

      <Container>
        <Typography variant="h5" fontWeight="bold" color="text.primary" mb={2}>
          National Games
        </Typography>
        <NationalGames gamesData={nationalGameData} onPlayClick={handlePlayClick} />

        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={3} mb={2}>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Local Games
          </Typography>
          <Button href="/local-games" variant="text" size="small" color="error">
            <Typography variant="subtitle1" color="#D4070F">
              See All
            </Typography>
          </Button>
        </Stack>
        <LocalGames data={localGameData} />

        <JackpotDisplay />

        <LuckyWinners speed={15} />
      </Container>
    </DashboardContent>
  );
}
