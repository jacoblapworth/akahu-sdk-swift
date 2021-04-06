import React from 'react';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIOverviewBlock from '../XUIOverviewBlock';
import XUIOverviewSection from '../XUIOverviewSection';
import { overviewSentiments } from '../private/constants';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUI OverviewBlock and OverviewSection/>', () => {
  const qaHook = 'qaHook';
  it('renders the base overview block with no extra settings passed', () => {
    const testRow = renderer.create(<XUIOverviewBlock />);
    expect(testRow).toMatchSnapshot();
  });
  it('renders extra overview block classes that are passed in', () => {
    const wrapper = mount(<XUIOverviewBlock className="testClass" />);
    const tag = wrapper.find(XUIOverviewBlock);
    expect(tag.hasClass('testClass')).toEqual(true);
  });
  it('renders overview block without default layout', () => {
    const wrapper = mount(<XUIOverviewBlock hasLayout={false} />);
    expect(wrapper.find('.xui-overview-layout').length).toBe(0);
  });
  it('renders the base overview block with sections, children, sentiments, and options', () => {
    const testBlock = renderer.create(
      <XUIOverviewBlock hasBorder={false} hasBackground={false} textAlignment="left">
        {Object.keys(overviewSentiments).map((sentiment, index) => {
          return (
            <XUIOverviewSection key={index} sentiment={sentiment} label={sentiment} value="100.23">
              test child content
            </XUIOverviewSection>
          );
        })}
      </XUIOverviewBlock>,
    );
    expect(testBlock).toMatchSnapshot();
  });
  it('renders the overview sections with proper sentiments', () => {
    Object.keys(overviewSentiments).forEach(sentiment => {
      const section = mount(
        <XUIOverviewSection sentiment={sentiment} label={sentiment} value="100.23" />,
      );
      if (overviewSentiments.sentiment) {
        expect(section.find(`.xui-textcolor-${sentiment}`).length).toBe(1);
      }
    });
  });
  it('renders extra overview section classes that are passed in', () => {
    const wrapper = mount(
      <XUIOverviewBlock>
        <XUIOverviewSection label="labelText" value="65.43" className="testClass" />
      </XUIOverviewBlock>,
    );
    const tag = wrapper.find(XUIOverviewSection);
    expect(tag.hasClass('testClass')).toEqual(true);
  });
  it('renders overview block and overview section with automation id when qaHook prop is passed in', () => {
    const wrapper = renderer.create(
      <XUIOverviewBlock qaHook={qaHook}>
        <XUIOverviewSection qaHook={qaHook} />
      </XUIOverviewBlock>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('XUIOverviewBlock and XUIOverviewSection should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIOverviewBlock>
        <XUIOverviewSection />
      </XUIOverviewBlock>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
