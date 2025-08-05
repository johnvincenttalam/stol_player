import { Icon } from '@iconify/react';

import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon="solar:home-2-line-duotone" width="24" height="24" />,
  },
  {
    title: 'Results',
    path: '/user',
    icon: <Icon icon="fluent:number-circle-8-24-regular" width="24" height="24" />,
  },
  {
    title: 'National Games',
    path: '/national-games',
    icon: <Icon icon="solar:flag-2-line-duotone" width="24" height="24" />,
  },
  {
    title: 'Local Games',
    path: '/local-games',
    icon: <Icon icon="solar:map-point-wave-line-duotone" width="24" height="24" />,
  },
  {
    title: 'Payouts',
    path: '/payouts',
    icon: <Icon icon="solar:money-bag-line-duotone" width="24" height="24" />,
  },
  {
    title: 'Wallet',
    path: '/wallet',
    icon: <Icon icon="solar:wallet-line-duotone" width="24" height="24" />,
  },
  {
    title: 'Account',
    path: '/account',
    icon: <Icon icon="solar:user-rounded-line-duotone" width="24" height="24" />,
  },
  // {
  //   title: 'Product',
  //   path: '/products',
  //   icon: icon('ic-cart'),
  //   info: (
  //     <Label color="error" variant="inverted">
  //       +3
  //     </Label>
  //   ),
  // },
  // {
  //   title: 'Blog',
  //   path: '/blog',
  //   icon: icon('ic-blog'),
  // },
  {
    title: 'Logout',
    path: '/sign-in',
    icon: icon('ic-lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic-disabled'),
  },
];
