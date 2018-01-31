import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { NAME_SPACE } from '../helpers/constants';

class ProgressToolTip extends PureComponent {

	static propTypes = {
		qaHook: PropTypes.string,
		toolTipId: PropTypes.string.isRequired,
		toolTipMessage: PropTypes.string,
	};

	constructor() {

		super();
		this.state = this.setInitialState();
		this.hitboxPosition = this.setInitialHitboxPosition();

	}

	setInitialState = () => ({x: null, y: null});
	setInitialHitboxPosition = () => ({left: null, top: null});

	handleMouseEnter = event => {

		const {left, top} = event.currentTarget.getBoundingClientRect();

		this.hitboxPosition = {left, top};

	};

	handleMouseMove = (event) => {

		const {left = 0, top = 0} = this.hitboxPosition;
		const {clientX = 0, clientY = 0} = event;
		const x = clientX - left;
		const y = clientY - top;

		if (x && y) {

			this.setState({x, y});

		}

	};

	handleMouseLeave = () => {

		this.setState(this.setInitialState())
		this.hitboxPosition = this.setInitialHitboxPosition();

	};

	render = () => {

		const {x, y} = this.state;
		const {qaHook, toolTipId, toolTipMessage} = this.props;
		const styles = {transform: `translate(${x}px, ${y}px)`};

		return (
			<div
				className={`${NAME_SPACE}-hitbox`}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				onMouseLeave={this.handleMouseLeave}>

				{Boolean(x && y) && (

					<div
						id={toolTipId}
						className={`${NAME_SPACE}-tooltip xui-tag`}
						data-automationid={qaHook}
						style={styles}
						role="tooltip">
						{toolTipMessage}
					</div>

				)}

			</div>
		);

	}

}

export default ProgressToolTip;
