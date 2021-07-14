/**
 *
 * Healthcheck
 *
 */

import React, { memo, useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function HealthCheck() {
  const [status, setStatus] = useState('checking...');
  useEffect(() => {
    const url = '/api/healthCheck';

    const fetchData = async () => {
      try {
        const response = await fetch(url);

        const json = await response.json();
        debugger;

        console.log(json);
        setStatus(JSON.stringify(json));
      } catch (error) {
        setStatus(JSON.stringify(error));
      }
    };

    fetchData();
  }, []);
  return <div>{status}</div>;
}

HealthCheck.propTypes = {};

export default memo(HealthCheck);
