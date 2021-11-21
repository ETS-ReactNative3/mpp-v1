/**
 *
 * Stories
 *
 */

import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { MoreOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Card from '../../mppComponents/MppCard/index';
import Row from '../../mppComponents/MppRow/index';
import Col from '../../mppComponents/MppCol/index';
import Button from '../../mppComponents/MppButton/index';
import './style.scss';
import variables from '../Dashboard/variable.module.scss';
import messages from './messages';

export function Stories() {
  const [stories, setStories] = useState([]);
  const { SubMenu } = Menu;

  const menu = {
    backgroundColor: variables.whiteColor,
  };

  const menuButton = {
    border: variables.border,
    boxShadow: variables.boxShadow,
    width: variables.width,
  };
  return (
    <>
      <div className="storiesMainDiv">
        <h3>Stories</h3>
      </div>
      <Row gutter={[16, 24]}>
        {stories &&
          // Object.keys(stories)
          stories.map((item, i) => (
            <Col md={12} lg={8} xl={6} key={item.sNo}>
              <Card
                className="storiesCard"
                title={item.title}
                extra={
                  <Menu
                    className="cardMenu"
                    mode="vertical"
                    expandIcon={
                      <MoreOutlined style={{ fontSize: 18, fontWeight: 600 }} />
                    }
                  >
                    <SubMenu key="sub2">
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
                        <Button danger style={menuButton}>
                          Delete
                        </Button>
                      </Menu.Item>
                    </SubMenu>
                  </Menu>
                }
                headStyle={{ fontSize: 18 }}
                bordered
              >
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
      </Row>
    </>
  );
}

Stories.propTypes = {
  // dispatch: PropTypes.func.isRequired,
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
)(Stories);
