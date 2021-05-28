import React from 'react';
import * as testingLibrary from '@testing-library/react';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import overflowIcon from '@xero/xui-icon/icons/overflow';
import XUIIconButton from '../XUIIconButton';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

const requiredProps = {
  icon: overflowIcon,
  ariaLabel: 'Test Icon Button',
};

describe('<XUIIconButton/>', () => {
  it('should render an iconButton correctly with required props', () => {
    const wrapper = mount(<XUIIconButton {...requiredProps} />);

    expect(wrapper.find('svg')).toBeTruthy();
    expect(wrapper.getDOMNode().getAttribute('aria-label')).toEqual('Test Icon Button');
  });

  it('should render an inverted iconButton with an `isInverted` prop', () => {
    const iconButton = renderer.create(<XUIIconButton {...requiredProps} isInverted />);
    expect(iconButton).toMatchSnapshot();
  });

  it('focus() should focus the DOM node', () => {
    const buttonRef = React.createRef();
    testingLibrary.render(<XUIIconButton {...requiredProps} ref={buttonRef} />);
    buttonRef.current.rootNode.current.focus();
    expect(buttonRef.current.rootNode.current).toEqual(document.activeElement);
  });

  it('renders iconButtons with the correct icon size classes', () => {
    const iconButtonSizeVariants = renderer.create(
      <div>
        <XUIIconButton {...requiredProps} />
        <XUIIconButton {...requiredProps} size="small" />
        <XUIIconButton {...requiredProps} size="xsmall" />
      </div>,
    );

    expect(iconButtonSizeVariants).toMatchSnapshot();
  });

  it('should render inverted iconButtons with correct classes', () => {
    const wrapper = render(<XUIIconButton {...requiredProps} isInverted />);

    expect(wrapper.hasClass('xui-button-icon')).toBeTruthy();
    expect(wrapper.hasClass('xui-button-icon-inverted')).toBeTruthy();
    expect(wrapper.hasClass('xui-button-borderless-inverted')).toBeFalsy();
    expect(wrapper.hasClass('xui-button-inverted')).toBeFalsy();
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIIconButton {...requiredProps} />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
