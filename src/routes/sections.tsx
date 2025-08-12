import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

import { AuthLayout } from 'src/layouts/auth';
import { DashboardLayout } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const DashboardPage = lazy(() => import('src/pages/dashboard'));
export const UserPage = lazy(() => import('src/pages/user'));
export const SignInPage = lazy(() => import('src/pages/sign-in'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const NationalGamesPage = lazy(() => import('src/pages/national-games'));
export const LocalGamesPage = lazy(() => import('src/pages/local-games'));
export const ResultsPage = lazy(() => import('src/pages/results'));
export const PayoutsPage = lazy(() => import('src/pages/payouts'));
export const WalletPage = lazy(() => import('src/pages/wallet'));
export const AccountPage = lazy(() => import('src/pages/account'));
export const RegionPage = lazy(() => import('src/pages/region-games'));
export const BetPage = lazy(() => import('src/pages/bet'));

const renderFallback = () => (
  <Box
    sx={{
      display: 'flex',
      flex: '1 1 auto',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: 'text.primary' },
      }}
    />
  </Box>
);

export const routesSection: RouteObject[] = [
  {
    element: (
      <DashboardLayout>
        <Suspense fallback={renderFallback()}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'national-games', element: <NationalGamesPage /> },
      { path: 'local-games', element: <LocalGamesPage /> },
      { path: 'payouts', element: <PayoutsPage /> },
      { path: 'results', element: <ResultsPage /> },
      { path: 'wallet', element: <WalletPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'region-games/:regionCode', element: <RegionPage /> },
      { path: 'bet/:game/:province/:regioncode/:region', element: <BetPage /> },
    ],
  },
  {
    path: 'sign-in',
    element: (
      <AuthLayout>
        <SignInPage />
      </AuthLayout>
    ),
  },
  {
    path: '404',
    element: <Page404 />,
  },
  { path: '*', element: <Page404 /> },
];
