/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import {
  CloseCircleOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  CloudSyncOutlined,
} from '@ant-design/icons';
import { Popover, Layout } from 'antd';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import './styles.scss';
import 'antd/dist/antd.css';

import Card from '../../mppComponents/MppCard/index.js';
import Row from '../../mppComponents/MppRow/index.js';
import Col from '../../mppComponents/MppCol/index.js';
import Skeleton from '../../mppComponents/MppSkeleton/index.js';
import Avatar from '../../mppComponents/MppAvatar/index.js';
import Button from '../../mppComponents/MppButton/index.js';
// import { useAuth, user } from ProvideAuth from '../../contexts/authContext';

import history from '../../utils/history';

import { GetDashboardInfo, linkDrive } from '../../utils/APIcalls/dashboard';
import { GetLocalStorage } from '../../utils/localStorage/storage.js';

export default function Dashboard() {
  const { Content } = Layout;
  const [stories, setStories] = useState([]);
  const [authToken, setAuthToken] = useState('');

  const profile = GetLocalStorage('user');

  console.log('profile', profile);

  useEffect(() => {
    let token;
    if (profile) {
      token = profile.tokenId;
    }
    console.log(token);

    GetDashboardInfo(token)
      .then(res => {
        setStories(res);
        console.log(stories);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);

  function linkdrive() {
    linkDrive(authToken);
  }

  return (
    <>
      <div className="container" style={{ backgroundColor: '#eee' }}>
        <div className="section section1">
          <Card
            bordered
            className="dashboard-profilecard"
            style={{
              width: '90%',
              height: '100%',
              marginTop: 16,
              marginLeft: 16,
            }}
          >
            <Switch>
              <Route path="/" exact>
                <div className="avatarDiv">
                  <h3>{profile.profileObj.name}</h3>
                  <Link to="/profile">
                    <Avatar
                      className="avatar"
                      style={{ width: 60, height: 60 }}
                      src={profile.profileObj.imageUrl}
                    />
                  </Link>
                </div>
              </Route>
              <Route path="/profile" exact>
                <>
                  <div className="profileCardTop">
                    <Avatar
                      style={{ width: 60, height: 60 }}
                      src={profile.profileObj.imageUrl}
                    />
                    <Link to="/">
                      <CloseCircleOutlined style={{ fontSize: 20 }} />
                    </Link>
                  </div>
                  <div className="profileContent">
                    <h3>{profile.profileObj.name}</h3>
                    <h3>{profile.profileObj.email}</h3>
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
                            style={{ borderRadius: 100 }}
                            content={
                              <p>
                                You can save all your Work onto your
                                <strong> Google Drive</strong>, by clicking the
                                drive icon.
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
                      <Button
                        type="primary"
                        danger
                        style={{ borderRadius: 8, marginTop: 8 }}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </>
              </Route>
            </Switch>
          </Card>
        </div>
        <div className="section section2">
          <center>
            <h1>Movie PreProduction</h1>
          </center>
          <Layout
            style={{
              backgroundColor: 'white',
              margin: 20,
              borderRadius: 10,
              height: '50%',
            }}
          >
            <Content>
              <Button
                className="storyButton"
                shape="round"
                size="large"
                style={{ marginLeft: 20, border: 'none' }}
              >
                <Link className="storyLink" to="/storyline/new">
                  <span className="storySpan" style={{ fontSize: 18 }}>
                    Create Story
                  </span>
                  <PlusOutlined
                    className="storyIcon"
                    style={{ fontSize: 20 }}
                  />
                </Link>
              </Button>

              {stories &&
                Object.keys(stories).map((item, i) => (
                  <Col span={8} key={stories[item].id}>
                    <Link to={`/storyline/${stories[item].id}`}>
                      <Card
                        title={stories[item].title}
                        bordered
                        style={{
                          backgroundColor: '#f3f4f6',
                          marginTop: 20,
                          marginLeft: 20,
                          width: 400,
                          height: 200,
                          borderRadius: 12,
                        }}
                      />
                    </Link>
                  </Col>
                ))}
            </Content>
          </Layout>
        </div>
        <div className="section section3">
          <div className="tool-icons">
            <Button className="toolButton" size="large" shape="round">
              A
            </Button>
            <Button className="toolButton" size="large" shape="round">
              C
            </Button>
            <Button className="toolButton" size="large" shape="round">
              P
            </Button>
            <Button className="toolButton" size="large" shape="round">
              S
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
