import React from 'react';
import cn from 'classnames';
import CSSClasses from 'xui-css-classes';

const propTypes = {
	className: React.PropTypes.string,
	qaHook: React.PropTypes.string,
	label: React.PropTypes.string,
	defaultLayout: React.PropTypes.bool
};

const defaultProps = {
	defaultLayout: true
};

const XUILoader = (props) => {
	const className = cn(CSSClasses.Loader.BASE, props.className, (props.defaultLayout ? CSSClasses.Loader.LAYOUT : ''));
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
