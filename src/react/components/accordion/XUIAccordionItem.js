import { PureComponent } from 'react';
import PropTypes from 'prop-types';

class XUIAccordionItem extends PureComponent {
	// This component does not render anything. It is purely a way to capture and
	// validate the user facing props for an accordion "Item".

	// The way this component is used is by taking the supplied props from
	// this component and enriching them into a more advanced private component
	// with functionality outside of the users scope.
	render = () => null;
}

XUIAccordionItem.propTypes = {

	/** A space to accommodate additional content that is not addressed by the various "official" trigger props. */
	custom: PropTypes.node,

	/** Left most consumer specified component option, sits to the right of the caret. Typically an `avatar`, `checkbox` or `rollover checkbox` component. */
	leftContent: PropTypes.node,

	/* Plain text heading. */
	primaryHeading: PropTypes.node,

	/* Plain text secondary heading. */
	secondaryHeading: PropTypes.node,

	/* Text pinned to right side of the accordion item trigger. */
	pinnedValue: PropTypes.node,

	/* Optional actions to be right aligned. Use the XUIActions component. */
	action: PropTypes.node,

	/* Any component passed as right most content, typically a `dropdown toggled` component. */
	overflow: PropTypes.node,

	/** xxxxx */
	onItemClick: PropTypes.func,
};

export default XUIAccordionItem;
