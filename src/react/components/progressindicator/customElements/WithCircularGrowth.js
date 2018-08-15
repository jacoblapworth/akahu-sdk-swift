import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElementSize from './ElementSize';

const DEFAULT_WIDTH = 20;

// With the inclusion of the "isGrow" prop this component can now scale to any
// size. In that regard we also need to scale the track thickness.
//
// + If we left the stroke at the default thickness it would look too thin at
//   large sizes.
//
// + If we called the stroke linearly it would look too thick at large sizes.
//
// We have opted to use an exponential increment using Tanθ which also has an
// upper threshold which is never reached.
//
// https://upload.wikimedia.org/wikipedia/commons/1/19/Trigonometric_functions.svg
//
//       | |
//       . |
//      /  |
// __ -    |
// --------.--------
//         |    - ⎺⎺
//         |  /
//         | .
//         | |
//
// This serves as an acceptable track thickness resizer and complements the ability
// for our users to supply their own track thickness manually.
const createDynamicThickness = width => {
	// A magic number to spread the strokes scaling effect between the initial "0"
	// and "45" degree values on the Tangental X-axis.
	const scale = width / 8;

	const maxDegrees = 45;
	const maxStroke = 30;
	const degrees = Math.min(scale, maxDegrees);
	const radians = degrees * (Math.PI / 180);

	// Our "tan()" calculation returns a number between "0" and "1" and we use this
	// to calculate what percentage of the "maxStroke" we assign based on the
	// components DOM dimension.
	return Math.tan(radians) * maxStroke;
};

const WithCircularGrowth = Wrapper => class CircularGrowth extends Component {
	static propTypes = {
		isGrow: PropTypes.bool,
		thickness: PropTypes.number,
	};

	render = () => {
		const { props } = this;
		const { isGrow, thickness } = props;

		return isGrow

			? (
				<ElementSize>
					{({ elementWidth }) => (
						<Wrapper
							{...props}
							elementWidth={elementWidth || DEFAULT_WIDTH}
							thickness={thickness || createDynamicThickness(elementWidth || DEFAULT_WIDTH)}
						/>
					)}
				</ElementSize>
			)

			: (
				<div>
					<Wrapper
						{...props}
						elementWidth={DEFAULT_WIDTH}
						thickness={thickness}
					/>
				</div>
			);
	};
};

export { WithCircularGrowth as default, createDynamicThickness };
