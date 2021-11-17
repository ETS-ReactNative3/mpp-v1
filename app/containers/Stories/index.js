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

import { data } from '../Dashboard/dummyStory';

import messages from './messages';

export function Stories() {
  const [stories, setStories] = useState(data);
  const { SubMenu } = Menu;
  return (
    <>
      <div
        style={{
          marginTop: 15,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <h3 style={{ color: 'black' }}>Stories</h3>
      </div>
      <Row gutter={[16, 24]}>
        {stories &&
          Object.keys(stories).map((item, i) => (
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
                      <Menu.Item key="1" style={{ backgroundColor: 'white' }}>
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
                      <Menu.Item key="2" style={{ backgroundColor: 'white' }}>
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
                      <Menu.Item key="3" style={{ backgroundColor: 'white' }}>
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
                      <Menu.Item key="4" style={{ backgroundColor: 'white' }}>
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
                  marginLeft: 8,
                  marginTop: 10,
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
                    {stories[item].logLine}
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
                    {stories[item].theme}
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
                    {stories[item].genre}
                  </span>
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
