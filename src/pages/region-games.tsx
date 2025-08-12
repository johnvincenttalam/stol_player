import { CONFIG } from 'src/config-global';

import { RegionGamesView } from 'src/sections/region-games/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Region Games - ${CONFIG.appName}`}</title>

      <RegionGamesView />
    </>
  );
}
