/**
 *
 * Asynchronously loads the component for PrivateRoute
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
