import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import XUISimpleAvatar from './XUISimpleAvatar';

export default class XUIAvatar extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			imageError: false
		};
		this.onError = this.onError.bind(this);
	}
	/**
	 * onError handler for the image element
	 * @param {Error} e Error object
	 */
	onError(e) {
		const { props } = this;

		this.setState({
			imageError: true
		});

		if (props.onError) {
			props.onError(e);
		}
	}
	render() {
		const { props, state } = this;

		if (state.imageError) {
			return <XUISimpleAvatar {...props} imageUrl={null} />;
		} else {
			return <XUISimpleAvatar {...props} onError={this.onError} />;
		}
	}
}

XUIAvatar.propTypes = {
	qaHook: PropTypes.string,
	/** Function to be used if the avatar renders an image and the image load fails  */
	onError: PropTypes.func,

	/**value The text to display in the avatar. In the simple avatar component, it is optional, but here it is mandatory */
	value: PropTypes.string.isRequired
};
