import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';

import { MarqueeBox } from '../marquee-box';
import { EmblaCarousel } from '../embla-carousel';
import { NationalGames } from '../national-games';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
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
        <NationalGames />
      </Container>
    </DashboardContent>
  );
}
