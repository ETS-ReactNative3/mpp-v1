/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import './styles.scss';
import 'antd/dist/antd.css';

import {Layout} from '../../mppComponents/MppLayout/index.js'

const { Header, Sider, Content } = Layout;

export default function Dashboard() {
  return (
    <>
      <Layout>
        <Header><h2>Movie Pre Production</h2></Header>
        <Layout>
          <Sider>Sider</Sider>
          <Content>
          <Card title="Card title" bordered={true} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card title="Card title" bordered={true} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card title="Card title" bordered={true} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
