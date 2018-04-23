import '../helpers/xuiGlobalChecks';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {enrichLinearProps} from './helpers/enrichprops';
import LinearTrack from './customElements/LinearTrack';
import ProgressWrapper from './customElements/ProgressWrapper';

const XUIProgressLinear = (props) => {

	return (
		<ProgressWrapper {...enrichLinearProps(props)}>
			{({id, isSegmented, total, progress}) => (
				<Fragment>
					<LinearTrack {...{id, isSegmented, total, progress}} />
				</ Fragment>
			)}
		</ProgressWrapper>
	);

};

export default XUIProgressLinear;

XUIProgressLinear.propTypes = {

	/** A unique ID that is used to generate SVG mask references and "Tool Tip" Aria references. */
	id: PropTypes.string.isRequired,

	/**`. */
	qaHook: PropTypes.string,

	/** The "total" amount of "units" to represent visually on the progress scale. */
	total: PropTypes.number,

	/** The amount of "progress" "units" in respect to the "total" value. */
	progress: PropTypes.number,

	/** Change the "track" from solid to a set of evenly spaced "segments" (one for each "total" unit). */
	isSegmented: PropTypes.bool,

	/** Set the component to "grow" both horizontally and vertically (not respecting the standard UI proportions) into its parent container and fill the space. */
	isGrow: PropTypes.bool,

	/** Show a "tool tip" when the mouse "enters" the UI. */
	hasToolTip: PropTypes.bool,

	/** Customise the "tool tip" message. */
	toolTipMessage: PropTypes.string,

	/** Allow the "progress" to be greater than the "total" and represent this discrepancy in the UI. */
	isOverflow: PropTypes.bool,

	/** Show the "progress" in an error state. */
	isSoftError: PropTypes.bool,

	/** A "color" key that overrides the default "total" gray track swatch. */
	totalColor: PropTypes.oneOf(['orange', 'yellow', 'green', 'mint', 'turquoise', 'blue', 'violet', 'grape', 'pink', 'grey', 'purple', 'lightGreen']),

	/** A "color" key that overrides the default "progress" blue track swatch. */
	progressColor: PropTypes.oneOf(['orange', 'yellow', 'green', 'mint', 'turquoise', 'blue', 'violet', 'grape', 'pink', 'grey', 'purple', 'lightGreen']),

};
