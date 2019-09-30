import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

export default function ExampleContainer({ isInverted, className, style, children }) {
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
}

ExampleContainer.propTypes = {
  children: PropTypes.node,
  isInverted: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
};
