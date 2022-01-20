import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseClass = `${ns}-filepreviewfooter`;

const XUIFilePreviewFooter = React.forwardRef(
  ({ children, className, footerTag, pagination, qaHook, ...spreadProps }, ref) => {
    const classes = cn(className, baseClass);

    const FooterElem = footerTag;

    return (
      <FooterElem className={classes} data-automationid={qaHook} ref={ref} {...spreadProps}>
        <div className={`${baseClass}--controls`}>{children}</div>
        {pagination && <div className={`${baseClass}--pagination`}>{pagination}</div>}
      </FooterElem>
    );
  },
);

export default XUIFilePreviewFooter;

XUIFilePreviewFooter.propTypes = {
  /**
   * Content to go in the footer. Typically this will be a set of controls.
   */
  children: PropTypes.node,
  /**
   * Classes to be applied to the filepreviewfooter element
   */
  className: PropTypes.string,
  /**
   * Tag type for the filepreviewfooter element. Defaults to 'footer'
   */
  footerTag: PropTypes.string,
  /**
   * Pagination component to be passed to the file preview footer.
   */
  pagination: PropTypes.node,
  qaHook: PropTypes.string,
};

XUIFilePreviewFooter.defaultProps = {
  footerTag: 'footer',
};
