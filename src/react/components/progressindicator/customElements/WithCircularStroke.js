import React, {Component} from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

// With the inclusion of the "isGrow" prop this component can now scale to any
// size. In that regard we do NOT want the stroke to scale in a static fashion
// as at larger sizes it becomes too overbearing.
//
// We use a Tangental displacement to calculate the stroke width because it uses
// an exponential increment (change the stroke more dramatically as the component
// increases in size) and will NEVER hit its maximum threshold (we can set a stroke
// width for larger sizes that will never be breached).
//
// NOTE: When the component scales UP we are DECREASING the stroke size so we are
// actually using an exponential decrement.
const createStrokeWidth = (elementWidth) => {

	// A magic number to spread the strokes scaling effect between the initial "0"
	// and "90" degree values on the Tangental X-axis.
	const scale = elementWidth / 8;
	const maxDegrees = 90;

	// The "maxStroke" defines what the stroke should be for a component size of
	// "0px / 0px". As the component increases in size we decrease the stroke width
	// until the "minStroke" is hit ("tan()" will work its way closer and closer to
	// "0" so we stop the decrement at a more sensible value).
	const maxStroke = 12;
	const minStroke = 2;

	const degrees = Math.min(scale, maxDegrees);
	const radians = degrees * (Math.PI / 180);

	// Our "tan()" calculation returns a number between "0" and "1" and we use this
	// to calculate what percentage of the "maxStroke" we assign based on the
	// components DOM dimension.
	const strokeWidth = maxStroke - (Math.tan(radians) * maxStroke);

	return Math.max(strokeWidth, minStroke);

};

class DynamicStroke extends Component {

	static propTypes = {
		children: PropTypes.func.isRequired,
	};

	state = {elementWidth: null};
	rootNode = null;
	throttled = null;

	componentDidUpdate = () => this.setCurrentWidth();

	componentDidMount = () => {

		this.setCurrentWidth();
		this.throttled = throttle(this.setCurrentWidth, 500);
		window.addEventListener('resize', this.throttled);

	};

	componentWillUnmount = () => {

		window.removeEventListener('resize', this.throttled);
		this.throttled.cancel();

	};

	setCurrentWidth = () => {

		const {rootNode} = this;
		const {elementWidth} = this.state;

		if (rootNode) {

			const {clientWidth} = rootNode;

			if (elementWidth !== clientWidth) {

				this.setState({elementWidth: clientWidth});

			}

		}

	};

	render = () => {

		const {children} = this.props
		const {elementWidth} = this.state;

		return (
			<div ref={(node) => this.rootNode = node}>
				{children({elementWidth})}
			</div>
		);

	};

}

const WithCircularStroke = Wrapper => class CircularStroke extends Component {

	static propTypes = {
		isGrow: PropTypes.bool,
	};

	render = () => {

		const {isGrow, ...props} = this.props;

		return isGrow

			? <DynamicStroke>
					{({elementWidth}) => <Wrapper {...props} strokeWidth={createStrokeWidth(elementWidth)} />}
				</DynamicStroke>

			: <div>
					<Wrapper {...props} strokeWidth={createStrokeWidth(20)} />
				</div>

	};

};

export {WithCircularStroke as default, createStrokeWidth};
