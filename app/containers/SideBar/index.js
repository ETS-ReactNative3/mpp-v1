/**
 *
 * SideBar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
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
  const User = GetLocalStorage('user');
  return (
    <div className="sidebar">
      <div className="sidebarContent">
        <Link to="/">
          <div className="link dashboardLink">
            <UserOutlined style={{ fontSize: 22, fontWeight: 700 }} />
            <h3>DashBoard</h3>
          </div>
        </Link>
        <Link to="/stories">
          <div className="link storiesLink">
            <FolderOutlined style={{ fontSize: 22, fontWeight: 700 }} />
            <h3>All Stories</h3>
          </div>
        </Link>
        <Button
          className="buttonText"
          type="primary"
          danger
          style={{ borderRadius: 8, marginTop: 16 }}
        >
          Logout
        </Button>
        <Button
          className="buttonIcon"
          type="primary"
          danger
          style={{ borderRadius: 8, marginTop: 16 }}
        >
          <PoweroffOutlined />
        </Button>
      </div>
      <Link to="/profile">
        <div className="avatarLink">
          <div className="settingsIcon">
            <SettingOutlined style={{ fontSize: 20 }} />
            <span>{User.profileObj.givenName}</span>
          </div>

          <Avatar
            className="avatar"
            style={{ width: 52, height: 52 }}
            src={User.profileObj.imageUrl}
          />
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
