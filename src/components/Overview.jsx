import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import '../App.css';

import KarmaSummary from './KarmaSummary';
import TopPosts from './TopPosts';

class Overview extends Component {
  getJoinedDateString = (timestamp) => {
    const date = moment(timestamp * 1000).format('MMM D, YYYY');
    const fromNow = moment(timestamp * 1000).fromNow();
    return `Redditor since ${date} (${fromNow})`;
  }

  getKarmaSummaries = () => {
    let commentKarma = 0;
    this.props.comments.forEach(comment => {
      commentKarma += comment.data.score;
    });

    let submissionKarma = 0;
    this.props.submitted.forEach(comment => {
      submissionKarma += comment.data.score;
    });

    return {
      commentKarma: {
        total: this.props.comments.length,
        karma: commentKarma,
        karmaPer: this.props.comments.length === 0 ? 0 : Math.round(commentKarma / this.props.comments.length)
      },
      submittedKarma: {
        total: this.props.submitted.length,
        karma: submissionKarma,
        karmaPer: this.props.submitted.length === 0 ? 0 : Math.round(submissionKarma / this.props.submitted.length)
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

  render () {
    const { about, comments, submitted } = this.props;
    const { commentKarma, submittedKarma } = this.getKarmaSummaries();
    const sortedComments = this.sortByScore(comments);
    const sortedSubmissions = this.sortByScore(submitted);

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
