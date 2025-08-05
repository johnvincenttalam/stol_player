import { CONFIG } from 'src/config-global';

import { NationalGamesView } from 'src/sections/national-games/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`National Games - ${CONFIG.appName}`}</title>

      <NationalGamesView />
    </>
  );
}
