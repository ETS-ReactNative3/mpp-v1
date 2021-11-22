/**
 *
 * SideBar
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import {
  UserOutlined,
  FolderOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import Avatar from '../../mppComponents/MppAvatar';
import Button from '../../mppComponents/MppButton';
import './style.scss';
import messages from './messages';
import { GetLocalStorage } from '../../utils/localStorage/storage';

export function SideBar() {
  const [redirectTo, setRedirectTo] = useState(false);
  const User = GetLocalStorage('user');
  function performRedirect() {
    if (redirectTo) {
      return <Redirect to="/login" />;
    }
    return null;
  }
  return (
    <div className="sidebar">
      <div className="sidebarContent">
        {performRedirect()}
        <Link to="/">
          <div className="link dashboardLink">
            <UserOutlined className="linkIcon" />
            <h3>DashBoard</h3>
          </div>
        </Link>
        <Link to="/stories">
          <div className="link storiesLink">
            <FolderOutlined className="linkIcon" />
            <h3>All Stories</h3>
          </div>
        </Link>
        <Button
          className="logoutButton buttonText"
          type="primary"
          danger
          onClick={() => setRedirectTo(true)}
        >
          Logout
        </Button>
        <Button
          className="logoutButton buttonIcon"
          type="primary"
          danger
          onClick={() => setRedirectTo(true)}
        >
          <PoweroffOutlined />
        </Button>
      </div>
      <Link to="/profile">
        <div className="avatarLink">
          <div className="settings">
            <SettingOutlined className="settingIcon" />
            <span>{User.profileObj.givenName}</span>
          </div>

          <Avatar className="avatar" src={User.profileObj.imageUrl} />
        </div>
      </Link>
    </div>
  );
}

SideBar.propTypes = {
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
)(SideBar);
