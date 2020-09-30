import React, { PureComponent } from 'react';
import logReadyState from '../../../../stories/helpers/log-ready-state';

const readyEvent = 'xui-progress-ready-event';

class ColorComparison extends PureComponent {
  componentDidMount() {
    logReadyState(readyEvent);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default ColorComparison;
