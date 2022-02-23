import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { nanoid } from 'nanoid';
import { axe, toHaveNoViolations } from 'jest-axe';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import XUIPicklist from '../XUIPicklist';
import XUIPickitem from '../XUIPickitem';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testPickitemCheckboxId');

const setup = (props = {}, itemProps = {}) => {
  const expected = renderer.create(
    <XUIPicklist {...props}>
      <XUIPickitem id="pi1" primaryElement="Item content" {...itemProps} />
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
        <li>Pickitem</li>
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
      hasDefaultLayout: false,
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
        <XUIPickitem id="pi1" isMultiselect primaryElement="Item content" />
        <XUIPickitem id="pi2" primaryElement="Item two" />
      </XUIPicklist>,
    );
    expect(fromItems).toMatchSnapshot();
  });

  it('should not override a manually set ariaRole on a child XUIPickitem', () => {
    render(
      <XUIPicklist secondaryProps={{ role: 'menu' }}>
        <XUIPickitem id="pi1" qaHook="pi1" ariaRole="menuitem" />
      </XUIPicklist>,
    );

    const pickItem = screen.getByRole('menuitem');
    expect(pickItem).toBeTruthy();
  });

  it("should default the ariaRole of a child XUIPickitem to 'option' when the XUIPicklist role is listbox", () => {
    render(
      <XUIPicklist secondaryProps={{ role: 'listbox' }}>
        <XUIPickitem id="pi1" qaHook="pi1" />
      </XUIPicklist>,
    );

    const pickItem = screen.getByRole('option');
    expect(pickItem).toBeTruthy();
  });
});
