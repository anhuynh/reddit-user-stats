import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-grid-system';
import { Cell, PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';

import '../App.css';

function DonutChart (props) {
  const colors = ['#F54B00', '#62625A', '#C5C5BD', '#ACACAC', '#949C9C', '#6A6A6A', '#A4A4A4', '#B4B4BD'];

  return (
    <Col md={6} style={{height: '30rem'}}>
      <h4>{props.title}</h4>
      <ResponsiveContainer height={'85%'}>
        <PieChart>
          <Pie isAnimationActive={false} data={props.data} nameKey='subreddit' dataKey={props.dataKey}
            innerRadius={'50%'} outerRadius={'95%'} fill='#F54B00' onClick={handleClick} style={{cursor: 'pointer'}}>
            {props.data.map((entry, index) => <Cell fill={colors[index % colors.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Col>
  );
}

function handleClick (sector) {
  window.open(`https://reddit.com/r/${sector.subreddit}`, '_blank');
}

DonutChart.propTypes = {
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default DonutChart;
