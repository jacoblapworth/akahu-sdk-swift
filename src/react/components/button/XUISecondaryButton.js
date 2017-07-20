import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import XUIButton from './XUIButton';
import XUIButtonCaret from './XUIButtonCaret';
import cn from 'classnames';
import { VariantClassNames, SizeClassNames, ButtonTypes } from './private/constants';

export default class XUISplitButton extends PureComponent {
	render() {
		const { className, ...spreadProps } = this.props;
		spreadProps.children = null;
		return (
			<XUIButton {...spreadProps} className={cn('xui-button-split', className)} isGrouped={true}>
				<XUIButtonCaret />
			</XUIButton>
		);
	}
}

XUISplitButton.propTypes = {
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** Determines if the button is disabled or not. */
	isDisabled: PropTypes.bool,

	/** If true, sets appropriate `rel` values to prevent new page from having access to `window.opener`. Should be used for links pointing at external sites. **/
	isExternalLink: PropTypes.bool,

	/** If true, shows a loader inside the button and also disables the button to prevent clicking. Can be used in conjunction with isDisabled (which also provides a disabled class)  */
	isLoading: PropTypes.bool,

	/** If this button is part of a parent button group */
	isGrouped: PropTypes.bool,

	/** A keydown event handler for the button */
	onKeyDown: PropTypes.func,

	/** Bind a function to fire when the button is clicked */
	onClick: PropTypes.func,

	/** Determines the styling variation to apply: `standard`, `primary`, `create`, `negative`, `link`, 'borderless-standard', 'borderless-primary', 'borderless-create', 'borderless-negative', 'borderless-negative', 'icon', 'icon-large', 'icon-inverted', 'icon-inverted-large' or `unstyled`. */
	variant: PropTypes.oneOf(Object.keys(VariantClassNames)),

	/** Modifier for the size of the button. `small`, `full-width`, or `full-width-layout`. */
	size: PropTypes.oneOf(Object.keys(SizeClassNames)),

	/** Whether or not to render this button using an <a> tag */
	isLink: PropTypes.bool,

	/** The type attribute of this button. `submit`, `button`, or `reset`. */
	type: PropTypes.oneOf(Object.keys(ButtonTypes).map(type => ButtonTypes[type])), // Can't use Object.values without polyfilling for older supported browsers

	/** The `href` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
	href: PropTypes.string,

	/** The `rel` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
	rel: PropTypes.string,

	/** The HTML tabIndex property to put on the component */
	tabIndex: PropTypes.number,

	/** The `target` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
	target: PropTypes.string,

	/** The `title` attribute for this button */
	title: PropTypes.string,
};

XUISplitButton.defaultProps = {
	tabIndex: 0,
	type: ButtonTypes.button,
	variant: 'standard',
	isLink: false,
	isDisabled: false,
	isExternalLink: false,
	isGrouped: false,
	isLoading: false
};
