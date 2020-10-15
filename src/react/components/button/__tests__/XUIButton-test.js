import React from 'react';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import XUIButton from '../XUIButton';
import external from '@xero/xui-icon/icons/external';
import plus from '@xero/xui-icon/icons/plus';
import settings from '@xero/xui-icon/icons/settings';

const { renderIntoDocument } = require('react-dom/test-utils');
Enzyme.configure({ adapter: new Adapter() });

const noop = () => {};

describe('<XUIButton/>', () => {
  it('should render as a button element when no type is provided', () => {
    const button = render(<XUIButton onClick={noop}>test</XUIButton>);

    expect(button.is('button')).toBe(true);
    expect(button.text()).toEqual('test');
  });

  it('should render as a link element when isLink flag is set', () => {
    const button = render(
      <XUIButton href="https://google.com" isLink={true}>
        foo
      </XUIButton>,
    );

    expect(button.is('a')).toBe(true);
    expect(button.text()).toEqual('foo');
  });

  it('should set the `target` prop as the `target` attribute if rendering a link', () => {
    const button = render(
      <XUIButton isLink={true} href="https://google.com" target="_blank" isExternalLink={true}>
        foo
      </XUIButton>,
    );

    expect(button.prop('target')).toEqual('_blank');
  });

  it('should render as a link element with `rel="external noopener noreferrer"` if the `isExternalLink` prop is true', () => {
    const button = render(
      <XUIButton isLink={true} href="https://google.com" isExternalLink={true}>
        foo
      </XUIButton>,
    );

    expect(button.prop('rel')).toEqual('external noopener noreferrer');
  });

  it('should render as a link element with existing `rel` value intact when `isExternalLink` prop is true', () => {
    const button = render(
      <XUIButton
        isLink={true}
        href="https://google.com"
        target="_blank"
        rel="help"
        isExternalLink={true}
      >
        Help
      </XUIButton>,
    );

    expect(button.prop('rel')).toEqual('help external noopener noreferrer');
  });

  it('should be able to receive and handle an onClick callback', () => {
    const onClick = jest.fn();
    const button = mount(<XUIButton onClick={onClick}>test</XUIButton>);

    // although this component can trigger the 'onClick' handler with either
    // 'enter' or 'space' keyPress, that cannot be simulated as expected using Simulate
    button.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should render a loader and in a disabled style if the `isLoading` prop is true', () => {
    const button = render(
      <XUIButton onClick={noop} isLoading={true} loadingAriaLabel="Loading">
        Hai
      </XUIButton>,
    );

    expect(button.children().length).toEqual(2);
    expect(button.hasClass('xui-button-is-disabled')).toBe(true);
    expect(button.children()[1].attribs.class).toContain('xui-button--loader');
  });

  it('should not allow clicks if the `isLoading` prop is true', () => {
    const onClick = jest.fn();
    const button = mount(
      <XUIButton isLoading={true} loadingAriaLabel="Loading" onClick={onClick}>
        test
      </XUIButton>,
    );

    button.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(0);
  });

  it('should work even if the button is a link and no click handler has been defined', () => {
    const button = mount(
      <XUIButton href="https://google.com" isLink={true}>
        Action
      </XUIButton>,
    );

    expect(() => button.simulate('click')).not.toThrow();
  });

  it('links with an onclick handler should be able to handle click events with the handler', () => {
    const onClick = jest.fn();
    const button = mount(
      <XUIButton isLink={true} onClick={onClick}>
        test
      </XUIButton>,
    );

    button.simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has a role attribute for links which function like buttons', () => {
    const button = render(<XUIButton isLink href="https://www.xero.com/" onClick={() => {}} />);

    expect(button.prop('role')).toEqual('button');
  });

  it('does not have a role attribute for links which are just styled like buttons', () => {
    const button = render(<XUIButton isLink href="https://www.xero.com/" />);

    expect(button.prop('role')).toBe(undefined);
  });

  it('focus() should focus the DOM node', async () => {
    const button = renderIntoDocument(<XUIButton onClick={noop}>test</XUIButton>);
    button.focus();
    expect(button.rootNode).toEqual(document.activeElement);
  });

  it('hasFocus() should accurately reflect whether or not the main button DOM node has focus', () => {
    const button = renderIntoDocument(<XUIButton onClick={noop}>test</XUIButton>);
    expect(button.hasFocus()).toBe(false);
    button.focus();
    expect(button.hasFocus()).toBe(true);
  });

  it('does retain layout checks with a myriad of combinations', () => {
    const defaultRetainLayout = renderer.create(
      <XUIButton variant="primary">Hello, I am a long bit of text</XUIButton>,
    );

    expect(defaultRetainLayout).toMatchSnapshot();

    const defaultRetainLayoutWhileLoading = renderer.create(
      <XUIButton variant="primary" isLoading loadingAriaLabel="Loading">
        Hello, I am a long bit of text
      </XUIButton>,
    );

    expect(defaultRetainLayoutWhileLoading).toMatchSnapshot();

    const loadingButtonNoRetain = renderer.create(
      <XUIButton variant="primary" isLoading loadingAriaLabel="Loading" retainLayout={false}>
        Hello, I am a long bit of text
      </XUIButton>,
    );

    expect(loadingButtonNoRetain).toMatchSnapshot();
  });

  it('adds minwidth when we need it to, for short buttons', () => {
    const shortButton = renderer.create(
      <XUIButton variant="primary" minLoaderWidth>
        75px
      </XUIButton>,
    );

    expect(shortButton).toMatchSnapshot();
  });

  it('has a size class applied', () => {
    const primary = render(<XUIButton />);

    expect(primary.hasClass('xui-button-medium')).toBe(true);
  });

  it('does not have a size class applied if the variant is unstyled', () => {
    const primary = render(<XUIButton variant="unstyled" />);

    expect(primary.hasClass('xui-button-medium')).toBe(false);
  });

  it('renders an icon or caret when the appropriate prop is received', () => {
    const hasLeftIcon = renderer.create(<XUIButton leftIcon={settings}>Settings</XUIButton>);
    const hasRightIcon = renderer.create(
      <XUIButton rightIcon={external}>Link to elsewhere</XUIButton>,
    );
    const hasCaret = renderer.create(<XUIButton hasCaret>I’m a dropdown trigger</XUIButton>);

    expect(hasLeftIcon).toMatchSnapshot();
    expect(hasRightIcon).toMatchSnapshot();
    expect(hasCaret).toMatchSnapshot();
  });
});
