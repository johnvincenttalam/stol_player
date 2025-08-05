import { CONFIG } from 'src/config-global';

import { WalletView } from 'src/sections/wallet/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Wallet - ${CONFIG.appName}`}</title>

      <WalletView />
    </>
  );
}
