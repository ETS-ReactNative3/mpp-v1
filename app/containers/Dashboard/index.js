/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { useState, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

// import './styles.scss';
import 'antd/dist/antd.css';

import Card from '../../mppComponents/MppCard/index.js';
import Row from '../../mppComponents/MppRow/index.js';
import Col from '../../mppComponents/MppCol/index.js';
import Skeleton from '../../mppComponents/MppSkeleton/index.js';
import Avatar from '../../mppComponents/MppAvatar/index.js';
import Button from '../../mppComponents/MppButton/index.js';
import { useAuth, user } from ProvideAuth from '../../contexts/authContext';


import history from '../../utils/history';
import { Link } from 'react-router-dom';

import { GetDashboardInfo } from '../../utils/APIcalls/dashboard';

export default function Dashboard() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    GetDashboardInfo()
      .then(res => {
        console.log(res);
        setStories(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  function linkDrive() {
    fetch('/api/google/linkDrive', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(res) {
        window.open(`${res.url}`)
      });
  }

  return (
    <>
      <div className="container" style={{ backgroundColor: '#eee' }}>
        <div className="section">
          <Card
            bordered
            className="dashboard-profilecard"
            style={{ width: 300, marginTop: 16 }}
          >
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <br />
            <div>
              <center>
                <h3>Profile Name</h3>
                <br />
                <h3>Description</h3>
                <br />
                <br />
                <Button onClick={linkDrive()} type="primary">
                  Link Drive
                </Button>
                <br />
                <Button type="primary" danger>
                  Logout
                </Button>
              </center>
              <br />
            </div>
          </Card>
        </div>
        <div className="section">
          <center>
            <h1>Movie Pre Production</h1>
          </center>
          <div className="cards-container">
            <Row gutter={16}>
              <Col span={8}>
                <Link to="/storyline/new">
                  <Card bordered>
                    <center>
                      <h2>Add Story</h2>
                    </center>
                  </Card>
                </Link>
              </Col>

              {stories &&
                Object.keys(stories).map((item, i) => (
                  <Col span={8}>
                    <Link to={`/storyline/${stories[item].id}`}>
                      <Card title={stories[item].title} bordered />
                    </Link>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
        <div className="section">
          <center>
            <div className="tool-icons">
              <Button type="primary" shape="circle">
                A
              </Button>
              <br />
              <Button type="primary" shape="circle">
                C
              </Button>
              <br />
              <Button type="primary" shape="circle">
                P
              </Button>
              <br />
              <Button type="primary" shape="circle">
                S
              </Button>
              <br />
            </div>
          </center>
        </div>
      </div>
    </>
  );
}
