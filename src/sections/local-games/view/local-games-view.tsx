import { Icon } from '@iconify/react';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { LocalGames } from './../../overview/local-games';

// ----------------------------------------------------------------------

export function LocalGamesView() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, []);

  const handleSearchClick = useCallback(() => {
    // Handle search action here
    console.log('Search clicked with query:', searchQuery);
  }, [searchQuery]);

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
      regionName: 'Cordillera Administrative Region',
      regionCode: 'CAR',
      gradientColor: '#0059FF',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/car.jpg',
      map: '/assets/images/maps/car.png',
      games: [],
    },
    {
      regionName: 'Ilocos Region',
      regionCode: 'Region I',
      gradientColor: '#00AC5C',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/region1.jpg',
      map: '/assets/images/maps/region-1.png',
      games: [],
    },
    {
      regionName: 'Cagayan Valley',
      regionCode: 'Region II',
      gradientColor: '#FFC300',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/region2.jpg',
      map: '/assets/images/maps/region-2.png',
      games: [],
    },
    {
      regionName: 'Central Luzon',
      regionCode: 'Region III',
      gradientColor: '#41E0CF',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/region3.jpg',
      map: '/assets/images/maps/region-3.png',
      games: [],
    },
    {
      regionName: 'CALABARZON',
      regionCode: 'Region IV-A',
      gradientColor: '#7F007F',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/region4a.jpg',
      map: '/assets/images/maps/region-4-a.png',
      games: [],
    },
    {
      regionName: 'MIMAROPA',
      regionCode: 'Region IV-B',
      gradientColor: '#FF57AE',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/region4b.jpg',
      map: '/assets/images/maps/region-4-b.png',
      games: [],
    },
    {
      regionName: 'Bicol Region',
      regionCode: 'Region V',
      gradientColor: '#811415',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/region5.jpg',
      map: '/assets/images/maps/region-5.png',
      games: [],
    },
    {
      regionName: 'Western Visayas',
      regionCode: 'Region VI',
      gradientColor: '#7F8000',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/region6.jpg',
      map: '/assets/images/maps/region-6.png',
      games: [],
    },
    {
      regionName: 'Negros Island Region',
      regionCode: 'NIR',
      gradientColor: '#465859',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/nir.jpg',
      map: '/assets/images/maps/nir.png',
      games: [],
    },
    {
      regionName: 'Central Visayas',
      regionCode: 'Region VII',
      gradientColor: '#F85C71',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/region7.jpg',
      map: '/assets/images/maps/region-7.png',
      games: [],
    },
    {
      regionName: 'Eastern Visayas',
      regionCode: 'Region VIII',
      gradientColor: '#060543',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/region8.jpg',
      map: '/assets/images/maps/region-8.png',
      games: [],
    },
    {
      regionName: 'Zamboanga Peninsula',
      regionCode: 'Region IX',
      gradientColor: '#602E9E',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/region9.jpg',
      map: '/assets/images/maps/region-9.png',
      games: [],
    },
    {
      regionName: 'Northern Mindanao',
      regionCode: 'Region X',
      gradientColor: '#4CDDE1',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/region10.jpg',
      map: '/assets/images/maps/region-10.png',
      games: [],
    },
    {
      regionName: 'Davao Region',
      regionCode: 'Region XI',
      gradientColor: '#8C6876',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/region11.jpg',
      map: '/assets/images/maps/region-11.png',
      games: [],
    },
    {
      regionName: 'SOCCSKSARGEN',
      regionCode: 'Region XII',
      gradientColor: '#FF6200',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/region12.jpg',
      map: '/assets/images/maps/region-12.png',
      games: [],
    },
    {
      regionName: 'Caraga Region',
      regionCode: 'Region XIII',
      gradientColor: '#C67E50',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/region13.jpg',
      map: '/assets/images/maps/region-13.png',
      games: [],
    },
    {
      regionName: 'Bangsamoro Autonomous Region in Muslim Mindanao',
      regionCode: 'BARMM',
      gradientColor: '#445959',
      backgroundPosition: 'center',
      backgroundImage: '/assets/images/places/barmm.jpg',
      map: '/assets/images/maps/barmm.png',
      games: [],
    },
  ];

  return (
    <DashboardContent>
      <Typography variant="h4" mb={2}>
        Local Games
      </Typography>
      <OutlinedInput
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search games..."
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleSearchClick} edge="end">
              <Icon icon="solar:magnifer-outline" className="text-red" width="20" height="20" />
            </IconButton>
          </InputAdornment>
        }
        sx={{ mb: 3 }}
      />
      <LocalGames data={localGameData} />
    </DashboardContent>
  );
}
