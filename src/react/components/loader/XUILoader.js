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
      [`${baseClass}-layout`] : props.defaultLayout
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
  /** @property {string} [className] Add additional classes to the loader wrapping div */
  className: PropTypes.string,

  /** @property {string} [qaHook] Adds data-automationid attribute with qaHook contents to the loader wrapping div */
  qaHook: PropTypes.string,

  /** @property {string} [label] adds aria-label to the loader wrapping div */
  label: PropTypes.string,

  /** @property {boolean} [defaultLayout=true] Defaults to `true`. Sets the default layout class on the loader wrapping div */
  defaultLayout: PropTypes.bool,

  /** @property {string} [size='standard'] Sets the size of the loader to be, small, standard (no class added), and large */
  size: PropTypes.oneOf(Object.keys(sizeClassNames))
};

XUILoader.defaultProps = {
  defaultLayout: true,
  size: 'standard'
};

export default XUILoader;