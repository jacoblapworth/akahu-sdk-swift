import React, { PureComponent } from 'react';
import logReadyState from '../../../../stories/helpers/log-ready-state';

const readyEvent = 'xui-progress-ready-event';

class ColorComparison extends PureComponent {
  componentDidMount() {
    logReadyState(readyEvent);
  }

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default ColorComparison;
