/**
 *
 * MppRow
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Row } from 'antd';
import 'antd/dist/antd.css';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function MppRow(props) {
  return (
    <div>
      <Row {...props} />
    </div>
  );
}

MppRow.propTypes = {};

export default MppRow;
