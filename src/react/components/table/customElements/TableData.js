/* eslint-disable react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import HeadData from './HeadData';
import BodyData from './BodyData';

const TableData = ({ isHead, ...props }) =>
  isHead ? <HeadData {...props} /> : <BodyData {...props} />;

TableData.propTypes = {
  isHead: PropTypes.bool,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // Ignore remaining props - we address them in <HeadData /> and <BodyData />.
};

export default TableData;
