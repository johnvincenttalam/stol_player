import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export function NationalGamesView() {
  return (
    <DashboardContent>
      <Typography variant="h4">National Games</Typography>
    </DashboardContent>
  );
}
