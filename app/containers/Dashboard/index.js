/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Layout } from 'antd';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import './styles.scss';
import 'antd/dist/antd.css';

import Card from '../../mppComponents/MppCard/index';
import Row from '../../mppComponents/MppRow/index';
import Col from '../../mppComponents/MppCol/index';
import Skeleton from '../../mppComponents/MppSkeleton/index';
import Button from '../../mppComponents/MppButton/index';
// import { useAuth, user } from ProvideAuth from '../../contexts/authContext';

import history from '../../utils/history';

import { GetDashboardInfo } from '../../utils/APIcalls/dashboard';
import { GetLocalStorage } from '../../utils/localStorage/storage.js';
import { data } from './dummyStory';

export default function Dashboard() {
  const { Content } = Layout;
  const [stories, setStories] = useState(data);
  const [recent, setRecent] = useState(data);

  const profile = GetLocalStorage('user');

  console.log('profile', profile);

  useEffect(() => {
    let token;
    if (profile) {
      token = profile.tokenId;
    }
    console.log(token);

    const recentStory = data.filter(rec => {
      if (rec.timeLine === 'now') {
        return rec;
      }
    });
    setRecent(recentStory);

    GetDashboardInfo(token)
      .then(res => {
        console.log(res);
        // setStories(res);
        // console.log(stories);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, []);

  return (
    <>
      <div className="dashboardContent">
        <Button
          className="storyButton"
          shape="round"
          size="large"
          style={{ border: 'none' }}
        >
          <Link className="storyLink" to="/storyline/new">
            <span className="storySpan" style={{ fontSize: 18 }}>
              Create Story
            </span>
            <PlusOutlined
              className="storyIcon"
              style={{ fontSize: 20, marginLeft: 10 }}
            />
          </Link>
        </Button>
        {/* recent stories section */}
        <div className="recent">
          <h3 style={{ color: 'black', marginTop: 15 }}>Recent</h3>
          <Row gutter={[16, 24]}>
            {recent.map((item, i) => (
              <Col md={12} lg={8} key={item.sNo}>
                <Card
                  title={item.title}
                  bordered
                  style={{
                    backgroundColor: '#f3f4f6',
                    marginLeft: 7,
                    borderRadius: 12,
                  }}
                >
                  <p style={{ fontSize: 15, fontWeight: 600 }}>
                    LogLine:
                    <span
                      style={{
                        marginLeft: 5,
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      {item.logLine}
                    </span>
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 600 }}>
                    Theme:
                    <span
                      style={{
                        marginLeft: 5,
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      {item.theme}
                    </span>
                  </p>
                  <p style={{ fontSize: 15, fontWeight: 600 }}>
                    Genre:
                    <span
                      style={{
                        marginLeft: 5,
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      {item.genre}
                    </span>
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        {/* All stories section */}
        <div className="allStories">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 15,
            }}
          >
            <h3 style={{ color: 'black' }}>All Stories</h3>
            <Link to="/stories" style={{ fontSize: 15 }}>
              See All
            </Link>
          </div>
          <Row gutter={[16, 24]}>
            {stories &&
              Object.keys(stories)
                .splice(0, 4)
                .map((item, i) => (
                  <Col md={12} lg={8} xl={6} key={stories[item].id}>
                    <Link to={`/storyline/${stories[item].id}`}>
                      <Card
                        title={stories[item].title}
                        headStyle={{ fontSize: 22 }}
                        bordered
                        style={{
                          backgroundColor: '#f3f4f6',
                          marginLeft: 6,
                          borderRadius: 12,
                        }}
                      >
                        <p style={{ fontSize: 16, fontWeight: 600 }}>
                          LogLine:
                          <span
                            style={{
                              marginLeft: 5,
                              fontSize: 15,
                              fontWeight: 400,
                            }}
                          >
                            {stories[item].logLine}
                          </span>
                        </p>
                        <p style={{ fontSize: 16, fontWeight: 600 }}>
                          Theme:
                          <span
                            style={{
                              marginLeft: 5,
                              fontSize: 15,
                              fontWeight: 400,
                            }}
                          >
                            {stories[item].theme}
                          </span>
                        </p>
                        <p style={{ fontSize: 16, fontWeight: 600 }}>
                          Genre:
                          <span
                            style={{
                              marginLeft: 5,
                              fontSize: 15,
                              fontWeight: 400,
                            }}
                          >
                            {stories[item].genre}
                          </span>
                        </p>
                      </Card>
                    </Link>
                  </Col>
                ))}
          </Row>
        </div>
      </div>
    </>
  );
}
