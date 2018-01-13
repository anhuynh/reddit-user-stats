import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-grid-system';

import DonutChart from './DonutChart';
import '../App.css';

function TopSubs (props) {
  const combinedPosts = sortPosts(props.combinedPosts, 'posts');
  const combinedKarma = sortPosts(props.combinedPosts, 'karma');

  return (
    <div className='top-subs'>
      <Container>
        <Row>
          <h3>Top Subreddits</h3>
          <p>(Posts are both submissions and comments)</p>
          <DonutChart data={combinedPosts} dataKey='posts' title='Posts' />
          <DonutChart data={combinedKarma} dataKey='karma' title='Karma' />
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
