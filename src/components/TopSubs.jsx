import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';

import '../App.css';

function TopSubs (props) {
  const combinedPosts = sortPosts(props.combinedPosts, 'posts');
  const combinedKarma = sortPosts(props.combinedPosts, 'karma');

  const { inner, outer } = { inner: '50%', outer: '95%' };

  return (
    <div className='topSubs'>
      <Container>
        <Row>
          <h3>Top Subreddits</h3>
          <p>(Posts are both submissions and comments)</p>
          <Col md={6} style={{height: '30rem'}}>
            <h4>Posts</h4>
            <ResponsiveContainer height={'85%'}>
              <PieChart>
                <Pie isAnimationActive={false} data={combinedPosts} nameKey='subreddit' dataKey='posts'
                  innerRadius={inner} outerRadius={outer} fill='#F54B00' />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>
          <Col md={6} style={{height: '30rem'}}>
            <h4>Karma</h4>
            <ResponsiveContainer height={'85%'}>
              <PieChart>
                <Pie isAnimationActive={false} data={combinedKarma} nameKey='subreddit' dataKey='karma'
                  innerRadius={inner} outerRadius={outer} fill='#F54B00' />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

function sortPosts (combined, type) {
  let sortedPosts = combined.slice().sort((subA, subB) => {
    return subB[type] - subA[type];
  });

  return sortedPosts;
}

TopSubs.propTypes = {
  combinedPosts: PropTypes.array.isRequired
};

export default TopSubs;
