import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const ExampleContainer = ({ children, className, isInverted, style }) => {
  const classnames = cn(
    {
      'xui-background-grey-1 xui-padding-small': isInverted,
    },
    className,
  );
  return (
    <div className={classnames} style={style}>
      {children}
    </div>
  );
};

export default ExampleContainer;

ExampleContainer.propTypes = {
  children: PropTypes.node,
  isInverted: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};
