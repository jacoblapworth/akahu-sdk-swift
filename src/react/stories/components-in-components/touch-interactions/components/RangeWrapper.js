import React, { Fragment } from 'react';
import XUIRange from '../../../../range';

class RangeWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rangeValue: '50' };
  }

  updateRangeValue = event => {
    this.setState({ rangeValue: event.target.value });
  };

  render() {
    const { label } = this.props;
    const { rangeValue } = this.state;
    return (
      <>
        <XUIRange
          max={100}
          min={0}
          onInput={this.updateRangeValue}
          {...this.props}
          label={`${label} ${rangeValue}`}
        />
      </>
    );
  }
}

export default RangeWrapper;
