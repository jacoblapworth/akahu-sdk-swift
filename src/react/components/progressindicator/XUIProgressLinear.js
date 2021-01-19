import React from 'react';
import PropTypes from 'prop-types';
import '../helpers/xuiGlobalChecks';
import { enrichLinearProps } from './helpers/enrichprops';
import { NAME_SPACE } from './helpers/constants';
import LinearTrack from './customElements/LinearTrack';
import ProgressWrapper from './customElements/ProgressWrapper';

const XUIProgressLinear = props => (
  <ProgressWrapper {...enrichLinearProps(props)}>
    {({ isSegmented, total, progress, isGrow, thickness, hasSegmentDots }) => (
      <div className={`${NAME_SPACE}--fragment`}>
        <LinearTrack
          {...{
            isSegmented,
            total,
            progress,
            isGrow,
            thickness,
            hasSegmentDots,
          }}
        />
      </div>
    )}
  </ProgressWrapper>
);

export default XUIProgressLinear;

XUIProgressLinear.propTypes = {
  /** Specify an ARIA label for the progress indicator */
  ariaLabel: PropTypes.string,

  /** The id of an element that provides an ARIA label for the progress indicator */
  ariaLabelledBy: PropTypes.string,

  /** Turns segment "dashes" into circulate "dots". */
  hasSegmentDots: PropTypes.bool,

  /** Show a "tool tip" when the mouse "enters" the UI. */
  hasToolTip: PropTypes.bool,

  /** A unique ID that is used to generate SVG mask references and "Tool Tip" Aria references. */
  id: PropTypes.string.isRequired,

  /** Set the component to "grow" both horizontally and vertically (not respecting the
   * standard UI proportions) into its parent container and fill the space. */
  isGrow: PropTypes.bool,

  /** Allow the "progress" to be greater than the "total" and represent this discrepancy
   * in the UI. */
  isOverflow: PropTypes.bool,

  /** Change the "track" from solid to a set of evenly spaced "segments" (one for
   * each "total" unit). */
  isSegmented: PropTypes.bool,

  /** Show the "progress" in an error state. */
  isSoftError: PropTypes.bool,

  /** The amount of "progress" "units" in respect to the "total" value. */
  progress: PropTypes.number,

  /** A "color" key that overrides the default "progress" blue track swatch. */
  progressColor: PropTypes.oneOf([
    'orange',
    'yellow',
    'green',
    'mint',
    'turquoise',
    'blue',
    'violet',
    'grape',
    'pink',
    'grey',
    'purple',
    'lightGreen',
  ]),

  /** `. */
  qaHook: PropTypes.string,

  /** The "thickness" of the progress track in "px". */
  thickness: PropTypes.number,

  /** Customise the "tool tip" message. */
  toolTipMessage: PropTypes.string,

  /** The "total" amount of "units" to represent visually on the progress scale. */
  total: PropTypes.number,

  /** A "color" key that overrides the default "total" gray track swatch. */
  totalColor: PropTypes.oneOf([
    'orange',
    'yellow',
    'green',
    'mint',
    'turquoise',
    'blue',
    'violet',
    'grape',
    'pink',
    'grey',
    'purple',
    'lightGreen',
  ]),
};
