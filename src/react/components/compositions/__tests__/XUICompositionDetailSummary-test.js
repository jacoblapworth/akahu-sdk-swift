import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionDetailSummary from '../XUICompositionDetailSummary';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionDetailSummary>', () => {
  it('renders basic example', () => {
    const wrapper = renderer.create(
      <XUICompositionDetailSummary summary={<div />} detail={<div />} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should do nothing with children', () => {
    const wrapper = renderer.create(
      <XUICompositionDetailSummary summary={<div />} detail={<div />}>
        Hello
      </XUICompositionDetailSummary>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should include custom class and toggle off default classes, if specified', () => {
    const wrapper = renderer.create(
      <XUICompositionDetailSummary
        summary={<div />}
        detail={<div />}
        className="summary-without-head"
        isInfinite={true}
        hasAutoSpaceAround={false}
        hasGridGap={false}
        hasAutoColumnWidths={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should include layout restriction class, if specified', () => {
    const wrapper = renderer.create(
      <XUICompositionDetailSummary summary={<div />} detail={<div />} retainWidth="small" />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
