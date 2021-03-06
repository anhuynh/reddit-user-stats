import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import '../App.css';

import KarmaSummary from './KarmaSummary';
import TopPosts from './TopPosts';
import TopSubs from './TopSubs';

class Overview extends Component {
  getJoinedDateString = (timestamp) => {
    const date = moment(timestamp * 1000).format('MMM D, YYYY');
    const fromNow = moment(timestamp * 1000).fromNow();
    return `Redditor since ${date} (${fromNow})`;
  }

  getKarmaSummaries = () => {
    const { submitted, comments } = this.props;
    let commentKarma = 0;
    comments.forEach(comment => {
      commentKarma += comment.data.score;
    });

    let submissionKarma = 0;
    submitted.forEach(submission => {
      submissionKarma += submission.data.score;
    });

    return {
      commentKarma: {
        total: comments.length,
        karma: commentKarma,
        karmaPer: comments.length === 0 ? 0 : Math.round(commentKarma / comments.length)
      },
      submittedKarma: {
        total: submitted.length,
        karma: submissionKarma,
        karmaPer: submitted.length === 0 ? 0 : Math.round(submissionKarma / submitted.length)
      }
    };
  }

  getControversiality = () => {
    if (this.props.comments.length === 0) return 0;
    let count = 0;

    this.props.comments.forEach((comment, i) => {
      count += comment.data.controversiality;
    });

    return Math.round((count / this.props.comments.length) * 100);
  }

  sortByScore = (array) => {
    return array.sort((itemA, itemB) => {
      return itemB.data.score - itemA.data.score;
    });
  }

  combinePosts = () => {
    const { submitted, comments } = this.props;
    let combinedPosts = {};

    combinedPosts = this.countSubs(submitted, combinedPosts);
    combinedPosts = this.countSubs(comments, combinedPosts);

    // convert to array for sorting
    combinedPosts = Object.keys(combinedPosts).map(subreddit => {
      return {
        subreddit,
        posts: combinedPosts[subreddit].count,
        karma: combinedPosts[subreddit].karma
      };
    });

    return combinedPosts;
  }

  countSubs = (posts, postCounts) => {
    let combinedPosts = postCounts;

    posts.forEach(submission => {
      const data = submission.data;

      if (combinedPosts.hasOwnProperty(data.subreddit)) {
        combinedPosts[data.subreddit].count++;
        combinedPosts[data.subreddit].karma += data.score;
      } else {
        combinedPosts[data.subreddit] = {
          count: 1,
          karma: data.score
        };
      }
    });

    return combinedPosts
  }

  render () {
    const { about, comments, submitted } = this.props;
    const { commentKarma, submittedKarma } = this.getKarmaSummaries();
    const sortedComments = this.sortByScore(comments);
    const sortedSubmissions = this.sortByScore(submitted);
    const combinedPosts = this.combinePosts();

    return (
      <div className='overview'>
        <h2>Stats for <a href={`https://reddit.com/u/${about.name}`}>{`/u/${about.name}`}</a></h2>
        <span>{this.getJoinedDateString(about.created_utc)}</span>
        {(comments.length > 0 || submitted.length > 0) &&
          <div>
            <hr />
            <KarmaSummary
              comments={commentKarma}
              submitted={submittedKarma}
              controversial={this.getControversiality()} />
            <TopPosts
              sortedSubmissions={sortedSubmissions}
              sortedComments={sortedComments} />
            <hr />
            <TopSubs combinedPosts={combinedPosts} />
          </div>
        }
        {comments.length === 0 && submitted.length === 0 &&
          <span style={{marginTop: '2em'}}>There are no comments or submissions for this user.</span>
        }
      </div>
    );
  }
}

Overview.propTypes = {
  about: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  submitted: PropTypes.array.isRequired
};

export default Overview;
