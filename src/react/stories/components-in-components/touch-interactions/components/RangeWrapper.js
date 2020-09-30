import React, { Fragment } from 'react';
import XUIRange from '../../../../range';

class RangeWrapper extends React.Component {
  state = { rangeValue: '50' };

  updateRangeValue = event => {
    this.setState({ rangeValue: event.target.value });
  };

  render() {
    return (
      <>
        <XUIRange
          max={100}
          min={0}
          onInput={this.updateRangeValue}
          {...this.props}
          label={`${this.props.label} ${this.state.rangeValue}`}
        />
      </>
    );
  }
}

export default RangeWrapper;
