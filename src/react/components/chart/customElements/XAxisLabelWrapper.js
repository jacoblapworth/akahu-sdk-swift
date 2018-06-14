import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import HorizontallyCenterContent from './HorizontallyCenterContent';

class XAxisLabelWrapper extends PureComponent {
	render() {
		const {
			shouldCalculateCenter,
			labelLeft,
			labelTop,
			labelWidth,
			labelHeight,
			children,
		} = this.props;

		return (
			<svg
				y={labelTop}
				x={labelLeft}
				height={labelHeight}
				width={labelWidth}
				viewBox={`0 0 ${labelWidth} ${labelHeight}`}>

				{shouldCalculateCenter ? (
					// We want to run the centering sequence as little as possible as it's
					// a "small" design enhancement for a "large" overhead. Unless explicitly
					// requested we bypass this component.
					<HorizontallyCenterContent
						wrapperWidth={labelWidth}
						wrapperHeight={labelHeight}>
						{children}
					</HorizontallyCenterContent>
				) : children}

			</svg>
		);
	}
}

export default XAxisLabelWrapper;

XAxisLabelWrapper.propTypes = {
	shouldCalculateCenter: PropTypes.bool,
	labelLeft: PropTypes.number,
	labelTop: PropTypes.number,
	labelWidth: PropTypes.number,
	labelHeight: PropTypes.number,
	children: PropTypes.element,
};
