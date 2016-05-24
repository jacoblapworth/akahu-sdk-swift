import React from 'react';
import cn from 'classnames';
import CSSClasses from 'xui-css-classes';

const sizeMap = {
	standard: CSSClasses.Loader.BASE,
	large: CSSClasses.Loader.LARGE,
	small: CSSClasses.Loader.SMALL
};

const propTypes = {
	className: React.PropTypes.string,
	qaHook: React.PropTypes.string,
	label: React.PropTypes.string,
	defaultLayout: React.PropTypes.bool,
	size: React.PropTypes.oneOf(Object.keys(sizeMap))
};

const defaultProps = {
	defaultLayout: true,
	size: 'standard'
};

const XUILoader = (props) => {
	const sizeClass = sizeMap[props.size];
	const className = cn(CSSClasses.Loader.BASE, sizeClass, props.className, (props.defaultLayout ? CSSClasses.Loader.LAYOUT : ''));

	return (
		<div data-automationid={props.qaHook} className={className} role="progressbar" aria-label={props.label} aria-busy="true">
			<div className={CSSClasses.Loader.DOT} />
			<div className={CSSClasses.Loader.DOT} />
			<div className={CSSClasses.Loader.DOT} />
		</div>
	)
};

XUILoader.propTypes = propTypes;
XUILoader.defaultProps = defaultProps;
export default XUILoader;
