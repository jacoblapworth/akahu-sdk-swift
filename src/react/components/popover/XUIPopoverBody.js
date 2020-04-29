import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import IdContext from './contexts/IdContext';
import { baseClassName } from './private/constants';

const XUIPopoverBody = ({ className, children, qaHook }) => {
  return (
    <IdContext.Consumer>
      {({ bodyId }) => (
        <div
          className={cn(`${baseClassName}--body`, className)}
          data-automationid={qaHook}
          id={bodyId}
        >
          {children}
        </div>
      )}
    </IdContext.Consumer>
  );
};

XUIPopoverBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  qaHook: PropTypes.string,
};

export default XUIPopoverBody;
