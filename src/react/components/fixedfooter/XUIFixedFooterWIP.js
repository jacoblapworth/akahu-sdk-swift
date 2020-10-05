import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Portal } from 'react-portal';

import { ns } from '../helpers/xuiClassNamespace';
import portalContainer from '../helpers/portalContainer';
import { logWarning } from '../helpers/developmentConsole';

const baseClass = `${ns}-fixedfooter`;

const XUIFixedFooterWIP = ({ children, className, qaHook, ...spreadProps }) => {
  const [logged, setLogged] = useState(false);

  if (!logged) {
    setLogged(true);
    logWarning({ componentName: 'XUIFixedFooterWIP', flagType: 'wip' });
  }

  // Because we never know how tall a fixed footer is going to be or what its nearest siblings will be,
  // we can't set the proper spacing to prevent content from being hidden. Even the newer CSS
  // "position: sticky" would not quite work as desired, for content shorter than the viewport.
  // This is perhaps inelegant, but gets the job done. Watch out for cloned content with ids on
  // child elements, as they will also be duplicated.
  const cloneFooter = (
    <div
      {...spreadProps}
      aria-hidden
      className={cn(baseClass, className, `${baseClass}-clone`)}
      id={undefined} // Ensures that if an id is passed as a prop, we strip it from the clone.
      role="presentation"
    >
      {children}
    </div>
  );

  const visibleFooter = (
    <div {...spreadProps} className={cn(baseClass, className)} data-automationid={qaHook}>
      {children}
    </div>
  );

  return (
    <Portal node={portalContainer()}>
      <div className={`${baseClass}--wrapper ${ns}-container`}>
        {visibleFooter}
        {cloneFooter}
      </div>
    </Portal>
  );
};

XUIFixedFooterWIP.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

XUIFixedFooterWIP.defaultProps = {};

export { XUIFixedFooterWIP as default };
