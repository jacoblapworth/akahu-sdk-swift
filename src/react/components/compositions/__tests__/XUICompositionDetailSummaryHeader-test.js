import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';

import XUICompositionDetailSummaryHeader from '../XUICompositionDetailSummaryHeader';

expect.extend(toHaveNoViolations);
Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionDetailSummaryHeader>', () => {
  it('renders basic example', () => {
    const wrapper = renderer.create(
      <XUICompositionDetailSummaryHeader header={<div />} summary={<div />} detail={<div />} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should do nothing with children', () => {
    const wrapper = renderer.create(
      <XUICompositionDetailSummaryHeader header={<div />} summary={<div />} detail={<div />}>
        Hello
      </XUICompositionDetailSummaryHeader>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should include custom class and toggle off default classes, if specified', () => {
    const wrapper = renderer.create(
      <XUICompositionDetailSummaryHeader
        header={<div />}
        summary={<div />}
        detail={<div />}
        className="summary-with-head"
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
      <XUICompositionDetailSummaryHeader
        header={<div />}
        summary={<div />}
        detail={<div />}
        retainWidth="small"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUICompositionDetailSummaryHeader detail={<div />} header={<div />} summary={<div />} />,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
