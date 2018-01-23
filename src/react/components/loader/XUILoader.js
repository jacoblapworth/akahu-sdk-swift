import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import { sizeClassNames } from './private/constants';

const baseClass = 'xui-loader';

const XUILoader = (props) => {
  const sizeClass = sizeClassNames[props.size];
  const className = cn(
    baseClass,
    sizeClass,
    props.className,
    {
      [`${baseClass}-layout`] : !props.retainLayout && props.defaultLayout,
      [`${baseClass}-inverted`] : props.isInverted,
      [`${baseClass}-retain-layout`] : props.retainLayout
    }
	);

  return (
    <div data-automationid={props.qaHook} className={className} role="progressbar" aria-label={props.label}>
      {
        [1,2,3].map(loaderDot => <div className={`${baseClass}--dot`} key={loaderDot}/>)
      }
    </div>
  )
};

XUILoader.propTypes = {
  /** Add additional classes to the loader wrapping div */
  className: PropTypes.string,

  /** Adds data-automationid attribute with qaHook contents to the loader wrapping div */
  qaHook: PropTypes.string,

  /** adds aria-label to the loader wrapping div */
  label: PropTypes.string,

  /** Defaults to `true`. Sets the default layout class on the loader wrapping div */
  defaultLayout: PropTypes.bool,

  /** Sets the size of the loader to be, small, standard (no class added), and large */
  size: PropTypes.oneOf(Object.keys(sizeClassNames)),

  /** Sets the loader to the inverted colour scheme */
  isInverted: PropTypes.bool,

  /** Adds the retain layout class, used in combination with buttons. Applying this prop will cause `defaultLayout` prop to be ignored. */
  retainLayout: PropTypes.bool
};

XUILoader.defaultProps = {
  defaultLayout: true,
  size: 'standard'
};

export default XUILoader;
