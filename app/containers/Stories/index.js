/**
 *
 * Stories
 *
 */

import React, { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import Card from '../../mppComponents/MppCard/index';
import Row from '../../mppComponents/MppRow/index';
import Col from '../../mppComponents/MppCol/index';

import { data } from '../Dashboard/dummyStory';

import messages from './messages';

export function Stories() {
  const [stories, setStories] = useState(data);
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
              <Link to={`/storyline/${stories[item].id}`}>
                <Card
                  title={stories[item].title}
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
              </Link>
            </Col>
          ))}
      </Row>
    </>
  );
}

Stories.propTypes = {
  dispatch: PropTypes.func.isRequired,
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
