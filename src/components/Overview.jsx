import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import '../App.css';

class Overview extends Component {
  getJoinedDateString = (timestamp) => {
    const date = moment(timestamp * 1000).format('MMM D, YYYY');
    const fromNow = moment(timestamp * 1000).fromNow();
    return `Redditor since ${date} (${fromNow})`;
  }

  render () {
    const { about } = this.props;

    return (
      <div className='Overview'>
        <h2>Stats for <a href={`https://reddit.com/u/${about.name}`}>{`/u/${about.name}`}</a></h2>
        <span>{this.getJoinedDateString(about.created_utc)}</span>
      </div>
    );
  }
}

Overview.propTypes = {
  about: PropTypes.object.isRequired
};

export default Overview;
