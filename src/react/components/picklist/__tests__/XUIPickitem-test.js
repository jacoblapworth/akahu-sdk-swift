import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';
import arrow from '@xero/xui-icon/icons/arrow';
import XUIPickitem from '../XUIPickitem';
import XUIAvatar from '../../avatar/XUIAvatar';
import XUIIcon from '../../icon/XUIIcon';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testPickitemCheckboxId');

describe('<XUIPickitem />', () => {
  it('renders a basic example with no options', () => {
    const basic = renderer.create(<XUIPickitem id="item1">Item 1</XUIPickitem>);
    expect(basic).toMatchSnapshot();
  });

  it.skip('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIPickitem id="item1">Item 1</XUIPickitem>);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });

  it('renders a pickitem with most compatible options', () => {
    const allOptions = renderer.create(
      <XUIPickitem
        className="custom-classname"
        id="item1"
        leftElement={<XUIAvatar value="Tim Redmond" size="2xsmall" />}
        rightElement={<XUIIcon icon={arrow} />}
        primaryElement="Item 1"
        secondaryElement="Here is a bunch of secondary text"
        headingElement="Item 1 heading"
        pinnedElement="234"
        isSelected
        isInvalid
        isDisabled
        isMultiline
      />,
    );
    expect(allOptions).toMatchSnapshot();
  });

  it('should set an automation id when a qaHook is provided', () => {
    const automationid = renderer.create(
      <XUIPickitem qaHook="test-pickitem" id="item1">
        Item 1
      </XUIPickitem>,
    );
    expect(automationid).toMatchSnapshot();
  });

  it('renders a selected multiselect pickitem (overriding leftElement)', () => {
    const multiselect = renderer.create(
      <XUIPickitem
        className="custom-classname"
        id="item1"
        isMultiselect
        isSelected
        leftElement={<XUIAvatar value="Tim Redmond" size="2xsmall" />}
        primaryElement="Item 1"
      />,
    );
    expect(multiselect).toMatchSnapshot();
  });

  it('renders a selected multiselect pickitem without selected styles', () => {
    const multiselect = renderer.create(
      <XUIPickitem
        id="item1"
        isMultiselect
        isSelected
        disableSelectedStyles
        primaryElement="Item 1"
      />,
    );
    expect(multiselect).toMatchSnapshot();
  });

  it('renders a regular pickitem with truncation', () => {
    const truncation = renderer.create(
      <XUIPickitem
        id="item1"
        primaryElement="Item 1"
        secondaryElement="Here is a bunch of secondary text"
        pinnedElement="234"
        shouldTruncate
      />,
    );
    expect(truncation).toMatchSnapshot();
  });

  it('renders a multiselect pickitem with truncation', () => {
    const truncation = renderer.create(
      <XUIPickitem
        id="item1"
        primaryElement="Item 1"
        secondaryElement="Here is a bunch of secondary text"
        pinnedElement="234"
        isMultiselect
        shouldTruncate
      />,
    );
    expect(truncation).toMatchSnapshot();
  });

  it('renders a truncating pickitem with secondary text', () => {
    const secondaryText = renderer.create(
      <XUIPickitem
        id="item1"
        primaryElement="Item 1"
        secondaryElement="Here is a bunch of secondary text"
        shouldTruncate
      />,
    );
    expect(secondaryText).toMatchSnapshot();
  });

  it('renders a truncating pickitem with leftelement', () => {
    const leftelement = renderer.create(
      <XUIPickitem
        id="item1"
        primaryElement="Item 1"
        leftElement={<XUIAvatar value="Tim Redmond" size="2xsmall" />}
        shouldTruncate
      />,
    );
    expect(leftelement).toMatchSnapshot();
  });

  it('renders a truncating pickitem with secondary text and leftelement', () => {
    const secondaryAndLeft = renderer.create(
      <XUIPickitem
        id="item1"
        primaryElement="Item 1"
        secondaryElement="Here is a bunch of secondary text"
        leftElement={<XUIAvatar value="Tim Redmond" size="2xsmall" />}
        shouldTruncate
      />,
    );
    expect(secondaryAndLeft).toMatchSnapshot();
  });

  it('passes event handlers to the PickitemBody (button)', () => {
    const onClickMock = jest.fn();
    const onBlurMock = jest.fn();
    const onFocusMock = jest.fn();
    const onMouseOverMock = jest.fn();
    const onKeyDownMock = jest.fn();
    const wrapper = mount(
      <XUIPickitem
        onClick={onClickMock}
        onFocus={onFocusMock}
        onBlur={onBlurMock}
        onKeyDown={onKeyDownMock}
        onMouseOver={onMouseOverMock}
        id="item1"
      >
        Item 1
      </XUIPickitem>,
    );

    const button = wrapper.find('button').first();
    button.simulate('click');
    expect(onClickMock).toHaveBeenCalledTimes(1);
    button.simulate('focus');
    expect(onFocusMock).toHaveBeenCalledTimes(1);
    button.simulate('blur');
    expect(onBlurMock).toHaveBeenCalledTimes(1);
    button.simulate('keydown');
    expect(onKeyDownMock).toHaveBeenCalledTimes(1);
    button.simulate('mouseover');
    expect(onMouseOverMock).toHaveBeenCalledTimes(1);
  });

  it('passes event handlers to the PickitemBody (anchor)', () => {
    const onClickMock = jest.fn();
    const onBlurMock = jest.fn();
    const onFocusMock = jest.fn();
    const onMouseOverMock = jest.fn();
    const onKeyDownMock = jest.fn();
    const wrapper = mount(
      <XUIPickitem
        href="http://xui.xero.com"
        onClick={onClickMock}
        onFocus={onFocusMock}
        onBlur={onBlurMock}
        onKeyDown={onKeyDownMock}
        onMouseOver={onMouseOverMock}
        id="item1"
      >
        Item 1
      </XUIPickitem>,
    );

    const anchor = wrapper.find('a').first();
    anchor.simulate('click');
    expect(onClickMock).toHaveBeenCalledTimes(1);
    anchor.simulate('focus');
    expect(onFocusMock).toHaveBeenCalledTimes(1);
    anchor.simulate('blur');
    expect(onBlurMock).toHaveBeenCalledTimes(1);
    anchor.simulate('keydown');
    expect(onKeyDownMock).toHaveBeenCalledTimes(1);
    anchor.simulate('mouseover');
    expect(onMouseOverMock).toHaveBeenCalledTimes(1);
  });

  it('passes event handlers to the PickitemMultiselect', () => {
    const onClickMock = jest.fn();
    const onBlurMock = jest.fn();
    const onFocusMock = jest.fn();
    const onMouseOverMock = jest.fn();
    const onKeyDownMock = jest.fn();
    const wrapper = mount(
      <XUIPickitem
        isMultiselect
        onClick={onClickMock}
        onFocus={onFocusMock}
        onBlur={onBlurMock}
        onKeyDown={onKeyDownMock}
        onMouseOver={onMouseOverMock}
        id="item1"
      >
        Item 1
      </XUIPickitem>,
    );

    const label = wrapper.find('.xui-pickitem--body').first();
    label.simulate('click');
    expect(onClickMock).toHaveBeenCalledTimes(1);
    label.first().simulate('focus');
    expect(onFocusMock).toHaveBeenCalledTimes(1);
    label.first().simulate('blur');
    expect(onBlurMock).toHaveBeenCalledTimes(1);
    label.first().simulate('keydown');
    expect(onKeyDownMock).toHaveBeenCalledTimes(1);
    label.first().simulate('mouseover');
    expect(onMouseOverMock).toHaveBeenCalledTimes(1);
  });

  describe('Horizontal Pickitem', () => {
    const incompatibleProps = {
      isMultiselect: true,
      checkboxClassName: 'test',
      isSplit: true,
      isMultiline: true,
      rightElement: <div>Test</div>,
      pinnedElement: <div>Test</div>,
      headingElement: <div>Test</div>,
    };

    Object.keys(incompatibleProps).forEach(incompatibleProp => {
      it(`throws an error when trying to use ${incompatibleProp}`, () => {
        expect(() => {
          mount(
            <XUIPickitem
              _isHorizontal
              id="test"
              {...{ [incompatibleProp]: incompatibleProps[incompatibleProp] }}
            >
              Test
            </XUIPickitem>,
          );
        }).toThrowError(
          `Warning: Failed prop type: \`${incompatibleProp}\` is not supported by horizontal \`XUIPickitem\`.`,
        );
      });
    });
  });
});
