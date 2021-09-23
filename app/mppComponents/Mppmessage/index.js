/**
 *
 * Mppmessage
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import message from 'antd';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

function Mppmessage(props) {
  return (
    <div>
      {(props.type === "success")?(message.success(props.text)):null}
      {(props.type === "warning")?(message.warning(props.text)):null}
      {(props.type === "error")?(message.error(props.text)):null}
    </div>
  );
}

Mppmessage.propTypes = {};

export default Mppmessage;
