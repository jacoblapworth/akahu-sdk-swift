import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionMasterDetailSummary from '../XUICompositionMasterDetailSummary';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionMasterDetailSummary>', () => {
  it('renders basic example', () => {
    const wrapper = renderer.create(
      <XUICompositionMasterDetailSummary master={<div />} summary={<div />} detail={<div />} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should do nothing with children', () => {
    const wrapper = renderer.create(
      <XUICompositionMasterDetailSummary master={<div />} summary={<div />} detail={<div />}>
        Hello
      </XUICompositionMasterDetailSummary>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should include custom class and toggle off default classes, if specified', () => {
    const wrapper = renderer.create(
      <XUICompositionMasterDetailSummary
        master={<div />}
        detail={<div />}
        summary={<div />}
        className="master-detail-summary"
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
      <XUICompositionMasterDetailSummary
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
      <XUICompositionMasterDetailSummary
        master={<div />}
        summary={<div />}
        detail={<div />}
        retainWidth="small"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
