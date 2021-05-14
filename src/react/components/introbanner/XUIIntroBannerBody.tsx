import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import baseClass from './private/constants';

interface Props {
  /**
   * The text content of the intro banner. We recommend providing this in the form of `<p>` elements.
   */
  children: React.ReactNode;
  className?: string;
  qaHook?: string;
}

const XUIIntroBannerBody = ({ children, className, qaHook, ...spreadProps }: Props) => {
  const classes = cn(`${baseClass}--body`, className);

  return (
    <div {...spreadProps} className={classes} data-automationid={qaHook}>
      {children}
    </div>
  );
};

XUIIntroBannerBody.propTypes = {
  /**
   * The text content of the intro banner. We recommend providing this in the form of `<p>` elements.
   */
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIIntroBannerBody;
