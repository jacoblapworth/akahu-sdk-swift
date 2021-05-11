import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import baseClass from './private/constants';

interface Props {
  children: React.ReactNode;
  className?: string;
  qaHook?: string;
}

const XUIIntroBannerFooter = ({ children, className, qaHook, ...spreadProps }: Props) => {
  const classes = cn(`${baseClass}--footer`, className);

  return (
    <footer {...spreadProps} className={classes} data-automationid={qaHook}>
      {children}
    </footer>
  );
};

XUIIntroBannerFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export { XUIIntroBannerFooter as default };
