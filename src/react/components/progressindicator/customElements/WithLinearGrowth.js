import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ElementSize from './ElementSize';
import { NAME_SPACE } from '../helpers/constants';

const WithLinearGrowth = Wrapper =>
  class LinearGrowth extends Component {
    static propTypes = {
      isGrow: PropTypes.bool,
      thickness: PropTypes.number,
    };

    render = () => {
      const { props } = this;
      const { isGrow, thickness } = props;

      return isGrow ? (
        <ElementSize className={`${NAME_SPACE}-size`}>
          {({ elementHeight }) => (
            <Wrapper
              {...props}
              elementHeight={elementHeight}
              thickness={thickness || elementHeight}
            />
          )}
        </ElementSize>
      ) : (
        <Wrapper {...props} thickness={thickness} />
      );
    };
  };

export default WithLinearGrowth;
