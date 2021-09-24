/**
 *
 * MppLayout
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { Layout } from 'antd';

function MppLayout(props) {
  return (
    <div>
      <Layout {...props} />
    </div>
  );
}

MppLayout.propTypes = {};

export default MppLayout;
