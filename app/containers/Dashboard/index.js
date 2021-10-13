/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React,{useState,useEffect} from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

//import './styles.scss';
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

export default function Dashboard() {
  const auth = useAuth();
  return (
    <>
      <div className="container" style={{backgroundColor: '#eee'}}>
        <div className="section">
          
        <Card
          bordered={true}
          className="dashboard-profilecard"
          style={{ width: 300, marginTop: 16 }}
        >
          <Avatar src={auth.user.profileObj.imageUrl || null} />
          <br />
          <div>
            <center>
              <h3>{auth.user.profileObj.name || null}</h3>
              <br />
              <h3>{auth.user.profileObj.email || null}</h3>
              <br /><br />
              <Button
                type="primary"
                danger
                onClick={() => {auth.signout();history.push('/login')}}
              >
                Logout  
              </Button>
            </center>
            <br />
          </div>

        </Card>
        </div>
        <div className="section">
          <center><h1>Movie Pre Production</h1></center>
          <div className="cards-container">
            <Row gutter={16}>
              <Col span={8}>
                <Link to="/storyline/new">
                  <Card bordered={true}>
                    <center><h2>Add Story</h2></center>
                  </Card>
                </Link>
              </Col>
              <Col span={8}>
                <Card title="Card title" bordered={true}>
                  Card content
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Card title" bordered={true}>
                  Card content
                </Card>
              </Col>
            </Row>
             
          </div>
        </div>
        <div className="section">
          <center>
            <div className="tool-icons">
              <Button type="primary" shape="circle">A</Button><br />
              <Button type="primary" shape="circle">C</Button><br />
              <Button type="primary" shape="circle">P</Button><br />
              <Button type="primary" shape="circle">S</Button><br />
            </div>
          </center>
        </div>
      </div>
   
    </>
  );
}
