import { CONFIG } from 'src/config-global';

import { BetView } from 'src/sections/bet/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Bet - ${CONFIG.appName}`}</title>

      <BetView />
    </>
  );
}
