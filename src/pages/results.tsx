import { CONFIG } from 'src/config-global';

import { ResultsView } from 'src/sections/results/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Results - ${CONFIG.appName}`}</title>

      <ResultsView />
    </>
  );
}
