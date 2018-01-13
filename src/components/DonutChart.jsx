import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-grid-system';
import { PieChart, Pie, ResponsiveContainer, Tooltip } from 'recharts';

import '../App.css';

function DonutChart (props) {
  return (
    <Col md={6} style={{height: '30rem'}}>
      <h4>{props.title}</h4>
      <ResponsiveContainer height={'85%'}>
        <PieChart>
          <Pie isAnimationActive={false} data={props.data} nameKey='subreddit' dataKey={props.dataKey}
            innerRadius={'50%'} outerRadius={'95%'} fill='#F54B00' />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Col>
  );
}

DonutChart.propTypes = {
  data: PropTypes.array.isRequired,
  dataKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default DonutChart;
