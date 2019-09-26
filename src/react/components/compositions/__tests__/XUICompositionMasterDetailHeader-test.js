import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUICompositionMasterDetailHeader from '../XUICompositionMasterDetailHeader';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUICompositionMasterDetailHeader>', () => {
  it('renders basic example', () => {
    const wrapper = renderer.create(
      <XUICompositionMasterDetailHeader header={<div />} master={<div />} detail={<div />} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should do nothing with children', () => {
    const wrapper = renderer.create(
      <XUICompositionMasterDetailHeader header={<div />} master={<div />} detail={<div />}>
        Hello
      </XUICompositionMasterDetailHeader>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should include custom class and toggle off default classes, if specified', () => {
    const wrapper = renderer.create(
      <XUICompositionMasterDetailHeader
        header={<div />}
        master={<div />}
        detail={<div />}
        className="master-detail-with-head"
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
      <XUICompositionMasterDetailHeader
        header={<div />}
        master={<div />}
        detail={<div />}
        retainWidth="small"
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
