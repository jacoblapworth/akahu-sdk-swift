import { assert } from 'chai';
import React from 'react';
import sinon from 'sinon';
import XUIButton from '../XUIButton';
import renderer from 'react-test-renderer';

const { renderIntoDocument, Simulate } = require('react-dom/test-utils');
const noop = () => {};

describe('<XUIButton/>', () => {
  it('should render as a button element when no type is provided', () => {
    const button = renderIntoDocument(<XUIButton onClick={noop}>test</XUIButton>);

    const node = button.rootNode;
    assert.strictEqual(node.tagName.toLowerCase(), 'button');
    assert.strictEqual(node.textContent, 'test');
  });

  it('should render as a link element when isLink flag is set', () => {
    const button = renderIntoDocument(
      <XUIButton href="https://google.com" isLink={true}>
        foo
      </XUIButton>,
    );

    const node = button.rootNode;
    assert.strictEqual(node.tagName, 'A');
    assert.strictEqual(node.innerHTML, 'foo');
  });

  it('should set the `target` prop as the `target` attribute if rendering a link', () => {
    const button = renderIntoDocument(
      <XUIButton isLink={true} href="https://google.com" target="_blank" isExternalLink={true}>
        foo
      </XUIButton>,
    );

    const node = button.rootNode;
    assert.strictEqual(node.getAttribute('target'), '_blank');
  });

  it('should render as a link element with `rel="external noopener noreferrer"` if the `isExternalLink` prop is true', () => {
    const button = renderIntoDocument(
      <XUIButton isLink={true} href="https://google.com" isExternalLink={true}>
        foo
      </XUIButton>,
    );

    const node = button.rootNode;
    assert.strictEqual(node.getAttribute('rel'), 'external noopener noreferrer');
  });

  it('should render as a link element with existing `rel` value intact when `isExternalLink` prop is true', () => {
    const button = renderIntoDocument(
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

    const node = button.rootNode;
    assert.strictEqual(node.getAttribute('rel'), 'help external noopener noreferrer');
  });

  it('should be able to receive and handle an onClick callback', () => {
    const onClick = sinon.spy();

    const button = renderIntoDocument(<XUIButton onClick={onClick}>test</XUIButton>);

    // although this component can trigger the 'onClick' handler with either
    // 'enter' or 'space' keyPress, that cannot be simulated as expected using Simulate
    Simulate.click(button.rootNode);
    assert.isTrue(onClick.calledOnce);
  });

  it('should render a loader and in a disabled style if the `isLoading` prop is true', () => {
    const button = renderIntoDocument(
      <XUIButton onClick={noop} isLoading={true} loadingLabel="Loading">
        Hai
      </XUIButton>,
    );

    const node = button.rootNode;
    assert.strictEqual(node.children.length, 2);
    assert.isTrue(node.children[1].classList.contains('xui-button--loader'));
    assert.isTrue(node.classList.contains('xui-button-is-disabled'));
  });

  it('should not allow clicks if the `isLoading` prop is true', () => {
    const onClick = sinon.spy();

    const button = renderIntoDocument(
      <XUIButton isLoading={true} loadingLabel="Loading" onClick={onClick}>
        test
      </XUIButton>,
    );

    Simulate.click(button.rootNode);

    assert.isFalse(onClick.calledOnce);
  });

  it('should work even if the button is a link and no click handler has been defined', () => {
    const button = renderIntoDocument(
      <XUIButton href="https://google.com" isLink={true}>
        Action
      </XUIButton>,
    );
    assert.doesNotThrow(() => {
      Simulate.click(button.rootNode);
    }, Error);
  });

  it('links with an onclick handler should be able to handle click events with the handler', () => {
    const onClick = sinon.spy();
    const button = renderIntoDocument(
      <XUIButton isLink={true} onClick={onClick}>
        test
      </XUIButton>,
    );
    Simulate.click(button.rootNode);
    assert.isTrue(onClick.calledOnce);
  });

  it('renders borderless buttons with the correct classes', () => {
    const primary = renderIntoDocument(
      <XUIButton variant="borderless-primary" onClick={() => {}} />,
    );
    assert.isTrue(primary.rootNode.classList.contains('xui-button-borderless-main'));

    const create = renderIntoDocument(<XUIButton variant="borderless-create" onClick={() => {}} />);
    assert.isTrue(create.rootNode.classList.contains('xui-button-borderless-create'));

    const standard = renderIntoDocument(
      <XUIButton variant="borderless-standard" onClick={() => {}} />,
    );
    assert.isTrue(standard.rootNode.classList.contains('xui-button-borderless-standard'));

    const negative = renderIntoDocument(
      <XUIButton variant="borderless-negative" onClick={() => {}} />,
    );
    assert.isTrue(negative.rootNode.classList.contains('xui-button-borderless-negative'));

    const inverted = renderIntoDocument(
      <XUIButton variant="borderless-inverted" onClick={() => {}} />,
    );
    assert.isTrue(inverted.rootNode.classList.contains('xui-button-borderless-inverted'));

    const muted = renderIntoDocument(<XUIButton variant="borderless-muted" onClick={() => {}} />);
    assert.isTrue(muted.rootNode.classList.contains('xui-button-borderless-muted'));
  });

  it('has a role attribute for links which function like buttons', () => {
    const button = renderIntoDocument(
      <XUIButton isLink href="https://www.xero.com/" onClick={() => {}} />,
    );
    assert.strictEqual(button.rootNode.getAttribute('role'), 'button');
  });

  it('does not have a role attribute for links which are just styled like buttons', () => {
    const button = renderIntoDocument(<XUIButton isLink href="https://www.xero.com/" />);
    assert.isNull(button.rootNode.getAttribute('role'));
  });

  it('focus() should focus the DOM node', () => {
    const button = renderIntoDocument(<XUIButton onClick={noop}>test</XUIButton>);
    button.focus();
    assert.isTrue(button.rootNode === document.activeElement);
  });

  it('hasFocus() should accurately reflect whether or not the main button DOM node has focus', () => {
    const button = renderIntoDocument(<XUIButton onClick={noop}>test</XUIButton>);
    assert.isFalse(button.hasFocus(), 'said has focus when it does not');
    button.focus();
    assert.isTrue(button.hasFocus(), 'said does not have focus when does');
  });

  it('renders inverted buttons in different variations correctly', () => {
    const standardInvertedbutton = renderIntoDocument(
      <XUIButton isInverted variant="primary">
        test
      </XUIButton>,
    );
    assert.isTrue(
      standardInvertedbutton.rootNode.classList.contains('xui-button-main'),
      'Primary button has primary class',
    );
    assert.isTrue(
      standardInvertedbutton.rootNode.classList.contains('xui-button-inverted'),
      'Primary button has inverted class',
    );
    assert.isFalse(
      standardInvertedbutton.rootNode.classList.contains('xui-button-borderless-main'),
      'Primary button does not have borderless main class',
    );

    const borderlessInvertedbutton = renderIntoDocument(
      <XUIButton isInverted variant="borderless-primary">
        test
      </XUIButton>,
    );
    assert.isTrue(
      borderlessInvertedbutton.rootNode.classList.contains('xui-button-borderless-main'),
      'Borderless primary button has borderless primary class',
    );
    assert.isTrue(
      borderlessInvertedbutton.rootNode.classList.contains('xui-button-borderless-inverted'),
      'Borderless primary button has borderless inverted class',
    );
    assert.isFalse(
      borderlessInvertedbutton.rootNode.classList.contains('xui-button-inverted'),
      'Borderless primary button does not have regular inverted class',
    );
  });

  it('does retain layout checks with a myriad of combinations', () => {
    const defaultRetainLayout = renderer.create(
      <XUIButton variant="primary">Hello, I am a long bit of text</XUIButton>,
    );

    expect(defaultRetainLayout).toMatchSnapshot();

    const defaultRetainLayoutWhileLoading = renderer.create(
      <XUIButton variant="primary" isLoading loadingLabel="Loading">
        Hello, I am a long bit of text
      </XUIButton>,
    );

    expect(defaultRetainLayoutWhileLoading).toMatchSnapshot();

    const loadingButtonNoRetain = renderer.create(
      <XUIButton variant="primary" isLoading loadingLabel="Loading" retainLayout={false}>
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
    const primary = renderIntoDocument(<XUIButton />);
    assert.isTrue(primary.rootNode.classList.contains('xui-button-medium'));
  });

  it('does not have a size class applied if the variant is unstyled', () => {
    const primary = renderIntoDocument(<XUIButton variant="unstyled" />);
    assert.isFalse(primary.rootNode.classList.contains('xui-button-medium'));
  });
});
