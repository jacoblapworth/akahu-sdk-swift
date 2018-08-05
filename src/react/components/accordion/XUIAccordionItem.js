import { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class XUIAccordionItem extends PureComponent {
	// This component does not render anything. It is purely a way to capture and
	// validate the user facing props for an accordion "Item".

	// The way this component is used is by taking the supplied props from
	// this component and enriching them into a more advanced private component
	// with functionality outside of the users scope.
	render = () => null;
}

XUIAccordionItem.propTypes = {

	/** A space to accommodate additional content that is not addressed by the various _"official"_ trigger props. */
	custom: PropTypes.node,

	/** Left most consumer specified component option, sits to the right of the arrow. Typically an `<XUIAvatar />`, `<XUICheckbox />` or `<XUIRolloverCheckbox />` component. */
	leftContent: PropTypes.node,

	/** Primary heading content. */
	primaryHeading: PropTypes.node,

	/** Secondary heading content. */
	secondaryHeading: PropTypes.node,

	/** Pinned to right side of the accordion item trigger. */
	pinnedValue: PropTypes.node,

	/** Optional actions to be right aligned. Use the `<XUIActions />` component. */
	action: PropTypes.node,

	/** Any component passed as right most content, typically a `<DropDownToggled />` component. */
	overflow: PropTypes.node,

	/** Callback for a accordion item toggle. Returns the entire `item` from the `items` array in addition to an `isOpen` boolean representing the items toggled state. */
	onItemClick: PropTypes.func,
};
