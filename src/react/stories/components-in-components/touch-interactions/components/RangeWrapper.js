import React, { Fragment } from 'react';
import XUIRange from '../../../../range';

class RangeWrapper extends React.Component {
  state = { rangeValue: '50' };

  updateRangeValue = event => {
    this.setState({ rangeValue: event.target.value });
  };

  render() {
    const { label } = this.props;
    const { rangeValue } = this.state;
    return (
      <Fragment>
        <XUIRange
          max={100}
          min={0}
          onInput={this.updateRangeValue}
          {...this.props}
          label={`${label} ${rangeValue}`}
        />
      </Fragment>
    );
  }
}

export default RangeWrapper;
