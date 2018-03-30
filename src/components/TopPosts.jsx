import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-grid-system';

import moment from 'moment';
import Parser from 'html-react-parser';
import marked from 'marked';

import '../App.css';
import {types, titles, ranks} from './typesEnum'

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
        {renderSection(topSubmission, types.SUBMITTED, ranks.TOP)}
        {lowSubmission &&
          renderSection(lowSubmission, types.SUBMITTED, ranks.LOW)
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
        {renderSection(topComment, types.COMMENTS, ranks.TOP)}
        {lowComment &&
          renderSection(lowComment, types.COMMENTS, ranks.LOW)
        }
      </Row>
    </div>
  );
}

function renderSection (post, postType, type) {
  const title = titles[postType];
  const postTitle = postType === types.SUBMITTED
    ? (<a href={`https://reddit.com${post.permalink}`}>{post.title}</a>) : '';
  let postDetailType = postType;
  let postBody = '';

  if (postType === types.COMMENTS) {
    postDetailType = 'commented';
    postBody = (
      <div>
        {Parser(marked(post.body))}
        <a href={`${post.link_permalink}${post.id}`} className='comment-link'>(permalink)</a>
      </div>
    );
  }

  return (
    <Col key={post.name} md={6} className='post-section'>
      <h4>{`${type} ${title}`}</h4>
      {postTitle}
      {getPostDetails(post, postDetailType)}
      {postBody}
    </Col>
  );
}

function getPostDetails (post, type) {
  const points = (post.score === 1 || post.score === -1) ? ' point' : ' points';
  const comments = post.num_comments === 1 ? ' comment' : ' comments';
  const color = post.score > 0 ? '#F54B00' : '#C23628';

  return (
    <div>
      <span className='subtitle'>
        {`${type} ${moment(post.created_utc * 1000).fromNow()} in `}
        <a href={`https://reddit.com/r/${post.subreddit}`} className='comment-link'>{post.subreddit_name_prefixed}</a>
        {` with `}<span style={{ color }}>{post.score}</span>{points}
      </span>
      {type === types.SUBMITTED &&
        <span className='subtitle'>{` and `}<span style={{ color }}>{post.num_comments}</span>{comments}</span>
      }
    </div>
  );
}

TopPosts.propTypes = {
  sortedSubmissions: PropTypes.array.isRequired,
  sortedComments: PropTypes.array.isRequired
};

export default TopPosts;
