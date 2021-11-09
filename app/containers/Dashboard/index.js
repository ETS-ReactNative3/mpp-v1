/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { CloseCircleOutlined } from '@ant-design/icons';

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
import ProvideAuth from '../../contexts/authContext';
import { useAuth, user } from '../../contexts/authContext';

import history from '../../utils/history';
import { Link } from 'react-router-dom';

import { GetDashboardInfo, linkDrive } from '../../utils/APIcalls/dashboard';
import { GetLocalStorage } from '../../utils/localStorage/storage.js';

export default function Dashboard() {
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
              width: '100%',
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
                      <Button
                        onClick={() => linkdrive()}
                        type="primary"
                        style={{ borderRadius: 8 }}
                      >
                        Link Drive
                      </Button>
                      <Button type="primary" danger style={{ borderRadius: 8 }}>
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
          <div className="cards-container">
            <Row gutter={16}>
              <Col span={8}>
                <Link to="/storyline/new">
                  <Button
                    className="storyButton"
                    size="large"
                    shape="round"
                    style={{ marginLeft: 20, border: 'none' }}
                  >
                    <span>Add Story</span>
                  </Button>
                </Link>
              </Col>

              {stories &&
                Object.keys(stories).map((item, i) => (
                  <Col span={8} key={stories[item].id}>
                    <Link to={`/storyline/${stories[item].id}`}>
                      <Card title={stories[item].title} bordered />
                    </Link>
                  </Col>
                ))}
            </Row>
          </div>
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
