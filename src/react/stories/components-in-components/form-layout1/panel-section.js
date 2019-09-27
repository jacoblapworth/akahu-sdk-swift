import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class PanelSection extends React.PureComponent {
  render() {
    const { headerContent, formLayout, className, children } = this.props;

    const parentClasses = cn('xui-panel--section', className);

    const renderChildren = formLayout ? (
      <div className="xui-form-layout">{children}</div>
    ) : (
      children
    );

    return (
      <div className={parentClasses}>
        <div className="xui-panel--section--header">{headerContent}</div>
        {renderChildren}
      </div>
    );
  }
}
PanelSection.propTypes = {
  headerContent: PropTypes.any,
  formLayout: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
};
