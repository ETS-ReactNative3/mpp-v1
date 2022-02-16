/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Menu } from 'antd';
import { PlusOutlined, MoreOutlined, LoadingOutlined } from '@ant-design/icons';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import './styles.scss';
import variables from './variable.module.scss';
import 'antd/dist/antd.css';
import Card from '../../mppComponents/MppCard/index';
import Row from '../../mppComponents/MppRow/index';
import Col from '../../mppComponents/MppCol/index';
import Skeleton from '../../mppComponents/MppSkeleton/index';
import Button from '../../mppComponents/MppButton/index';
import ProvideAuth, { useAuth, user } from '../../contexts/authContext';
import history from '../../utils/history';
import { GetDashboardInfo } from '../../utils/APIcalls/dashboard';
import { GetLocalStorage } from '../../utils/localStorage/storage';

export default function Dashboard() {
  const [stories, setStories] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const { SubMenu } = Menu;

  const profile = GetLocalStorage('user');

  const menu = {
    backgroundColor: variables.whiteColor,
  };

  const menuButton = {
    border: variables.border,
    boxShadow: variables.boxShadow,
    width: variables.width,
  };

  useEffect(() => {
    let token;
    if (profile) {
      token = profile.tokenId;
    }
    // console.log(token);

    GetDashboardInfo(token).then(res => {
      console.log(res.msg);
      if (res.msg === 'NOT VALID') {
        return history.push('/login');
      }
      setStories(res);
      console.log(stories);
    });

    setTimeout(() => setLoading(false), 5000);
  }, []);

  return (
    <>
      <div className="dashboardContent">
        <div className="actions">
          <Button className="storyButton" shape="round" size="large">
            <Link className="storyLink" to="/storyline/new">
              <span className="storySpan">Create Story</span>
              <PlusOutlined className="storyIcon" />
            </Link>
          </Button>
          <Button className="storyButton" shape="round" size="large">
            <Link className="storyLink" to="/screenplay/new">
              <span className="storySpan">Write screenplay</span>
              <PlusOutlined className="storyIcon" />
            </Link>
          </Button>
        </div>
        {/* recent stories section */}
        <div className="recent">
          <h3>Recent</h3>

          {recent.map((item, i) => (
            <Col md={12} lg={8} key={item.sNo}>
              <Card className="recentCard" title={item.title} bordered>
                <p>
                  LogLine:
                  <span>{item.logLine}</span>
                </p>
                <p>
                  Theme:
                  <span>{item.theme}</span>
                </p>
                <p>
                  Genre:
                  <span>{item.genre}</span>
                </p>
              </Card>
            </Col>
          ))}
        </div>
        {/* All stories section */}
        <div className="allStories">
          {loading ? (
            <>
              <LoadingOutlined className="storiesSpinner" />
            </>
          ) : (
            <>
              <div className="storiesHeading">
                <h3>All Stories</h3>
                <Link className="allStoriesLink" to="/stories">
                  See All
                </Link>
              </div>
              <div className="stories-list">
                {stories &&
                  stories.length > 0 &&
                  // Object.keys(stories)
                  stories.splice(0, 4).map((item, i) => (
                    <Card
                      className="storiesCard"
                      title={item.title}
                      extra={
                        <Menu
                          className="storiesMenu"
                          mode="vertical"
                          expandIcon={
                            <MoreOutlined
                              style={{ fontSize: 18, fontWeight: 600 }}
                            />
                          }
                        >
                          <SubMenu key="sub1">
                            <Menu.Item key="1" style={menu}>
                              <Link to={`/storyline/${item.id}`}>
                                <Button style={menuButton}>Edit</Button>
                              </Link>
                            </Menu.Item>
                            <Menu.Item key="2" style={menu}>
                              <Button style={menuButton}>Share</Button>
                            </Menu.Item>
                            <Menu.Item key="3" style={menu}>
                              <Button style={menuButton}>Print</Button>
                            </Menu.Item>
                            <Menu.Item key="4" style={menu}>
                              <Link to={`/storyline/${item.id}`}>
                                <Button danger style={menuButton}>
                                  Delete
                                </Button>
                              </Link>
                            </Menu.Item>
                          </SubMenu>
                        </Menu>
                      }
                      headStyle={{ fontSize: 18 }}
                      bordered
                    >
                      <p>
                        LogLine:
                        <span>{item.ownerNames}</span>
                      </p>
                      <p>
                        Theme:
                        <span>{item.theme}</span>
                      </p>
                      <p>
                        Genre:
                        <span>{item.genre}</span>
                      </p>
                    </Card>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
