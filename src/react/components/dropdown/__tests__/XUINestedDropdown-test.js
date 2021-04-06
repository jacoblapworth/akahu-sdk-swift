import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import XUINestedDropdown from '../XUINestedDropdown';
import XUIDropdownPanel from '../XUIDropdownPanel';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIPickitem from '../../picklist/XUIPickitem';
import { eventKeyValues } from '../../helpers/reactKeyHandler';

import { fixedWidthDropdownSizes, maxWidthDropdownSizes } from '../private/constants';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

const createComponent = props => (
  <XUINestedDropdown id="1" {...props}>
    <XUIDropdownPanel qaHook="nestedDropdown-panelone">
      <XUIPicklist ariaLabel="Select first option">
        <XUIPickitem id="option1">Option 1</XUIPickitem>
      </XUIPicklist>
    </XUIDropdownPanel>
    <XUIDropdownPanel qaHook="nestedDropdown-paneltwo">
      <XUIPicklist ariaLabel="Select second option">
        <XUIPickitem id="option2">Option 2</XUIPickitem>
      </XUIPicklist>
    </XUIDropdownPanel>
  </XUINestedDropdown>
);

describe('<XUINestedDropdown />', () => {
  it('should pass accessibility testing', async () => {
    const wrapper = mount(createComponent());
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it('should render a passed id instead of automatically generating one', () => {
    const automationid = renderer.create(createComponent());

    // id should be "1".
    expect(automationid).toMatchSnapshot();
  });

  it('should render an automationid when a qaHook is passed', () => {
    const automationid = renderer.create(createComponent({ qaHook: 'nestedDropdown-test' }));

    expect(automationid).toMatchSnapshot();
  });

  it('should render additional classes when passed in the classNames prop', () => {
    const automationid = renderer.create(createComponent({ className: 'nestedDropdown-class' }));

    expect(automationid).toMatchSnapshot();
  });

  it('should allow the consumer to change the size', () => {
    const size = renderer.create(createComponent({ size: 'small' }));

    expect(size).toMatchSnapshot();
  });

  it('should be a size large by default', () => {
    const size = renderer.create(createComponent());

    expect(size).toMatchSnapshot();
  });

  it('should render hidden if the isHidden prop is set to true', () => {
    const dropdown = renderer.create(createComponent({ isHidden: true }));

    expect(dropdown).toMatchSnapshot();
  });

  it('should render visible if the isHidden prop is set to false', () => {
    const dropdown = renderer.create(createComponent({ isHidden: false }));

    expect(dropdown).toMatchSnapshot();
  });

  it('should allow for a footer to be rendered to the correct panel when passed', () => {
    const footerIncluded = renderer.create(
      createComponent({ footer: <footer>I am a footer </footer> }),
    );

    expect(footerIncluded).toMatchSnapshot();
  });

  it("should call the onSelect callback any item nested in a panel when it's selected", () => {
    const onSelect = jest.fn();
    const comp = mount(createComponent({ onSelect }));

    comp.find('#option1').hostNodes().simulate('click');
    setTimeout(() => {
      expect(onSelect.mock.calls.length).toEqual(1);
    }, 0);
  });

  it('should call the onHighlightChange callback when an item is highlighted', () => {
    const onHighlightChange = jest.fn();
    const comp = mount(createComponent({ onHighlightChange }));

    expect(onHighlightChange.mock.calls.length).toEqual(0);

    comp
      .find('#option1')
      .hostNodes()
      .simulate('keyDown', { key: eventKeyValues.down, keyCode: 40, which: 40 });
    setTimeout(() => {
      expect(onHighlightChange.mock.calls.length).toBeGreaterThan(0);
    }, 0);
  });

  it("shouldn't respect keyboard events if the ignoreKeyboardEvents lists that event", () => {
    const onHighlightChange = jest.fn();
    const comp = mount(createComponent({ onHighlightChange, ignoreKeyboardEvents: [40] }));

    expect(onHighlightChange.mock.calls.length).toEqual(0);

    comp
      .find('#option1')
      .first()
      .simulate('keyDown', { key: eventKeyValues.down, keyCode: 40, which: 40 });

    setTimeout(() => {
      expect(onHighlightChange.mock.calls.length).toEqual(0);
    }, 0);
  });

  it('should ignore keyboard events if passed onto a panel of a nested picklist', () => {
    const onHighlightChange = jest.fn();
    const comp = mount(
      createComponent(
        <XUINestedDropdown id="1" onHighlightChange={onHighlightChange}>
          <XUIDropdownPanel ignoreKeyboardEvents={[40]} qaHook="nestedDropdown-panelone">
            <XUIPicklist>
              <XUIPickitem id="option1">Option 1</XUIPickitem>
            </XUIPicklist>
          </XUIDropdownPanel>
          <XUIDropdownPanel qaHook="nestedDropdown-paneltwo">
            <XUIPicklist>
              <XUIPickitem id="option2">Option 2</XUIPickitem>
            </XUIPicklist>
          </XUIDropdownPanel>
        </XUINestedDropdown>,
      ),
    );

    expect(onHighlightChange.mock.calls.length).toEqual(0);

    comp
      .find('#option1')
      .first()
      .simulate('keyDown', { key: eventKeyValues.down, keyCode: 40, which: 40 });

    setTimeout(() => {
      expect(onHighlightChange.mock.calls.length).toEqual(0);
    }, 0);
  });

  it('should add the animation close class when the animateClose prop is set to true', () => {
    const animateClose = renderer.create(createComponent({ animateClosed: true }));

    expect(animateClose).toMatchSnapshot();
  });

  it("shouldn't add the animation close class when animateClosed is false", () => {
    const animateClose = renderer.create(createComponent({ animateClosed: false }));

    expect(animateClose).toMatchSnapshot();
  });

  it('should add the animation open class when the animateOpen prop is set to true', () => {
    const animateOpen = renderer.create(createComponent({ animateOpen: true }));

    expect(animateOpen).toMatchSnapshot();
  });

  it("shouldn't add the animation open class when animateOpen is false", () => {
    const animateOpen = renderer.create(createComponent({ animateOpen: false }));

    expect(animateOpen).toMatchSnapshot();
  });

  it('should render fixed width classes when a size is passed and hasFixedWidth prop is set to true', () => {
    const hasFixedWidth = mount(createComponent({ size: 'medium', hasFixedWidth: true }));

    expect(
      hasFixedWidth.find('.xui-dropdown-layout').hasClass(fixedWidthDropdownSizes.medium),
    ).toBeTruthy();
  });

  it('should render max width classes when a size is passed and hasFixedWidth prop is set to false', () => {
    const hasFixedWidth = mount(createComponent({ size: 'medium', hasFixedWidth: false }));

    expect(
      hasFixedWidth.find('.xui-dropdown-layout').hasClass(maxWidthDropdownSizes.medium),
    ).toBeTruthy();
  });

  it('should render max width classes by default when a size is passed', () => {
    const hasFixedWidth = mount(createComponent({ size: 'medium', hasFixedWidth: false }));

    expect(
      hasFixedWidth.find('.xui-dropdown-layout').hasClass(maxWidthDropdownSizes.medium),
    ).toBeTruthy();
  });

  it('should render the correct open panel when an id is passed to the currentPanel prop', () => {
    const currentPanel = mount(
      <XUINestedDropdown currentPanelId="two" id="1">
        <XUIDropdownPanel id="panel-one" panelId="one" qaHook="nestedDropdown-panelone">
          <XUIPicklist>
            <XUIPickitem id="option1">Option 1</XUIPickitem>
          </XUIPicklist>
        </XUIDropdownPanel>
        <XUIDropdownPanel id="panel-two" panelId="two" qaHook="nestedDropdown-paneltwo">
          <XUIPicklist>
            <XUIPickitem id="option2">Option 2</XUIPickitem>
          </XUIPicklist>
        </XUIDropdownPanel>
      </XUINestedDropdown>,
    );

    expect(
      currentPanel.find('#panel-one').parent().hasClass('xui-dropdown-nested-is-hidden'),
    ).toBeTruthy();
    expect(
      currentPanel.find('#panel-two').parent().hasClass('xui-dropdown-nested-is-hidden'),
    ).toBeFalsy();
  });
});
