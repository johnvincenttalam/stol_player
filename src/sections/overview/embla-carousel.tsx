// components/MuiEmblaCarousel.tsx
import { Icon } from '@iconify/react';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React, { useEffect, useState, useCallback } from 'react';

import { Box, Card, CardContent, Typography, IconButton, Stack, CardMedia } from '@mui/material';

const slides = [
  {
    title: 'Slide 1',
    description: 'This is the first slide.',
    image: '/assets/images/carousel/slide1.jpg',
  },
  {
    title: 'Slide 2',
    description: 'This is the second slide.',
    image: '/assets/images/carousel/slide1.jpg',
  },
  {
    title: 'Slide 3',
    description: 'This is the third slide.',
    image: '/assets/images/carousel/slide1.jpg',
  },
];

export const EmblaCarousel = () => {
  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <Box position="relative" overflow="hidden" ref={emblaRef} sx={{ width: '100%', height: '100%', mb: 2 }}>
      <Box display="flex" className="embla__container">
        {slides.map((slide, index) => (
          <Box key={index} flex="0 0 100%" sx={{ scrollSnapAlign: 'start' }}>
            <Card variant="outlined" sx={{ borderRadius: 0 }}>
              <CardMedia
                sx={{ height: 'auto', aspectRatio: '16/9' }}
                image={slide.image}
                title={slide.title}
              />
            </Card>
          </Box>
        ))}
      </Box>

      {/* Navigation Arrows */}
      {/* <IconButton
        onClick={scrollPrev}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 8,
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      >
        <Icon icon="solar:alt-arrow-left-outline" width="24" height="24" />
      </IconButton>

      <IconButton
        onClick={scrollNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 8,
          transform: 'translateY(-50%)',
          zIndex: 1,
        }}
      >
       <Icon icon="solar:alt-arrow-right-outline" width="24" height="24" />
      </IconButton> */}

      {/* Pagination Dots */}
      <Stack direction="row" justifyContent="center" mt={2}>
        {scrollSnaps.map((_, index) => (
          <IconButton
            key={index}
            size="small"
            onClick={() => scrollTo(index)}
            sx={{
              color: selectedIndex === index ? '#D4070F' : 'grey.400',
            }}
          >
            <Icon icon="material-symbols:circle" width="10" height="10" />
          </IconButton>
        ))}
      </Stack>
    </Box>
  );
};
