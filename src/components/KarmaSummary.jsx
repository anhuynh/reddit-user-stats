import React from 'react';
import PropTypes from 'prop-types';

import '../App.css';

function KarmaSummary (props) {
  const { comments, submitted, controversial } = props;

  return (
    <div className='karma-summary'>
      <h3>Karma Summary</h3>
      <div className='karma-circles'>
        <div className='karma-row'>
          {renderKarmaCircle('submitted', submitted)}
        </div>
        <div className='karma-row'>
          {renderKarmaCircle('comments', comments)}
        </div>
        <div className='karma-row'>
          <div className='karma-circle controversial'>
            <div>{`${controversial}%`}</div>
            <span>Controversial comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function renderKarmaCircle (type, data) {
  let combined = [];
  if (type === 'comments') {
    combined = [
      {
        value: data.total,
        subtitle: 'Comments'
      },
      {
        value: data.karma,
        subtitle: 'Comment karma'
      },
      {
        value: data.karmaPer,
        subtitle: 'Karma per comment'
      }
    ];
  } else if (type === 'submitted') {
    combined = [
      {
        value: data.total,
        subtitle: 'Submissions'
      },
      {
        value: data.karma,
        subtitle: 'Submission karma'
      },
      {
        value: data.karmaPer,
        subtitle: 'Karma per submission'
      }
    ];
  }
  return combined.map(item => {
    return (
      <div key={item.subtitle} className='karma-circle'>
        <div>{item.value}</div>
        <span>{item.subtitle}</span>
      </div>
    );
  });
}

KarmaSummary.propTypes = {
  comments: PropTypes.object.isRequired,
  submitted: PropTypes.object.isRequired,
  controversial: PropTypes.number.isRequired
};

export default KarmaSummary;
