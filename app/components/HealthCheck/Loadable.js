/**
 *
 * Asynchronously loads the component for Healthcheck
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
