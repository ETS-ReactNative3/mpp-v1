/**
 *
 * MppButton
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Button } from 'antd';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function MppButton(props) {
  return (
    <div>
      <Button {...props} />
    </div>
  );
}

MppButton.propTypes = {};

export default MppButton;
