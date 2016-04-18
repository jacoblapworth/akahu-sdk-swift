import React from 'react';
import Component from 'xui-base-component';
import cn from 'classnames';
import CSSCLasses from 'xui-css-classes';

const propTypes = {
	className: React.PropTypes.string,
	label: React.PropTypes.string
};

export default class XUILoader extends Component {
	render() {

		const { className, label } = this.props;
		const classNames = cn(CSSCLasses.Loader.BASE, className);
		return (
			<div className={classNames} role="progressbar" aria-label={label} aria-busy="true">
				<div className={CSSCLasses.Loader.DOT} />
				<div className={CSSCLasses.Loader.DOT} />
				<div className={CSSCLasses.Loader.DOT} />
			</div>
		);
	}
}

XUILoader.propTypes = propTypes;
