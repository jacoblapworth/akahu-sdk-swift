import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import '../helpers/xuiGlobalChecks';
import { enrichCircularProps } from './helpers/enrichprops';
import CircularTrack from './customElements/CircularTrack';
import CircularIcon from './customElements/CircularIcon';
import ProgressWrapper from './customElements/ProgressWrapper';

import '../../../sass/7-components/_progressindicator.scss';

const XUIProgressCircular = props => (
	<ProgressWrapper {...enrichCircularProps(props)}>
		{({
			id,
			qaHook,
			isSegmented,
			total,
			progress,
			isGrow,
			thickness,
			isComplete,
			isHardError,
			hardErrorAlert,
			customContent,
		}) => (
			<Fragment>
				<CircularTrack {...{
					id,
					qaHook,
					isSegmented,
					total,
					progress,
					isGrow,
					thickness,
					customContent,
				}}
				/>

				<CircularIcon
					{...{ isComplete, isHardError, hardErrorAlert }}
				/>
			</Fragment>
		)}
	</ProgressWrapper>
);

export default XUIProgressCircular;

XUIProgressCircular.propTypes = {

	/** A unique ID that is used to generate SVG mask references and "Tool Tip" Aria references. */
	id: PropTypes.string.isRequired,

	/** `. */
	qaHook: PropTypes.string,

	/** Content to place inside the "track" circle. */
	children: PropTypes.node,

	/** The "total" amount of "units" to represent visually on the progress scale. */
	total: PropTypes.number,

	/** The amount of "progress" "units" in respect to the "total" value. */
	progress: PropTypes.number,

	/** Change the "track" from solid to a set of evenly spaced "segments" (one for each
	 * "total" unit). */
	isSegmented: PropTypes.bool,

	/** Set the component to "grow" horizontally (with the height maintaining the proportions
	 * of the circle) into its parent container and fill the space. */
	isGrow: PropTypes.bool,

	/** The "thickness" of the progress track in "px". */
	thickness: PropTypes.number,

	/** Show a "tool tip" when the mouse "enters" the UI. */
	hasToolTip: PropTypes.bool,

	/** Customise the "tool tip" message. */
	toolTipMessage: PropTypes.string,

	/** Allow the "progress" to be greater than the "total" and represent this discrepancy
	 * in the UI. */
	isOverflow: PropTypes.bool,

	/** Show a "complete" icon when the "progress" and "total" units are equal. */
	isAlertOnComplete: PropTypes.bool,

	/** Show the "progress" in an error state. */
	isSoftError: PropTypes.bool,

	/** Show an error icon. */
	isHardError: PropTypes.bool,

	/** Customise the "error" content. */
	hardErrorAlert: PropTypes.node,

	/** A "color" key that overrides the default "total" gray track swatch. */
	totalColor: PropTypes.oneOf([
		'orange', 'yellow', 'green', 'mint', 'turquoise', 'blue', 'violet',
		'grape', 'pink', 'grey', 'purple', 'lightGreen',
	]),

	/** A "color" key that overrides the default "progress" blue track swatch. */
	progressColor: PropTypes.oneOf([
		'orange', 'yellow', 'green', 'mint', 'turquoise', 'blue', 'violet',
		'grape', 'pink', 'grey', 'purple', 'lightGreen',
	]),

	/** Specify an ARIA label for the progress indicator */
	ariaLabel: PropTypes.string,

	/** The id of an element that provides an ARIA label for the progress indicator */
	ariaLabelledBy: PropTypes.string,

};
