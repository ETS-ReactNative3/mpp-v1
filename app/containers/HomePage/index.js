/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';

import { FormattedMessage } from 'react-intl';
import Button from '../../mppComponents/MppButton';
import './styles.scss';
export default function HomePage() {
  return (
    <div className="home-page">
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
    </div>
  );
}
