import PropTypes from "prop-types";
import { VariantClassNames, SizeClassNames, ButtonTypes } from './constants';

// General Helpers
const keys = Object.keys;
const values = x => keys(x).map(k => x[k]);

export const ButtonPropTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
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

	/** Determines what the purpose of this button is. `standard`, `primary`, `create`, `negative`, `link` or `unstyled`. */
	variant: PropTypes.oneOf(keys(VariantClassNames)),

	/** Modifier for the size of the button. `small`, `full-width`, or `full-width-layout`. */
	size: PropTypes.oneOf(keys(SizeClassNames)),

	/** Whether or not to render this button using an <a> tag */
	isLink: PropTypes.bool,

	/** The type attribute of this button. `submit`, `button`, or `reset`. */
	type: PropTypes.oneOf(values(ButtonTypes)),

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

export const ButtonDefaultProps = {
	tabIndex: 0,
	type: ButtonTypes.button,
	variant: 'standard',
	isLink: false,
	isDisabled: false,
	isExternalLink: false,
	isGrouped: false,
	isLoading: false
};
