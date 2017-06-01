import { PropTypes } from 'react';
import { VariantClassNames, SizeClassNames, ButtonTypes } from './constants';

// General Helpers
const keys = Object.keys;
const values = x => keys(x).map(k => x[k]);

export const ButtonPropTypes = {
	className: PropTypes.string,
	children: PropTypes.node,
	qaHook: PropTypes.string,

	/** @property {boolean} [isDisabled=false] Determines if the button is disabled or not. */
	isDisabled: PropTypes.bool,

	/** @property {string} [isExternalLink=false] If true, sets appropriate `rel` values to prevent new page from having access to `window.opener`. Should be used for links pointing at external sites. **/
	isExternalLink: PropTypes.bool,

	/** @property {boolean} [isLoading=false] If true, shows a loader inside the button and also disables the button to prevent clicking. Can be used in conjunction with isDisabled (which also provides a disabled class)  */
	isLoading: PropTypes.bool,

	/** @property {boolean} [isGrouped=false] If this button is part of a parent button group */
	isGrouped: PropTypes.bool,

	/** @property {function} [onKeyDown] A keydown event handler for the button */
	onKeyDown: PropTypes.func,

	/** @property {function} [onClick] Bind a function to fire when the button is clicked */
	onClick: PropTypes.func,

	/** @property {string} [variant='standard'] Determines what the purpose of this button is. `standard`, `primary`, `create`, `negative`, `link` or `unstyled`. */
	variant: PropTypes.oneOf(keys(VariantClassNames)),

	/** @property {string} [size] Modifier for the size of the button. `small`, `full-width`, or `full-width-layout`. */
	size: PropTypes.oneOf(keys(SizeClassNames)),

	/** @property {boolean} [isLink=false] Whether or not to render this button using an <a> tag */
	isLink: PropTypes.bool,

	/** @property {string} [type='button'] The type attribute of this button. `submit`, `button`, or `reset`. */
	type: PropTypes.oneOf(values(ButtonTypes)),

	/** @property {string} [href] The `href` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
	href: PropTypes.string,

	/** @property {string} [rel] The `rel` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
	rel: PropTypes.string,

	/** @property {number} [tabIndex=0] The HTML tabIndex property to put on the component */
	tabIndex: PropTypes.number,

	/** @property {string} [target] The `target` attribute to use on the anchor element (ignored unless `isLink` is `true`) */
	target: PropTypes.string,

	/** @property {string} [title] The `title` attribute for this button */
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
