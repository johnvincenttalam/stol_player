import { CONFIG } from 'src/config-global';

import { LocalGamesView } from 'src/sections/local-games/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Local Games - ${CONFIG.appName}`}</title>

      <LocalGamesView />
    </>
  );
}
