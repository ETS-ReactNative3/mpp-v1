/*
 * SideBar Messages
 *
 * This contains all the text for the SideBar container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SideBar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SideBar container!',
  },
});
