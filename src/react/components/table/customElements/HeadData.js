import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NBSP } from '../helpers/constants';

class HeadData extends PureComponent {
  render = () => {
    const { children, ...props } = this.props;

    return <th {...props}>{children || NBSP}</th>;
  };
}

HeadData.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,

  // Interaction.
  role: PropTypes.string,
  onClick: PropTypes.func,
  onFocus: PropTypes.func,
  onKeyDown: PropTypes.func,
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default HeadData;
