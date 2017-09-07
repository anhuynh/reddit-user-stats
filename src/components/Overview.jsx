import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import '../App.css';

import KarmaSummary from './KarmaSummary';

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
      comments: {
        total: this.props.comments.length,
        karma: commentKarma,
        karmaPer: this.props.comments.length === 0 ? 'N/A' : Math.round(commentKarma / this.props.comments.length)
      },
      submitted: {
        total: this.props.submitted.length,
        karma: submissionKarma,
        karmaPer: this.props.submitted.length === 0 ? 'N/A' : Math.round(submissionKarma / this.props.submitted.length)
      }
    };
  }

  getControversiality = () => {
    if (this.props.comments.length === 0) return 'N/A';
    let count = 0;

    this.props.comments.forEach((comment, i) => {
      count += comment.data.controversiality;
    });

    return Math.round((count / this.props.comments.length) * 100);
  }

  render () {
    const { about } = this.props;
    const { comments, submitted } = this.getKarmaSummaries();

    return (
      <div className='overview'>
        <h2>Stats for <a href={`https://reddit.com/u/${about.name}`}>{`/u/${about.name}`}</a></h2>
        <span>{this.getJoinedDateString(about.created_utc)}</span>
        <hr />
        <KarmaSummary comments={comments} submitted={submitted} controversial={this.getControversiality()} />
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
