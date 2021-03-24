import React from 'react';

import Enzyme, { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { axe, toHaveNoViolations } from 'jest-axe';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { nanoid } from 'nanoid';
import XUISelectBox from '../XUISelectBox';
import XUISelectBoxOption from '../XUISelectBoxOption';
import { then } from './helpers';
import { eventKeyValues } from '../../helpers/reactKeyHandler';

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testSelectBoxId');

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('<XUISelectBox />', function () {
  const options = ['Santa Cruz', 'Transition', 'Lapierre', 'Surly', 'Kona'];
  let select;
  let wasSelected = false;

  beforeEach(function () {
    select = mount(
      <XUISelectBox
        buttonClassName="blah"
        buttonContent={options[0]}
        caretTitle="Toggle list"
        forceDesktop
        label="Test Select Box"
        name="Test"
        value={options[0]}
      >
        {options.map((opt, idx) => {
          return (
            <XUISelectBoxOption
              id={opt}
              key={opt + idx}
              onSelect={() => {
                wasSelected = true;
              }}
              selected={opt === options[0]}
              showCheckboxes
              truncateText
              value={opt}
            >
              {opt}
            </XUISelectBoxOption>
          );
        })}
      </XUISelectBox>,
    );
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUISelectBox buttonContent="Santa Cruz" label="Test Select" />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it('should place the defaultValue as the initial input value', function () {
    // Have to remove the title of the SVG used to show the down arrow icon
    const buttonValue = select.find('button').first().text().replace('Toggle list', '');
    expect(buttonValue).toEqual(options[0]);
  });

  it('should open the dropdown on click of the button when it has children', function () {
    select.find('button.blah').first().simulate('click');
    expect(select.instance().isDropdownOpen()).toBeTruthy();
  });

  it('should not open the dropdown on click of the button when it does not have children', function () {
    select = mount(
      <XUISelectBox
        buttonClassName="blah"
        buttonContent="test"
        caretTitle="Toggle list"
        forceDesktop
        isOpen={false}
        label="Does not have children"
        name="Test"
        value="Test"
      />,
    );

    select.find('button.blah').first().simulate('click');
    expect(select.instance().isDropdownOpen()).toBeFalsy();
  });

  it('should not open the dropdown on click if the control is disabled', function () {
    select = mount(
      <XUISelectBox
        buttonClassName="blah"
        buttonContent="test"
        caretTitle="Toggle list"
        forceDesktop
        isDisabled
        isOpen={false}
        label="test"
      >
        <XUISelectBoxOption id="1" label="test" value="A sample option">
          A sample option
        </XUISelectBoxOption>
      </XUISelectBox>,
    );

    select.find('button.blah').first().simulate('click');
    expect(select.instance().isDropdownOpen()).toBeFalsy();
  });

  it('should call onSelect on click of option', function () {
    then(() => select.find('.xui-pickitem').first().simulate('click')).then(() => {
      expect(wasSelected).toBeTruthy();
    });
  });

  it('should open the dropdown on arrowDown', function () {
    select.find('button.blah').first().simulate('keydown', {
      key: eventKeyValues.down,
      keyCode: 40,
      which: 40,
    });

    expect(select.instance().isDropdownOpen()).toBeTruthy();
  });

  it("should render the appropriate automation id's when a qaHook is provided", () => {
    const select = renderer.create(
      <XUISelectBox
        buttonContent="test"
        caretTitle="Toggle list"
        forceDesktop
        id="testThisSelect"
        label="test"
        qaHook="test-selectbox"
      >
        <XUISelectBoxOption
          id="1"
          label="test"
          qaHook="test-selectboxoption"
          value="A sample option"
        >
          A sample option
        </XUISelectBoxOption>
      </XUISelectBox>,
    );

    expect(select).toMatchSnapshot();
  });

  it('should render the trigger in a disabled state if `isDisabled` is set', () => {
    const select = renderer.create(
      <XUISelectBox
        buttonContent="test"
        caretTitle="Toggle list"
        forceDesktop
        isDisabled
        label="test"
      >
        <XUISelectBoxOption id="1" label="test" value="A sample option">
          A sample option
        </XUISelectBoxOption>
      </XUISelectBox>,
    );

    expect(select).toMatchSnapshot();
  });
});
