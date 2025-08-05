import type { Breakpoint } from '@mui/material/styles';

import { merge } from 'es-toolkit';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useBoolean } from 'minimal-shared/hooks';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import { _langs, _notifications } from 'src/_mock';

import { NavMobile, NavDesktop } from './nav';
import { layoutClasses } from '../core/classes';
import { _account } from '../nav-config-account';
import { dashboardLayoutVars } from './css-vars';
import { Logo } from '../../components/logo/logo';
import { navData } from '../nav-config-dashboard';
import { MainSection } from '../core/main-section';
import { Searchbar } from '../components/searchbar';
import { _workspaces } from '../nav-config-workspace';
import { MenuButton } from '../components/menu-button';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';
import { SignInButton } from './../components/sign-in-buttons';
import { AccountPopover } from '../components/account-popover';
import { LanguagePopover } from '../components/language-popover';
import { NotificationsPopover } from '../components/notifications-popover';

import type { MainSectionProps } from '../core/main-section';
import type { HeaderSectionProps } from '../core/header-section';
import type { LayoutSectionProps } from '../core/layout-section';

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>;

export type DashboardLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint;
  slotProps?: {
    header?: HeaderSectionProps;
    main?: MainSectionProps;
  };
};

export function DashboardLayout({
  sx,
  cssVars,
  children,
  slotProps,
  layoutQuery = 'lg',
}: DashboardLayoutProps) {
  const theme = useTheme();

  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  const renderHeader = () => {
    const headerSlotProps: HeaderSectionProps['slotProps'] = {
      container: {
        maxWidth: false,
      },
    };

    const headerSlots: HeaderSectionProps['slots'] = {
      topArea: (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={{ p: 1, bgcolor: '#EAF3FF' }}
        >
          <Typography variant="caption" color="primary">
            Philippines Number 1 Small Town Online Lottery App
          </Typography>
          <Button
            variant="contained"
            size="small"
            color="warning"
            sx={{ borderRadius: '999px', textWrap: 'nowrap', px: 2, height: 32 }}
          >
            Download App
          </Button>
          {/* <IconButton size="small" sx={{ ml: 1, borderRadius: '999px' }}>
            <Iconify icon="solar:restart-bold" width={18} height={18} />
          </IconButton> */}
        </Stack>
      ),
      leftArea: (
        <>
          {/** @slot Nav mobile */}
          <MenuButton
            onClick={onOpen}
            sx={{ mr: 1, ml: -1, [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }}
          />
          <Logo sx={{ mr: 1, [theme.breakpoints.up(layoutQuery)]: { display: 'none' } }} />
          <NavMobile data={navData} open={open} onClose={onClose} workspaces={_workspaces} />
        </>
      ),
      rightArea: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0, sm: 0.75 } }}>
          {/** @slot Sign In */}
          <SignInButton />

          {/** @slot Searchbar */}
          {/* <Searchbar /> */}

          {/** @slot Language popover */}
          {/* <LanguagePopover data={_langs} /> */}

          {/** @slot Notifications popover */}
          {/* <NotificationsPopover data={_notifications} /> */}

          {/** @slot Account drawer */}
          {/* <AccountPopover data={_account} /> */}
        </Box>
      ),
    };

    return (
      <HeaderSection
        disableElevation
        layoutQuery={layoutQuery}
        {...slotProps?.header}
        slots={{ ...headerSlots, ...slotProps?.header?.slots }}
        slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
        sx={slotProps?.header?.sx}
      />
    );
  };

  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname);

  // Sync value with current path
  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    navigate(newValue);
  };

  const renderFooter = () => (
    // <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', lg: 'none' }, zIndex: 9 }} elevation={3}>
    //   <BottomNavigation
    //     showLabels
    //     value={value}
    //     onChange={(event, newValue) => {
    //       setValue(newValue);
    //     }}
    //   >
    //     <BottomNavigationAction label="Home" icon={<Icon icon="solar:home-2-line-duotone" width="22" height="22" />} />
    //     <BottomNavigationAction label="Results" icon={<Icon icon="fluent:number-circle-8-24-regular" width="22" height="22" />} />
    //     <BottomNavigationAction label="Payouts" icon={<Icon icon="solar:money-bag-line-duotone" width="22" height="22" />} />
    //     <BottomNavigationAction label="Wallet" icon={<Icon icon="solar:wallet-line-duotone" width="22" height="22" />} />
    //     <BottomNavigationAction label="Account" icon={<Icon icon="solar:user-rounded-line-duotone" width="22" height="22" />} />
    //   </BottomNavigation>
    // </Paper>
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: 'block', lg: 'none' },
        zIndex: 9,
      }}
      elevation={3}
    >
      <BottomNavigation value={value} onChange={handleChange} showLabels>
        <BottomNavigationAction
          label="Home"
          value="/"
          icon={<Icon icon="solar:home-2-line-duotone" width="22" height="22" />}
        />
        <BottomNavigationAction
          label="Results"
          value="/results"
          icon={<Icon icon="fluent:number-circle-8-24-regular" width="22" height="22" />}
        />
        <BottomNavigationAction
          label="Payouts"
          value="/payouts"
          icon={<Icon icon="solar:money-bag-line-duotone" width="22" height="22" />}
        />
        <BottomNavigationAction
          label="Wallet"
          value="/wallet"
          icon={<Icon icon="solar:wallet-line-duotone" width="22" height="22" />}
        />
        <BottomNavigationAction
          label="Account"
          value="/account"
          icon={<Icon icon="solar:user-rounded-line-duotone" width="22" height="22" />}
        />
      </BottomNavigation>
    </Paper>
  );

  const renderMain = () => <MainSection {...slotProps?.main}>{children}</MainSection>;

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={renderHeader()}
      /** **************************************
       * @Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop data={navData} layoutQuery={layoutQuery} workspaces={_workspaces} />
      }
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={renderFooter()}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ ...dashboardLayoutVars(theme), ...cssVars }}
      sx={[
        {
          [`& .${layoutClasses.sidebarContainer}`]: {
            [theme.breakpoints.up(layoutQuery)]: {
              pl: 'var(--layout-nav-vertical-width)',
              transition: theme.transitions.create(['padding-left'], {
                easing: 'var(--layout-transition-easing)',
                duration: 'var(--layout-transition-duration)',
              }),
            },
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {renderMain()}
    </LayoutSection>
  );
}
