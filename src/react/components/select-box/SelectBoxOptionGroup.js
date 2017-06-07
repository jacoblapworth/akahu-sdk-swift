import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Constants from './Constants';

export default class SelectBoxOptionGroup extends PureComponent {
	render () {
		const props = this.props;
		const classNames = cn('xui-dropdownmenu--groupheading',
			{
				'xui-dropdownmenu--groupheading-layout': props.defaultLayout,
				[props.className]: !!props.className
			});

		return (
			<li tabIndex={-1} className={Constants.CLASSES.GROUP_ITEM}>
				{props.label ? <h3 className={classNames}>{props.label}</h3> : null}
				<ul className="xui-menugroup">
					{props.children}
				</ul>
			</li>
		);
	}
}

SelectBoxOptionGroup.propTypes = {
	children: PropTypes.node,

	/** @property {String} [label] Group heading to be displayed over the option group */
	label: PropTypes.string,

	/** @property {String} [className] optional className  */
	className: PropTypes.string,

	/** @property {boolean} [defaultLayout] Use XUI provided layout classes  */
	defaultLayout: PropTypes.bool
};

SelectBoxOptionGroup.defaultProps = {
	defaultLayout: true
};
