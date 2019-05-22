import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

import XUIAvatar from '../XUIAvatar';
import {sizeClassNames, variantClassNames} from '../constants';

describe('XUIAvatar', () => {

	it('should render an `abbr` avatar when I give it an identifier and a value', () => {

		const test = <XUIAvatar value="Test" identifier="12345-1234-1234-123456"/>;

		const snap = renderer.create(test);
		expect(snap).toMatchSnapshot();

		const jestDom = shallow(test);
		expect(jestDom.text()).toBe('T');
		expect(jestDom.find('abbr')).toHaveLength(1);
	});

	it('should render an `abbr` avatar when I give it a value', () => {

		const test = <XUIAvatar value="Test"/>;

		const snap = renderer.create(test);
		expect(snap).toMatchSnapshot();

		const jestDom = shallow(test);
		expect(jestDom.text()).toBe('T');
		expect(jestDom.find('abbr')).toHaveLength(1);
	});

	it('should render an `img` avatar when I give it an image and a value', () => {

		const test = <XUIAvatar imageUrl="https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg" value="Test"/>;

		const snap = renderer.create(test);
		expect(snap).toMatchSnapshot();

		const jestDom = shallow(test);
		expect(jestDom.find('img')).toHaveLength(1);
	});

	it('should render a broken image as an `abbr` avatar', () => {

		const performTestsAfterError = () => {
			expect(jestDom.text()).toBe('T');
			expect(jestDom.find('abbr')).toHaveLength(1);
		}

		const jestDom = mount(
			<XUIAvatar
				value="Test"
				onError={performTestsAfterError}
				imageUrl="https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/25.jpg"/>
		);

	})

	it('should render in a range of sizes', () => {
		Object.keys(sizeClassNames).forEach(size => {
			const test = <XUIAvatar value="Test" size={size} />;

			const snap = renderer.create(test);
			expect(snap).toMatchSnapshot();
		});
	});

	it('should render in a range of variants', () => {
		Object.keys(variantClassNames).forEach(variant => {
			const test = <XUIAvatar value="Test" variant={variant} />;

			const snap = renderer.create(test);
			expect(snap).toMatchSnapshot();
		});
	});

	describe('Handlers', () => {
		it('should throw an error when the image doesn\'t exist', () => {
			const onErrorHandler = jest.fn();
			const mountedComponent = mount(
				<XUIAvatar
					value="Test"
					onError={onErrorHandler}
					imageUrl="https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/25.jpg"/>
			);

			mountedComponent.find('img').simulate('error');
			expect(onErrorHandler).toHaveBeenCalledTimes(1);

		});

		it('should call the onError internal method when the image doesn\'t exist', () => {
			const testString = 'test';
			const onErrorHandler = jest.fn();

			const mountedComponent = mount(
				<XUIAvatar
					value="Test"
					onError={onErrorHandler}
					imageUrl="https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/25.jpg"/>
			);

			mountedComponent.instance().onError(testString);
			expect(onErrorHandler).toHaveBeenCalledWith(testString);
		});
	});

	describe('Generic tests', () => {
		it('should accept a custom className', () => {
			const testClass = 'test-class';
			const test = <XUIAvatar value="Test" className={testClass}/>;

			const snap = renderer.create(test);
			expect(snap).toMatchSnapshot();

			const jestDom = mount(test);
			expect(jestDom.getDOMNode().classList.contains(testClass)).toBeTruthy();
		});

		it('should accept a custom qaHook', () => {
			const testHook = 'test-hook';
			const test = <XUIAvatar value="Test" qaHook={testHook}/>;

			const snap = renderer.create(test);
			expect(snap).toMatchSnapshot();

			const jestDom = mount(test);
			expect(jestDom.getDOMNode().getAttribute('data-automationid')).toBe(testHook);
		});
	});

	describe('Expected proptype failures', () => {
		it('should throw an error if you dont pass a value property', () => {
			expect(() => renderer.create(
				<XUIAvatar
				imageUrl="https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg"
				 />
			)).toThrow();
		});
	});
});
