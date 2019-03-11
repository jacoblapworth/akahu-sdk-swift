import PropTypes from 'prop-types';
import React from 'react';
import cn from 'classnames';
import '../helpers/xuiGlobalChecks';
import { sizeClassNames, baseClass } from './private/constants';

const dot = <div className={`${baseClass}--dot`} />;

const XUILoader = props => {
	const className = cn(
		baseClass,
		sizeClassNames[props.size],
		props.className,
		(props.defaultLayout && !props.retainLayout) && `${baseClass}-layout`,
		props.isInverted && `${baseClass}-inverted`,
		props.retainLayout && `${baseClass}-retain-layout`,
	);

	return (
		<div
			data-automationid={props.qaHook}
			className={className}
			role="progressbar"
			aria-label={props.ariaLabel}
		>
			{dot}{dot}{dot}
		</div>
	);
};

XUILoader.propTypes = {
	/** Add additional classes to the loader wrapping div */
	className: PropTypes.string,

	/** Adds data-automationid attribute with qaHook contents to the loader wrapping div */
	qaHook: PropTypes.string,

	/** adds aria-label to the loader wrapping div */
	ariaLabel: PropTypes.string,

	/** Defaults to `true`. Sets the default layout class on the loader wrapping div */
	defaultLayout: PropTypes.bool,

	/** Sets the size of the loader to be, medium (default), small, or xsmall */
	size: PropTypes.oneOf(Object.keys(sizeClassNames)),

	/** Sets the loader to the inverted colour scheme */
	isInverted: PropTypes.bool,

	/** Adds the retain layout class, used in combination with buttons. Applying this prop
	 * will cause `defaultLayout` prop to be ignored. */
	retainLayout: PropTypes.bool,
};

XUILoader.defaultProps = {
	defaultLayout: true,
	size: 'medium',
	ariaLabel: 'Loading',
};

export default XUILoader;
