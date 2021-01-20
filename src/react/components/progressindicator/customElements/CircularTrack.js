import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import WithCircularGrowth from './WithCircularGrowth';
import { NAME_SPACE } from '../helpers/constants';

const DEFAULT_THICKNESS = 3;

// Make sure the stroke width has a minimum viable value and a maximum that does
// not exceed its half of the <svg /> (or the browser throws an error).
const standardiseThickness = (width, thickness) => {
  const max = width / 2;
  const min = DEFAULT_THICKNESS;

  return thickness < min ? min : Math.min(thickness, max);
};

const createContentStyles = (strokeWidth, viewBoxWidth) => {
  // Content is placed inside the circle taking into account the thickness of the
  // track. We need to offset the <div /> container based on the <svg /> "viewbox"
  // width and the track stroke. This generates us a percentage offset which can
  // create a sub pixel rendering issue where the track and the content do not fix
  // completely snugly together - to combat this we pull back the content by a
  // pixel to create a slight overlap.
  const offset = `calc(${(strokeWidth / viewBoxWidth) * 100}% - 1px)`;

  return {
    bottom: offset,
    left: offset,
    right: offset,
    top: offset,
  };
};

const createCircularStandardDashes = () => ({ strokeDasharray: 'initial' });

const createCircularSegmentDashes = ({ total, strokeWidth, circumference }) => {
  // A 10px stroke width pairs with a 16px segment gap.
  const ratio = 16 / 10;
  const gap = strokeWidth * ratio;
  const segments = total;

  return {
    strokeDasharray: `${circumference / segments - gap}, ${gap}`,
    strokeDashoffset: gap * -0.5,
  };
};

const createCircularOffset = ({ circumference, progress, total }) => {
  const offset = circumference * (1 - progress / total);

  return isNaN(offset) || !isFinite(offset) ? 0 : offset;
};

const CircularTrack = ({
  id,
  qaHook,
  total,
  progress,
  isSegmented,
  customContent,
  thickness,
  elementWidth,
}) => {
  const strokeWidth = standardiseThickness(elementWidth, thickness);
  const viewBoxWidth = elementWidth;
  const viewBoxHeight = viewBoxWidth;
  const center = viewBoxWidth / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = createCircularOffset({
    circumference,
    progress,
    total,
  });
  const dashes = isSegmented
    ? createCircularSegmentDashes({ total, strokeWidth, circumference })
    : createCircularStandardDashes({ offset, circumference });
  const progressClasses = cn(`${NAME_SPACE}-circular-current`, {
    [`${NAME_SPACE}-roundcap`]: !isSegmented,
  });
  const contentStyles = createContentStyles(strokeWidth, viewBoxWidth);

  return [
    customContent ? (
      <div
        className={`${NAME_SPACE}-circular-content`}
        data-automationid={qaHook && `${qaHook}-custom-content`}
        key="content"
        style={contentStyles}
      >
        {customContent}
      </div>
    ) : null,

    <svg
      className={cn(`${NAME_SPACE}-circular-wrapper`)}
      height={viewBoxHeight}
      key="svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width={viewBoxWidth}
    >
      <defs>
        <mask
          height={viewBoxHeight}
          id={`${id}-progress-mask`}
          maskUnits="userSpaceOnUse"
          width={viewBoxWidth}
          x="0"
          y="0"
        >
          <circle
            {...dashes}
            className={`
							${NAME_SPACE}-circular-mask
							${NAME_SPACE}-roundcap
						`}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
        </mask>
      </defs>

      <g mask={`url(#${id}-progress-mask)`}>
        <circle
          className={`${NAME_SPACE}-circular-track`}
          cx={center}
          cy={center}
          r={radius}
          strokeWidth={strokeWidth}
        />

        <circle
          className={progressClasses}
          cx={center}
          cy={center}
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeWidth={strokeWidth}
        />
      </g>
    </svg>,
  ];
};

CircularTrack.propTypes = {
  customContent: PropTypes.node,
  elementWidth: PropTypes.number,
  id: PropTypes.string.isRequired,
  isSegmented: PropTypes.bool,
  progress: PropTypes.number.isRequired,
  qaHook: PropTypes.string,
  thickness: PropTypes.number,
  total: PropTypes.number.isRequired,
};

CircularTrack.defaultProps = {
  thickness: DEFAULT_THICKNESS,
};

export default WithCircularGrowth(CircularTrack);
