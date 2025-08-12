import { Icon } from '@iconify/react';
import { useParams, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { Card } from '@mui/material';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { DashboardContent } from 'src/layouts/dashboard';

import { BackButton } from 'src/components/back-button';

import { NationalGames } from './../../overview/national-games';

// ----------------------------------------------------------------------

export function RegionGamesView() {
  const { regionCode } = useParams<{ regionCode: string }>();
  const navigate = useNavigate();

  const regionData = [
    {
      regionName: 'Negros Island Region',
      regionCode: 'NIR',
      bgColor: '#465859',
      provinces: [
        {
          name: 'Negros Occidental',
          games: [
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
          ],
        },
        {
          name: 'Negros Oriental',
          games: [
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
          ],
        },
        {
          name: 'Siquijor',
          games: [
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
          ],
        },
      ],
    },
  ];

  const handlePlayClick = (gameIndex: number, provinceIndex: number) => {
    const region = regionData[0];
    const province = region.provinces[provinceIndex];
    const game = province.games[gameIndex];
    
    console.log(`Play clicked for ${game.logo} in ${province.name}`);
    navigate(`/bet/${game.logo.toLowerCase()}/${province.name.toLowerCase().replace(/\s+/g, '-')}/${region.regionCode.toLowerCase()}/${region.regionName.toLowerCase()}`);
  };

  return (
    <DashboardContent>
      <BackButton to="/local-games" />
      <Typography variant="h4" textTransform="uppercase">
        {regionData[0]?.regionCode || regionCode}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {regionData[0]?.regionName}
      </Typography>

      <Stack direction="column" spacing={2} mt={3}>
        {regionData.map((region) =>
          region.provinces.map((province, provinceIndex) => (
            <Card key={province.name} sx={{ borderRadius: 1 }}>
              <Accordion sx={{ bgcolor: region.bgColor }}>
                <AccordionSummary
                  expandIcon={
                    <Icon
                      icon="solar:alt-arrow-down-outline"
                      width="20"
                      height="20"
                      style={{ color: '#fff' }}
                    />
                  }
                  aria-label="Expand"
                  aria-controls={`${province.name}-content`}
                  id={`${province.name}-header`}
                  sx={{ px: 1.5, py: 0.5 }}
                >
                  <Typography variant="body1" color="#fff" fontWeight={600}>
                    {province.name}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: '#fff', px: 1 }}>
                  <NationalGames 
                    gamesData={province.games} 
                    onPlayClick={(gameIndex) => handlePlayClick(gameIndex, provinceIndex)} 
                  />
                </AccordionDetails>
              </Accordion>
            </Card>
          ))
        )}
      </Stack>
    </DashboardContent>
  );
}
