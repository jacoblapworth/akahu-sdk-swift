import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import WithLinearGrowth from './WithLinearGrowth';
import { NAME_SPACE } from '../helpers/constants';
import { createArray } from '../helpers/utilities';

const DEFAULT_THICKNESS = 4;

const dashProps = {
  total: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  thickness: PropTypes.number,
};

const standardiseThickness = (thickness, isGrow, elementHeight) =>
  isGrow ? Math.min(thickness, elementHeight) : Math.max(thickness, DEFAULT_THICKNESS);

const createSegmentBaseline = ({ index, total, progress, thickness }) => {
  const isProgress = index < progress;

  return {
    isFirst: !index,
    isLast: index === total - 1,
    itemClasses: cn(`${NAME_SPACE}-linear-segment`, {
      [`${NAME_SPACE}-linear-current`]: isProgress,
      [`${NAME_SPACE}-linear-track`]: !isProgress,
    }),
    gap: `${thickness / 2}px`,
    height: `${thickness}px`,
  };
};

const createLinearSegmentDots = ({ total, progress, thickness }) =>
  createArray(total).map((_, index) => {
    const { isFirst, isLast, itemClasses, gap, height } = createSegmentBaseline({
      index,
      total,
      progress,
      thickness,
    });
    const width = height;
    const left = `-${gap}`;
    const margin = `0 ${isLast ? gap : 0} 0 ${isFirst ? gap : 0}`;

    return (
      <div
        className={`${NAME_SPACE}-linear-dot`}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        style={{ margin, height }}
      >
        {/*
          The current / progress tracks are nested inside of a "dot" element so
          that they can be absolutely positioned centrally inside the `width: 0`
          dot container. This allows the visual dots to overlap each other when
          there are too many to space evenly. When flexing the items they "squish"
          at condensed sizes.
        */}
        <div className={itemClasses} style={{ height, left, width }} />
      </div>
    );
  });

const createLinearSegmentDashes = ({ total, progress, thickness }) =>
  createArray(total).map((_, index) => {
    const { isFirst, isLast, itemClasses, gap, height } = createSegmentBaseline({
      index,
      total,
      progress,
      thickness,
    });

    const marginLeft = isFirst || (!isFirst && !isLast) ? gap : 0;
    const marginRight = isLast || (!isFirst && !isLast) ? gap : 0;
    const margin = `0 ${marginLeft} 0 ${marginRight}`;

    return (
      <div
        className={itemClasses}
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        style={{ margin, height }}
      />
    );
  });

const createLinearSegments = ({ hasSegmentDots, ...props }) =>
  hasSegmentDots ? createLinearSegmentDots(props) : createLinearSegmentDashes(props);

const createLinearStandardDashes = ({ total, progress, thickness }) => {
  const width = `${(progress / total) * 100}%`;
  const height = `${thickness}px`;

  return (
    <div className={`${NAME_SPACE}-linear-track`} style={{ height }}>
      <div className={`${NAME_SPACE}-linear-current`} style={{ height, width }} />
    </div>
  );
};

createLinearStandardDashes.propTypes = dashProps;

const LinearTrack = ({
  total,
  progress,
  isSegmented,
  hasSegmentDots,
  isGrow,
  elementHeight,
  ...props
}) => {
  const { thickness: propsThickness } = props;
  const thickness = standardiseThickness(propsThickness, isGrow, elementHeight);
  const dashes =
    hasSegmentDots || isSegmented
      ? createLinearSegments({
          total,
          progress,
          thickness,
          hasSegmentDots,
        })
      : createLinearStandardDashes({ total, progress, thickness });

  return <div className={`${NAME_SPACE}-linear-wrapper`}>{dashes}</div>;
};

LinearTrack.propTypes = {
  ...dashProps,
  isSegmented: PropTypes.bool,
  elementHeight: PropTypes.number,
};

/* eslint-disable react/default-props-match-prop-types */
LinearTrack.defaultProps = {
  thickness: DEFAULT_THICKNESS,
};
/* eslint-enable react/default-props-match-prop-types */

export default WithLinearGrowth(LinearTrack);
