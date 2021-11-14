/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';

import Dashboard from 'containers/Dashboard/Loadable';
import Login from 'containers/Login/Loadable';
import SideBar from 'containers/SideBar';
import Profile from 'containers/Profile';
import { Stories } from 'containers/Stories';
import HealthCheck from 'components/HealthCheck';
import PrivateRoute from 'components/PrivateRoute';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { createBrowserHistory } from 'history';
import { ProvideAuth } from '../../contexts/authContext';
import LogLine from '../Logline';
import GlobalStyle from '../../global-styles';
import Logline from '../Logline';
import { GetLocalStorage } from '../../utils/localStorage/storage';
import './style.scss';
import { Layout } from 'antd';

const history = createBrowserHistory();

export default function App() {
  const { Header, Content, Sider } = Layout;
  return (
    <>
      <ProvideAuth>
        <Router history={history}>
          <Layout className="mainLayout">
            <Sider breakpoint="lg" collapsedWidth="75" className="mainSider">
              <SideBar />
            </Sider>
            <Layout className="routesLayout">
              <Header className="routesHeader">Movie PreProduction</Header>
              <Content className="routesContent">
                <Switch>
                  <Route exact path="/">
                    <Dashboard />
                  </Route>
                  <Route exact path="/profile">
                    <Profile />
                  </Route>
                  <Route exact path="/stories">
                    <Stories />
                  </Route>
                  <Route exact path="/login">
                    <Login />
                  </Route>
                  <Route path="/storyline/:id">
                    <Logline />
                  </Route>
                  <Route exact path="/healthcheck" component={HealthCheck} />

                  <Route component={NotFoundPage} />
                </Switch>
              </Content>
            </Layout>
          </Layout>
        </Router>
      </ProvideAuth>
      <GlobalStyle />
    </>
  );
}
