import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIPill from '../XUIPill';
import XUIAvatar from '../../avatar/XUIAvatar';

Enzyme.configure({ adapter: new Adapter() });

const NOOP = () => {};

describe('<XUIPill />', () => {

	it('renders with correct XUI classes including layout', () => {
		const pill = shallow(<XUIPill />);

		expect(pill.hasClass('xui-pill-layout')).toBeTruthy();
	});

	it('render pill text in a button by default', () => {
		const pill = shallow(
			<XUIPill />
		);

		expect(pill.hasClass('xui-pill')).toBeTruthy();
		expect(pill.find('button')).toBeTruthy();
	});

	it('renders the pill with the specified className prop', () => {
		const pill = shallow(
			<XUIPill className='xui-test-class' />
		);

		expect(pill.hasClass('xui-test-class')).toBeTruthy();
	});

	it('renders the pill with the specified value prop', () => {
		const pill = renderer.create(
			<XUIPill value="Value Pill" />
		);

		expect(pill).toMatchSnapshot();
	});

	it('will render the pill text in an "a" tag when a href prop is provided', () => {
		const pill = shallow(
			<XUIPill href="http://xero.com"/>
		);

		expect(pill.find('a')).toBeTruthy();
	});

	it('renders the pill with the invalid class when the isInvalid prop is true', () => {
		const pill = shallow(
			<XUIPill isInvalid={true} />
		);

		expect(pill.hasClass('xui-pill-is-invalid')).toBeTruthy();
	});

	it('will render avatars when passed as an avatar prop', () => {
		const imageUrl = "https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg";
		const avatarProps = {
			imageUrl,
			size: 'small',
			role: 'presentation',
			value: 'A'
		};
		const pill = shallow(
			<XUIPill avatarProps={avatarProps} />
		);

		expect(pill.find('.xui-avatar')).toBeTruthy();
	});

	it('renders the pill with the provided avatar component', () => {
		const avatar = <XUIAvatar value="value pill" size="small" />
		const pill = renderer.create(
			<XUIPill value="Value Pill" avatar={avatar} />
		);

		expect(pill).toMatchSnapshot();
	});

	it('expect an error if both avatar and avatarProps are provided', () => {
		const imageUrl = "https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg";
		const avatar = <XUIAvatar value="value pill" size="small" />
		const avatarProps = {
			imageUrl,
			size: 'small',
			role: 'presentation',
			value: 'A'
		};
		expect(() => renderer.create(
			<XUIPill value="Value Pill" avatar={avatar} avatarProps={avatarProps} />
		)).toThrow();
	});

	it('renders the pill without the xui-pill-layout class when defaultLayout prop is false', () => {
		const pill = shallow(
			<XUIPill defaultLayout={false} />
		);

		expect(pill.hasClass('xui-pill-layout')).toBeFalsy();
	});

	it('renders the pill without the xui-pill-layout class by default', () => {
		const pill = shallow(
			<XUIPill />
		);

		expect(pill.hasClass('xui-pill-layout')).toBeTruthy();
	});

	it('invokes the callback passed into the onDeleteClick prop with itself passed in as an argument', () => {
		const callback = jest.fn();
		const pill = shallow(
			<XUIPill value="Pill" onDeleteClick={callback} />
		);

		pill.find('.xui-pill--button-icon').simulate('click');
		expect(callback.mock.calls.length).toEqual(1);
	});

	it('invokes the callback passed into the onClick prop', () => {
		const callback = jest.fn();
		const pill = mount(
			<XUIPill value="Pill" onClick={callback} />
		);

		pill.find('.xui-button').simulate('click');
		expect(callback.mock.calls.length).toEqual(1);
	});

	it('renders the text passed in the secondaryText prop', () => {
		const pill = mount(
			<XUIPill secondaryText='supplementary' />
		);

		expect(pill.find('.xui-pill--secondary').text()).toEqual('supplementary');
	});

	it('renders itself as focused appropriately', () => {
		const pill = mount(
			<XUIPill />
		);

		pill.childAt(0).simulate('focus')

		expect(pill.childAt(0).hasClass('xui-pill-is-focused')).toBeTruthy();
	});

	it('should render an automation id when a qaHook is passed in', () => {
		const automationid = renderer.create(<XUIPill qaHook="pill-test" />);

		expect(automationid).toMatchSnapshot();
	});

	it('should render a title when passed', () => {
		const pill = renderer.create(<XUIPill title="pill title" />);

		expect(pill).toMatchSnapshot();
	});

	it('should render a target when passed in', () => {
		const pill = renderer.create(<XUIPill href="http://xero.com" target="_blank" />);

		expect(pill).toMatchSnapshot();
	});

	it('should render an error icon when invalid', () => {
		const pill = renderer.create(<XUIPill value="Error pill" isInvalid />);

		expect(pill).toMatchSnapshot();
	});

	it('should render an error icon when invalid even with an avatar', () => {

		const imageUrl = "https://s3.amazonaws.com/uifaces/faces/twitter/kerihenare/24.jpg";
		const avatarProps = {
			imageUrl,
			size: 'small',
			role: 'presentation',
			value: 'A'
		};

		const pill = renderer.create(<XUIPill value="Error pill" isInvalid {...avatarProps} />);

		expect(pill).toMatchSnapshot();
	});

	it('should render a label for the delete button when passed in', () => {
		const pill = shallow(<XUIPill deleteButtonLabel="alternate delete label" onDeleteClick={NOOP}/>);

		expect(pill.find('.xui-pill--button-icon').html()).toContain('title="alternate delete label"');
	});

	it('should render a delete button label of \'Delete\' by default', () => {
		const pill = shallow(<XUIPill onDeleteClick={NOOP}/>);

		expect(pill.find('.xui-pill--button-icon').html()).toContain('title="Delete"');
	});

	it('should swicth the focus state when toggleFocus is called', () => {
		const pill = shallow(<XUIPill />);

		expect(pill.state('isFocused')).toBeFalsy();

		pill.instance().toggleFocus();

		expect(pill.state('isFocused')).toBeTruthy();
	});


});
