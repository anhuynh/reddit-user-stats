import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';

import moment from 'moment';
import Parser from 'html-react-parser';
import marked from 'marked';

import '../App.css';

function TopPosts (props) {
  return (
    <Container className='top-posts'>
      {props.sortedSubmissions.length > 0 && renderSubmissions(props.sortedSubmissions)}
      {props.sortedComments.length > 0 && renderComments(props.sortedComments)}
    </Container>
  );
};

function renderSubmissions (submissions) {
  const topSubmission = submissions[0].data;
  const lowSubmission = submissions.length > 1 ? submissions[submissions.length - 1].data : null;

  return (
    <div>
      <hr />
      <Row>
        <Col key={topSubmission.name} md={6} className='post-section'>
          <h4>Top Submission</h4>
          <a href={`https://reddit.com${topSubmission.permalink}`}>{topSubmission.title}</a>
          {getPostDetails(topSubmission, 'submitted')}
        </Col>
        {lowSubmission &&
          <Col key={lowSubmission.name} md={6} className='post-section'>
            <h4>Lowest Submission</h4>
            <a href={`https://reddit.com${lowSubmission.permalink}`}>{lowSubmission.title}</a>
            {getPostDetails(lowSubmission, 'submitted')}
          </Col>
        }
      </Row>
    </div>
  );
}

function renderComments (comments) {
  const topComment = comments[0].data;
  const lowComment = comments.length > 1 ? comments[comments.length - 1].data : null;

  return (
    <div>
      <hr />
      <Row>
        <Col key={topComment.name} md={6} className='post-section'>
          <h4>Top Comment</h4>
          {getPostDetails(topComment, 'commented')}
          {Parser(marked(topComment.body))}
          <a href={`${topComment.link_permalink}${topComment.id}`} className='comment-link'>(permalink)</a>
        </Col>
        {lowComment &&
          <Col key={lowComment.name} md={6} className='post-section'>
            <h4>Lowest Comment</h4>
            {getPostDetails(lowComment, 'commented')}
            {Parser(marked(lowComment.body))}
            <a href={`${lowComment.link_permalink}${lowComment.id}`} className='comment-link'>(permalink)</a>
          </Col>
        }
      </Row>
    </div>
  );
}

function getPostDetails (item, type) {
  const points = (item.score === 1 || item.score === -1) ? ` point` : ` points`;
  const color = item.score > 0 ? '#F54B00' : '#C23628';

  return (
    <div>
      <span className='subtitle'>
        {`${type} ${moment(item.created_utc * 1000).fromNow()} in `}
        <a href={`https://reddit.com/r/${item.subreddit}`} className='comment-link'>{item.subreddit_name_prefixed}</a>
        {` with `}<span style={{ color }}>{item.score}</span>{points}
      </span>
      {type === 'submitted' &&
        <span className='subtitle'>{` and `}<span style={{ color }}>{item.num_comments}</span> comments</span>
      }
    </div>
  );
}

TopPosts.propTypes = {
  sortedSubmissions: PropTypes.array.isRequired,
  sortedComments: PropTypes.array.isRequired
};

export default TopPosts;
