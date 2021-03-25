import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';

import XUICompositionMasterDetailSummaryHeader from '../XUICompositionMasterDetailSummaryHeader';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUICompositionMasterDetailSummaryHeader>', () => {
  it('renders basic example', () => {
    const wrapper = renderer.create(
      <XUICompositionMasterDetailSummaryHeader
        header={<div />}
        master={<div />}
        summary={<div />}
        detail={<div />}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should do nothing with children', () => {
    const wrapper = renderer.create(
      <XUICompositionMasterDetailSummaryHeader
        header={<div />}
        master={<div />}
        summary={<div />}
        detail={<div />}
      >
        Hello
      </XUICompositionMasterDetailSummaryHeader>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should include custom class and toggle off default classes, if specified', () => {
    const wrapper = renderer.create(
      <XUICompositionMasterDetailSummaryHeader
        master={<div />}
        detail={<div />}
        summary={<div />}
        header={<div />}
        className="master-detail-summary-with-head"
        isInfinite={true}
        hasAutoSpaceAround={false}
        hasGridGap={false}
        hasAutoColumnWidths={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should include layout restriction class for medium, if specified', () => {
    const wrapper = renderer.create(
      <XUICompositionMasterDetailSummaryHeader
        header={<div />}
        master={<div />}
        summary={<div />}
        detail={<div />}
        retainWidth="medium"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should include layout restriction class for small, if specified', () => {
    const wrapper = renderer.create(
      <XUICompositionMasterDetailSummaryHeader
        header={<div />}
        master={<div />}
        summary={<div />}
        detail={<div />}
        retainWidth="small"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUICompositionMasterDetailSummaryHeader
        detail={<div />}
        header={<div />}
        master={<div />}
        summary={<div />}
      />,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
