import React from 'react';
import cn from 'classnames';
import CSSCLasses from 'xui-css-classes';

const propTypes = {
	className: React.PropTypes.string,
	qaHook: React.PropTypes.string,
	label: React.PropTypes.string
};

const XUILoader = (props) => {
	return (
		<div data-automationid={props.qaHook} className={cn(CSSCLasses.Loader.BASE, props.className)} role="progressbar" aria-label={props.label} aria-busy="true">
			<div className={CSSCLasses.Loader.DOT} />
			<div className={CSSCLasses.Loader.DOT} />
			<div className={CSSCLasses.Loader.DOT} />
		</div>
	)
};

XUILoader.propTypes = propTypes;
export default XUILoader;
