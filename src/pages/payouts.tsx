import { CONFIG } from 'src/config-global';

import { PayoutsView } from 'src/sections/payouts/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Payouts - ${CONFIG.appName}`}</title>

      <PayoutsView />
    </>
  );
}
