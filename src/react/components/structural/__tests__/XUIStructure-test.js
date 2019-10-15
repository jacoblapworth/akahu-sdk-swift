import React from 'react';
import XUIRow from '../XUIRow';
import XUIColumn from '../XUIColumn';
import { rowVariants, columnShortNames } from '../private/constants';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUI Row and Column/>', () => {
  const qaHook = 'qaHook';
  it('renders the base row with no extra settings passed', () => {
    const testRow = renderer.create(<XUIRow>Testing 💩</XUIRow>);
    expect(testRow).toMatchSnapshot();
  });
  it('renders the base column with no extra settings passed', () => {
    const testCol = renderer.create(<XUIColumn>Testing 💩</XUIColumn>);
    expect(testCol).toMatchSnapshot();
  });
  it('renders with the correct row variant classes', () => {
    Object.keys(rowVariants).forEach(variant => {
      const tag = shallow(<XUIRow variant={variant}>Testing 💩</XUIRow>);
      if (rowVariants[variant]) {
        expect(tag.hasClass(`xui-row-${rowVariants[variant]}`)).toEqual(true);
      }
    });
  });
  it('renders with the correct column width classes, from shorthand', () => {
    Object.keys(columnShortNames).forEach(shorthand => {
      const tag = shallow(<XUIColumn gridColumns={shorthand}>Testing 💩</XUIColumn>);
      expect(tag.hasClass(`xui-column-${columnShortNames[shorthand]}-of-12`)).toEqual(true);
    });
  });
  it('renders the column with breakpoint-dependent column widths, if provided', () => {
    const testCol = renderer.create(
      <XUIColumn gridColumnsSmallUp="3" gridColumnsLargeUp="6">
        Testing 💩
      </XUIColumn>,
    );
    expect(testCol).toMatchSnapshot();
  });
  it('renders row classes that are passed in', () => {
    const wrapper = mount(<XUIRow className="testClass">Testing 💩</XUIRow>);
    const tag = wrapper.find(XUIRow);
    expect(tag.hasClass('testClass')).toEqual(true);
  });
  it('renders column classes that are passed in', () => {
    const wrapper = mount(<XUIColumn className="testClass">Testing 💩</XUIColumn>);
    const tag = wrapper.find(XUIColumn);
    expect(tag.hasClass('testClass')).toEqual(true);
  });
  it('renders column with automation id when qaHook prop is passed in ', () => {
    const wrapper = renderer.create(<XUIColumn qaHook={qaHook} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders row with automation id when qaHook prop is passed in', () => {
    const wrapper = renderer.create(<XUIRow qaHook={qaHook} />);
    expect(wrapper).toMatchSnapshot();
  });
});
