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
        </Col>
        {lowComment &&
          <Col key={lowComment.name} md={6} className='post-section'>
            <h4>Lowest Comment</h4>
            {getPostDetails(lowComment, 'commented')}
            {Parser(marked(lowComment.body))}
          </Col>
        }
      </Row>
    </div>
  );
}

function getPostDetails (item, type) {
  const score = item.score === 1 ? `1 point` : `${item.score} points`;

  const aTag = type === 'commented'
    ? (<a href={item.link_url} className='comment-link'>{item.subreddit_name_prefixed}</a>)
    : (<a href={`https://reddit.com/r/${item.subreddit}`} className='comment-link'>{item.subreddit_name_prefixed}</a>);
  return (
    <div>
      <span>{`${type} ${moment(item.created_utc * 1000).fromNow()} in `}</span>
      {aTag}
      <span>{` with ${score}`}</span>
    </div>
  );
}

TopPosts.propTypes = {
  sortedSubmissions: PropTypes.array.isRequired,
  sortedComments: PropTypes.array.isRequired
};

export default TopPosts;
