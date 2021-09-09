/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Button from '../../mppComponents/MppButton';
export default function HomePage() {
  return (
    <h1>
      <Button
        onClick={() => {
          alert('abcd');
        }}
      >
        abcd
      </Button>

      <FormattedMessage {...messages.header} />
    </h1>
  );
}
