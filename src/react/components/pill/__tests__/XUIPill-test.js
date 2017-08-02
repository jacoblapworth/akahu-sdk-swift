import React from 'react';
import { assert } from 'chai';
import XUIPill from '../XUIPill';

const TestUtils = require('react-dom/test-utils');

describe('<XUIPill />', () => {

	it('renders with correct XUI classes including layout', () => {
		const pill = TestUtils.renderIntoDocument(
			<XUIPill />
		);

		const node = TestUtils.findRenderedDOMComponentWithClass(pill, 'xui-newpill');
		assert.isTrue(node.classList.contains('xui-newpill-layout'));
	});

	it('render pill text in a button by default', () => {
		const pill = TestUtils.renderIntoDocument(
			<XUIPill />
		);

		const node = TestUtils.findRenderedDOMComponentWithClass(pill, 'xui-newpill').firstChild;
		assert.strictEqual(node.tagName, 'BUTTON')
	});

	it('renders the pill with the specified className prop', () => {
		const pill = TestUtils.renderIntoDocument(
			<XUIPill className='xui-test-class' value="Classy Pill" />
		);

		const node = TestUtils.findRenderedDOMComponentWithClass(pill, 'xui-newpill');
		assert.isTrue(node.classList.contains('xui-test-class'));
	});

	it('renders the pill with the specified value prop', () => {
		const pill = TestUtils.renderIntoDocument(
			<XUIPill value="Value Pill" />
		);

		const node = TestUtils.findRenderedDOMComponentWithClass(pill, 'xui-newpill--content');
		assert.strictEqual(node.textContent, 'Value Pill');
	});

	it('will render the pill text in an "a" tag when a href prop is provided', () => {
		const pill = TestUtils.renderIntoDocument(
			<XUIPill value="Linky Pill" href="xero.com"/>
		);

		const node = TestUtils.findRenderedDOMComponentWithClass(pill, 'xui-newpill--content');
		assert.strictEqual(node.tagName, 'A');
	});

	it('renders the pill with the invalid class when the isInvalid prop is true', () => {
		const pill = TestUtils.renderIntoDocument(
			<XUIPill isInvalid={true} value="Invalid Pill" />
		);

		const node = TestUtils.findRenderedDOMComponentWithClass(pill, 'xui-newpill');
		assert.isTrue(node.classList.contains('xui-newpill-is-invalid'));
	});

	it('will render avatars when passed as an avatar prop', () => {
		const link = "https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg";
		const avatarProps = {
			imageUrl: link,
			size: 'small',
			role: 'presentation',
			value: 'A'
		};
		const pill = TestUtils.renderIntoDocument(
			<XUIPill avatarProps={avatarProps} value="Avatar Pill" />
		);

		const node = TestUtils.findRenderedDOMComponentWithClass(pill, 'xui-avatar');
		assert.strictEqual(node.src, link);
	});

	it('renders the pill without the xui-newpill--layout class when hasLayout prop is false', () => {
		const pill = TestUtils.renderIntoDocument(
			<XUIPill hasLayout={false} value="Ugly Pill" />
		);

		const node = TestUtils.findRenderedDOMComponentWithClass(pill, 'xui-newpill');
		assert.isFalse(node.classList.contains('xui-newpill-layout'));
	});

	it('invokes the callback passed into the onDeleteClick prop with itself passed in as an argument', () => {
		var value = "Value";
		const callback = (pill) => {value = pill.props.value};
		const pill = TestUtils.renderIntoDocument(
			<XUIPill value="Pill" onDeleteClick={callback} />
		);

		const node = TestUtils.findRenderedDOMComponentWithClass(pill, 'xui-button-icon');
		TestUtils.Simulate.click(node);
		assert.strictEqual(value, "Pill");
	});

	it('invokes the callback passed into the onClick prop', () => {
		const callback = jest.fn();
		const pill = TestUtils.renderIntoDocument(
			<XUIPill onClick={callback} />
		);

		const node = TestUtils.findRenderedDOMComponentWithClass(pill, 'xui-newpill--content');
		TestUtils.Simulate.click(node);
		expect(callback).toHaveBeenCalled();
	});

	it('renders the text passed in the secondaryText prop', () => {
		const pill = TestUtils.renderIntoDocument(
			<XUIPill secondaryText='supplementary' />
		);

		const node = TestUtils.findRenderedDOMComponentWithClass(pill, 'xui-newpill--content').firstChild;
		assert.strictEqual(node.textContent, 'supplementary')
	});

	it('renders itself as focussed appropriately', () => {
		const pill = TestUtils.renderIntoDocument(
			<XUIPill />
		);

		const node = TestUtils.findRenderedDOMComponentWithClass(pill, 'xui-newpill');
		assert.isFalse(node.classList.contains('xui-newpill-is-focussed'));
		TestUtils.Simulate.focus(node);
		assert.isTrue(node.classList.contains('xui-newpill-is-focussed'));
	});
});
