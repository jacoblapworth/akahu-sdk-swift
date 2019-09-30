import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionSplitHeader from '../XUICompositionSplitHeader';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionSplitHeader>', () => {
  it('renders basic example', () => {
    const wrapper = renderer.create(
      <XUICompositionSplitHeader header={<div />} secondary={<div />} primary={<div />} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should do nothing with children', () => {
    const wrapper = renderer.create(
      <XUICompositionSplitHeader header={<div />} secondary={<div />} primary={<div />}>
        Hello
      </XUICompositionSplitHeader>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should include custom class and toggle off default classes, if specified', () => {
    const wrapper = renderer.create(
      <XUICompositionSplitHeader
        header={<div />}
        secondary={<div />}
        primary={<div />}
        className="split-with-head"
        isInfinite={true}
        hasAutoSpaceAround={false}
        hasGridGap={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should include layout restriction class, if specified', () => {
    const wrapper = renderer.create(
      <XUICompositionSplitHeader
        header={<div />}
        secondary={<div />}
        primary={<div />}
        retainWidth="small"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
