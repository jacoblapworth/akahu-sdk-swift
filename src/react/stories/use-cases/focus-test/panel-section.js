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
        <header className="xui-panel--header xui-padding-horizontal-small xui-u-flex xui-u-flex-align-center">
          <div className="xui-panel--heading xui-margin-left-small">{headerContent}</div>
        </header>
        <div className="xui-panel--section">{renderChildren}</div>
      </div>
    );
  }
}
PanelSection.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  formLayout: PropTypes.bool,
  headerContent: PropTypes.any,
};
