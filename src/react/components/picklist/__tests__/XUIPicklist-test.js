import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIPicklist from '../XUIPicklist';
import XUIPickitem from '../XUIPickitem';
import { v4 as uuidv4 } from 'uuid';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

jest.mock('uuid');
uuidv4.mockImplementation(() => 'testPickitemCheckboxId');

const setup = (props = {}, itemProps = {}) => {
  const expected = renderer.create(
    <XUIPicklist {...props}>
      <XUIPickitem primaryElement="Item content" id="pi1" {...itemProps} />
    </XUIPicklist>,
  );

  return expected;
};

describe('< Picklist />', () => {
  it('renders most basic example', () => {
    const basic = setup();
    expect(basic).toMatchSnapshot();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(
      <XUIPicklist>
        <div>Pickitem</div>
      </XUIPicklist>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it('example with most compatible options', () => {
    const settings = {
      className: 'custom-picklist-class',
      id: 'picklistId',
      isHorizontal: true,
      defaultLayout: false,
      shouldTruncate: true,
      secondaryProps: { role: 'presentation' },
      qaHook: 'picklist-example',
    };
    const mostOptions = setup(settings);
    expect(mostOptions).toMatchSnapshot();
  });

  it('example of list settings overriding item-level settings', () => {
    const settings = {
      isMultiselect: false,
      shouldTruncate: true,
    };
    const itemProps = {
      isMultiselect: true,
    };
    const overrides = setup(settings, itemProps);
    expect(overrides).toMatchSnapshot();
  });

  it('example taking settings from first child and giving to all', () => {
    const fromItems = renderer.create(
      <XUIPicklist>
        <XUIPickitem primaryElement="Item content" id="pi1" isMultiselect={true} />
        <XUIPickitem primaryElement="Item two" id="pi2" />
      </XUIPicklist>,
    );
    expect(fromItems).toMatchSnapshot();
  });
});
