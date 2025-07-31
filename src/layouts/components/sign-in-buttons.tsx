import type { ButtonProps } from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';


// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }: ButtonProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Button
        sx={{ borderRadius: '999px' }}
        className="bg-red"
        {...other}
        color="error"
        variant="contained"
        size="small"
      >
        Sign In
      </Button>
      <Button
        sx={{ borderRadius: '999px' }}
        {...other}
        color="inherit"
        variant="outlined"
        size="small"
      >
        Register
      </Button>
    </Stack>
  );
}
