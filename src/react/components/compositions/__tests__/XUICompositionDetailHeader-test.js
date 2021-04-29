import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';

import XUICompositionDetailHeader from '../XUICompositionDetailHeader';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUICompositionDetailHeader>', () => {
  it('renders basic example', () => {
    const wrapper = renderer.create(
      <XUICompositionDetailHeader header={<div />} detail={<div />} />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should do nothing with children', () => {
    const wrapper = renderer.create(
      <XUICompositionDetailHeader header={<div />} detail={<div />}>
        Hello
      </XUICompositionDetailHeader>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('should include custom class and toggle off default classes, if specified', () => {
    const wrapper = renderer.create(
      <XUICompositionDetailHeader
        header={<div />}
        detail={<div />}
        className="single-with-head"
        isInfinite={true}
        hasAutoSpaceAround={false}
        hasGridGap={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUICompositionDetailHeader detail={<div />} header={<div />} />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
