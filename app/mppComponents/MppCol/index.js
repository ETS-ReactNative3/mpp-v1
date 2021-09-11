/**
 *
 * MppCol
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Col } from 'antd';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function MppCol(props) {
  return (
      <Col {...props} />
  );
}

MppCol.propTypes = {};

export default MppCol;
