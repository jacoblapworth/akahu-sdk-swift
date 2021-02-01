import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'babel-polyfill';

const originalErrors = console.error;
console.error = errormessage => {
  // If Styleguidist is throwing the specific warning about section "name" property
  // and includes the following string: "Warning: Failed prop type: The prop `name`",
  // suppress the error and don't show it. Otherwise, fire the error as normal.
  const suppressedErrors = errormessage
    .toString()
    .includes('Warning: Failed prop type: The prop `name` is');

  !suppressedErrors && originalErrors(errormessage);
};

export default class Wrapper extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onError: PropTypes.func.isRequired,
  };

  componentDidCatch(error) {
    this.props.onError(error);
  }

  render() {
    return <div className="xui-container">{this.props.children}</div>;
  }
}
