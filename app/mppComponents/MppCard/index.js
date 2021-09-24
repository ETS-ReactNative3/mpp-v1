/**
 *
 * MppCard
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Card } from 'antd';

function MppCard(props) {
  return (
    <div>
      <Card {...props} />
    </div>
  );
}

MppCard.propTypes = {};

export default MppCard;
