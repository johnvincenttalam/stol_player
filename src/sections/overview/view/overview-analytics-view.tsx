import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';
import { _posts, _tasks, _traffic, _timeline } from 'src/_mock';

import { MarqueeBox } from '../marquee-box';
import { EmblaCarousel } from '../embla-carousel';
import { NationalGames } from '../national-games';
import { JackpotDisplay } from '../jackpot-amount';

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
        <Typography variant="h5" fontWeight="bold" color="text.primary" mb={2}>
          National Games
        </Typography>
        <NationalGames />

        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Local Games
          </Typography>
          <Button href="/" variant="text" size="small" color="error">
            <Typography variant="subtitle1" color="#D4070F">
              See All
            </Typography>
          </Button>
        </Stack>
        
        <JackpotDisplay />
      </Container>
    </DashboardContent>
  );
}
