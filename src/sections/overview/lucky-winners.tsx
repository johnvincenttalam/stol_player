import React, { useRef, useState, useEffect, useMemo } from 'react';

import Avatar from '@mui/material/Avatar';
import { Box, Typography, Card, CardContent, Stack } from '@mui/material';

interface Winner {
  image: string;
  game: string;
  name: string;
  amount: number;
}

interface LuckyWinnersProps {
  data?: Winner[];
  speed?: number; // seconds for full scroll
  containerHeight?: number;
}

const defaultData: Winner[] = [
  { image: '/assets/images/games/3D_lotto.png', game: '3D Lotto', name: 'John Doe', amount: 1000 },
  {
    image: '/assets/images/games/3D_lotto.png',
    game: '3D Lotto',
    name: 'Jane Smith',
    amount: 2500,
  },
  {
    image: '/assets/images/games/3D_lotto.png',
    game: '3D Lotto',
    name: 'Mike Johnson',
    amount: 500,
  },
  {
    image: '/assets/images/games/3D_lotto.png',
    game: '3D Lotto',
    name: 'Sarah Wilson',
    amount: 1800,
  },
  {
    image: '/assets/images/games/3D_lotto.png',
    game: '3D Lotto',
    name: 'David Brown',
    amount: 3200,
  },
  { image: '/assets/images/games/3D_lotto.png', game: '3D Lotto', name: 'Lisa Davis', amount: 750 },
  { image: '/assets/images/games/3D_lotto.png', game: '3D Lotto', name: 'Lisa Davis', amount: 750 },
  { image: '/assets/images/games/3D_lotto.png', game: '3D Lotto', name: 'Lisa Davis', amount: 750 },
  { image: '/assets/images/games/3D_lotto.png', game: '3D Lotto', name: 'Lisa Davis', amount: 750 },
  { image: '/assets/images/games/3D_lotto.png', game: '3D Lotto', name: 'Lisa Davis', amount: 750 },
];

export const LuckyWinners: React.FC<LuckyWinnersProps> = ({
  data = defaultData,
  speed = 10,
  containerHeight = 300,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimationReady, setIsAnimationReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimationReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;

    const stopAnimation = () => (node.style.animationPlayState = 'paused');
    const startAnimation = () => (node.style.animationPlayState = 'running');

    node.addEventListener('touchstart', stopAnimation);
    node.addEventListener('touchend', startAnimation);
    node.addEventListener('mouseenter', stopAnimation);
    node.addEventListener('mouseleave', startAnimation);

    return () => {
      node.removeEventListener('touchstart', stopAnimation);
      node.removeEventListener('touchend', startAnimation);
      node.removeEventListener('mouseenter', stopAnimation);
      node.removeEventListener('mouseleave', startAnimation);
    };
  }, []);

  const formatAmount = (amount: number): string =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const winnerItems = useMemo(
    () =>
      data.map((winner, index) => (
        <Card
          key={`winner-${index}`}
          sx={{
            m: 0.5,
            backgroundColor: '#fff',
            borderRadius: 1.2,
            transition: 'transform 0.2s ease-in-out',
          }}
        >
          <CardContent sx={{ p: '8px !important' }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                variant="rounded"
                src={winner.image}
                alt={`${winner.game} logo`}
                sx={{
                  bgcolor: 'white',
                  width: 35,
                  height: 35,
                  borderRadius: 1.2,
                }}
              />
              <Stack direction="column" sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  variant="caption"
                  color="#D4070F"
                  fontWeight="bold"
                  sx={{ fontSize: '0.75rem', lineHeight: 1.2 }}
                >
                  {winner.game}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ fontSize: '0.625rem', lineHeight: 1.2 }}
                  noWrap
                >
                  {`${'*'.repeat(winner.name.length - 1)}${winner.name.slice(-1)} just won`}
                </Typography>
                <Typography
                  variant="caption"
                  color="#FFA726"
                  fontWeight="bold"
                  sx={{ fontSize: '0.75rem', lineHeight: 1.2 }}
                >
                  {formatAmount(winner.amount)}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )),
    [data]
  );

  // CSS animation
  const animationStyles = `
    @keyframes scrollLoop {
      0% {
        transform: translateY(0);
      }
      100% {
        transform: translateY(-50%);
      }
    }
  `;

  return (
    <Box sx={{ position: 'relative', mb: 2 }}>
      <style>{animationStyles}</style>

      {/* Header */}
      <Box
        sx={{
          height: '35px',
          backgroundColor: '#D4070F',
          textAlign: 'center',
          borderRadius: 2,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          overflow: 'visible',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Box
          component="img"
          src="/assets/images/stol/lucky-winners-heading.png"
          alt="Lucky Winners"
          sx={{
            maxWidth: '300px',
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            position: 'relative',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
            display: 'block',
          }}
        />
      </Box>

      {/* Scrollable container */}
      <Box
        sx={{
          overflow: 'hidden',
          backgroundColor: '#D4070F',
          pt: 0,
          px: 1,
          mb: 2,
          height: `${containerHeight}px`,
          borderRadius: 2,
          borderTopRightRadius: 0,
          borderTopLeftRadius: 0,
          position: 'relative',
          marginTop: '-18px',
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            animation: isAnimationReady ? `scrollLoop ${speed}s linear infinite` : 'none',
            willChange: 'transform',
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 1,
            }}
          >
            {winnerItems}
            {winnerItems /* duplicated for infinite scroll */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
