import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';

export const TabButtonRenderer = ({ classes, name, className, onClick, active, children }) => {
  const classNames = cx(classes.button, className, {
    [classes.isActive]: active,
  });

  return (
    <button
      type="button"
      name={name}
      className={classNames}
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </button>
  );
};

TabButtonRenderer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
TabButtonRenderer.defaultProps = {
  active: false,
};

export default TabButtonRenderer;
