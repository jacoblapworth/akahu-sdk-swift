import React, { PureComponent } from 'react';
import logReadyState from '../../../../stories/helpers/log-ready-state';

const readyEvent = 'xui-progress-ready-event';

class StandardComparison extends PureComponent {
  componentDidMount() {
    logReadyState(readyEvent);
  }

  render() {
    const {
      props: { style, component, children },
    } = this;
    return (
      <div style={style}>
        {component}
        {children}
      </div>
    );
  }
}

export default StandardComparison;
