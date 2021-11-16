/**
 *
 * Profile
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { QuestionCircleOutlined, CloudSyncOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import Avatar from '../../mppComponents/MppAvatar';
import './style.scss';

import messages from './messages';
import { linkDrive } from '../../utils/APIcalls/dashboard';
import { GetLocalStorage } from '../../utils/localStorage/storage';

export function Profile() {
  const [authToken, setAuthToken] = useState('');
  const User = GetLocalStorage('user');

  function linkdrive() {
    linkDrive(User.id_token);
  }
  return (
    <div className="userProfile">
      <div className="userDetails">
        <div className="profileCardTop">
          <Avatar
            style={{ width: 60, height: 60 }}
            src={User.profileObj.imageUrl}
          />
        </div>
        <div className="profileContent">
          <h3>{User.profileObj.name}</h3>
          <h3>{User.profileObj.email}</h3>
          <div className="profileButton">
            <div className="driveDiv">
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 300,
                  color: '#6B7280',
                }}
              >
                Save your Work in Google Drive
                <Popover
                  sm="click"
                  trigger="hover"
                  style={{ borderRadius: 100 }}
                  content={
                    <p>
                      You can save all your Work onto your
                      <strong> Google Drive</strong>, by clicking the drive
                      icon.
                    </p>
                  }
                >
                  <QuestionCircleOutlined
                    style={{
                      marginLeft: 10,
                      cursor: 'pointer',
                      color: '#9CA3AF',
                    }}
                  />
                </Popover>
              </p>
              <CloudSyncOutlined
                className="driveIcon"
                onClick={() => linkdrive()}
                style={{
                  fontSize: 30,
                  cursor: 'pointer',
                  color: '#3b82f6',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Profile);
