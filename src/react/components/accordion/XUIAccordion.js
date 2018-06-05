import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class XUIAccordion extends PureComponent {
	render = () => <p className={this.props.className}>Hello {this.props.name} 👋</p>;
}

XUIAccordion.propTypes = {
	className: PropTypes.string,
	/** The name used as the reference in the hello message */
	name: PropTypes.string.isRequired
};
