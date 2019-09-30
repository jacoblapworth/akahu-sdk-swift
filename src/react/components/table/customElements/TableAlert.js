import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NAME_SPACE } from '../helpers/constants';

export default class TableAlert extends PureComponent {
  render = () => {
    const { children, qaHook } = this.props;
    return (
      <div className={`${NAME_SPACE}--alert`} data-automationid={qaHook}>
        {children}
      </div>
    );
  };
}

TableAlert.propTypes = {
  children: PropTypes.node,
  qaHook: PropTypes.string,
};
