import React from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

import { Button, Stack } from '@mui/material';

interface BackButtonProps {
  label?: string;
  to?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ label = 'Back', to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <Stack direction="row" mb={2}>
      <Button
        variant="text"
        onClick={handleClick}
        startIcon={<Icon icon="solar:arrow-left-outline" width="24" height="24" />}
        color="inherit"
      >
        {label}
      </Button>
    </Stack>
  );
};