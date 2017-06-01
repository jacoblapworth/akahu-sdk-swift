import React from 'react';
import XUISimpleAvatar from './XUISimpleAvatar';

const propTypes = {
	/** @property {Function} [onError] Function to be used if the avatar renders an image and the image load fails  */
	onError: React.PropTypes.func,

	/** @property {String} value The text to display in the avatar. In the simple avatar component, it is optional, but here it is mandatory */
	value: React.PropTypes.string.isRequired
};

/**
 * @private
 * onError handler for the image element
 * @param {Object} e Error object
 */
function onError(e) {
	const { props } = this;

	this.setState({
		imageError: true
	});

	if(props.onError) {
		props.onError(e);
	}
}

export default class XUIAvatar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imageError: false
		};
	}
	render() {
		const { props, state } = this;

		if (state.imageError) {
			return <XUISimpleAvatar {...props} imageUrl={null} />
		} else {
			const errorHandler = onError.bind(this);
			return <XUISimpleAvatar {...props} onError={errorHandler} />
		}
	}
}

XUIAvatar.propTypes = propTypes;
