import React from 'react';
import cn from 'classnames';

const baseClass = 'xui-loader';

const sizeMap = {
  standard: '',
  large: `${baseClass}-large`,
  small: `${baseClass}-small`
};

const XUILoader = (props) => {
  const sizeClass = sizeMap[props.size];
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
  className: React.PropTypes.string,

  /** @property {string} [qaHook] Adds data-automationid attribute with qaHook contents to the loader wrapping div */
  qaHook: React.PropTypes.string,

  /** @property {string} [label] adds aria-label to the loader wrapping div */
  label: React.PropTypes.string,

  /** @property {boolean} [defaultLayout] Defaults to `true`. Sets the default layout class on the loader wrapping div */
  defaultLayout: React.PropTypes.bool,

  /** @property {string} [size] Sets the size of the loader to be, small, standard (no class added), and large */
  size: React.PropTypes.oneOf(Object.keys(sizeMap))
};

XUILoader.defaultProps = {
  defaultLayout: true,
  size: 'standard'
};

export default XUILoader;
