import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { _users } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export function ResultsView() {

  return (
    <DashboardContent>
      <Typography variant="h4">Results</Typography>
    </DashboardContent>
  );
}
