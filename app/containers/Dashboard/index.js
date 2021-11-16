/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { PlusOutlined, MoreOutlined } from '@ant-design/icons';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import './styles.scss';
import 'antd/dist/antd.css';

import Card from '../../mppComponents/MppCard/index';
import Row from '../../mppComponents/MppRow/index';
import Col from '../../mppComponents/MppCol/index';
import Skeleton from '../../mppComponents/MppSkeleton/index';
import Button from '../../mppComponents/MppButton/index';
import ProvideAuth, { useAuth, user } from '../../contexts/authContext';

import history from '../../utils/history';

import { GetDashboardInfo } from '../../utils/APIcalls/dashboard';
import { GetLocalStorage } from '../../utils/localStorage/storage.js';
import { data } from './dummyStory';

export default function Dashboard() {
  const [stories, setStories] = useState([]);
  const [recent, setRecent] = useState(data);
  const { SubMenu } = Menu;

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
        setStories(res);
        console.log(stories);
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
                    <Card
                      title={stories[item].title}
                      extra={
                        <Menu
                          mode="horizontal"
                          style={{
                            backgroundColor: '#F3F4F6',
                            border: 'none',
                          }}
                        >
                          <SubMenu
                            icon={
                              <MoreOutlined
                                style={{ fontSize: 18, fontWeight: 600 }}
                              />
                            }
                          >
                            <Menu.Item
                              key="1"
                              style={{ backgroundColor: 'white' }}
                            >
                              <Link to={`/storyline/${stories[item].id}`}>
                                <Button
                                  style={{
                                    width: '100%',
                                    border: 'none',
                                    boxShadow: 'none',
                                  }}
                                >
                                  Edit
                                </Button>
                              </Link>
                            </Menu.Item>
                            <Menu.Item
                              key="2"
                              style={{ backgroundColor: 'white' }}
                            >
                              <Button
                                style={{
                                  width: '100%',
                                  border: 'none',
                                  boxShadow: 'none',
                                }}
                              >
                                Share
                              </Button>
                            </Menu.Item>
                            <Menu.Item
                              key="3"
                              style={{ backgroundColor: 'white' }}
                            >
                              <Button
                                style={{
                                  width: '100%',
                                  border: 'none',
                                  boxShadow: 'none',
                                }}
                              >
                                Print
                              </Button>
                            </Menu.Item>
                            <Menu.Item
                              key="4"
                              style={{ backgroundColor: 'white' }}
                            >
                              <Button
                                danger
                                style={{
                                  width: '100%',
                                  border: 'none',
                                  boxShadow: 'none',
                                }}
                              >
                                Delete
                              </Button>
                            </Menu.Item>
                          </SubMenu>
                        </Menu>
                      }
                      headStyle={{ fontSize: 18 }}
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
                  </Col>
                ))}
          </Row>
        </div>
      </div>
    </>
  );
}
