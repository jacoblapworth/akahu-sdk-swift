import React, { PureComponent } from 'react';
import logReadyState from '../../../../stories/helpers/log-ready-state';

const readyEvent = 'xui-progress-ready-event';

class ToolTipComparison extends PureComponent {
  node = React.createRef();

  componentDidMount() {
    setTimeout(() => {
      const { node } = this;
      const wrapper = node?.current?.querySelector(
        '.xui-progress [aria-describedby$="progress--tooltip"]',
      );
      if (wrapper) {
        wrapper.click();
        logReadyState(readyEvent);
      }
    }, 100);
  }

  render() {
    const {
      props: { style, component },
    } = this;
    return (
      // The Tool Tip is absolutely positioned and can get cropped off in our
      // visual regression captures. This extra padding at the top of the component
      // ensures that the entire "active" Tool Tip gets captured.
      <div style={{ background: 'white', paddingTop: '80px' }}>
        <div ref={this.node} style={style}>
          {component}
        </div>
      </div>
    );
  }
}

export default ToolTipComparison;
