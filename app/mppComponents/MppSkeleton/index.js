/**
 *
 * MppSkeleton
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Skeleton } from 'antd';

function MppSkeleton(props) {
  return (
    <div>
      <Skeleton {...props} />
    </div>
  );
}

MppSkeleton.propTypes = {};

export default MppSkeleton;
