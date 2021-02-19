import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';

import XUICompositionDetail from '../XUICompositionDetail';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUICompositionDetail>', () => {
  it('renders basic example', () => {
    const wrapper = renderer.create(<XUICompositionDetail detail={<div />} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should do nothing with children', () => {
    const wrapper = renderer.create(
      <XUICompositionDetail detail={<div />}>Hello</XUICompositionDetail>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should include custom class and toggle off default classes, if specified', () => {
    const wrapper = renderer.create(
      <XUICompositionDetail
        detail={<div />}
        className="single-without-head"
        isInfinite={true}
        hasAutoSpaceAround={false}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUICompositionDetail detail={<div />} />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
