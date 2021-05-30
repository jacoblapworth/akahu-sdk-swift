import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import React from 'react';

import Positioning from '../Positioning';

Enzyme.configure({ adapter: new Adapter() });

describe('<Positioning />', () => {
  it('renders without crashing', () => {
    // Arrange
    const triggerRef = React.createRef();
    const wrapper = shallow(
      <Positioning triggerRef={triggerRef}>{side => <div>{side}</div>}</Positioning>,
    );

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
