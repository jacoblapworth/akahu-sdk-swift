import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';
import useResizeObserver from '../helpers/useResizeObserver';

const baseClass = `${ns}-filepreview`;
const FOOTER_HEIGHT = '60';

const XUIFilePreview = ({ children, className, footer, header, qaHook, ...spreadProps }) => {
  const {
    contentRect: { height: headerHeight },
    observedElementRef,
  } = useResizeObserver();

  const [styles, setStyles] = useState();

  useEffect(() => {
    // Set the height of the file preview body component, based on the height of the header and footer
    setStyles({ height: `calc(100% - (${headerHeight}px + ${FOOTER_HEIGHT}px))` });
  }, [headerHeight]);

  const classes = cn(baseClass, className);

  return (
    <div {...spreadProps} className={classes} data-automationid={qaHook}>
      {header && <div ref={observedElementRef}>{header}</div>}
      <div
        className={`${baseClass}--body`}
        data-automationid={qaHook && `${qaHook}-body}`}
        style={styles}
      >
        {children}
      </div>
      {footer}
    </div>
  );
};

export default XUIFilePreview;

XUIFilePreview.propTypes = {
  /**
   * Content to go in the grey body area
   */
  children: PropTypes.node,
  /**
   * Classes to be applied to the filepreview wrapping element
   */
  className: PropTypes.string,
  /**
   * Footer component
   */
  footer: PropTypes.node,
  /**
   * Header component
   */
  header: PropTypes.node,
  qaHook: PropTypes.string,
};

XUIFilePreview.defaultProps = {};
