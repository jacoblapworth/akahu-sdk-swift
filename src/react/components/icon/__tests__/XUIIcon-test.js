import React from 'react';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import XUIIcon from '../XUIIcon';
import accessibility from '@xero/xui-icon/icons/accessibility';

Enzyme.configure({ adapter: new Adapter() });

describe('XUIIcon', () => {
	it('Should render with any additional classes provided through the className prop', function () {
		const wrapper = mount(<XUIIcon path={accessibility} className={'classyMcClassFace'} />);
		expect(wrapper.getDOMNode().getAttribute('class')).toEqual(expect.stringContaining('classyMcClassFace'));
	});

	it('Should render with the correct size classes when modifiers are provided', function () {
		const wrapper = mount(
			<div>
				<XUIIcon path={accessibility} />
				<XUIIcon path={accessibility} size="large" />
				<XUIIcon path={accessibility} size="xlarge" />
			</div>
		);

		const icons = wrapper.find('.xui-icon');
		expect(icons.at(0).hasClass('xui-icon-large')).toBeFalsy()
		expect(icons.at(0).hasClass('xui-icon-xlarge')).toBeFalsy();

		expect(icons.at(1).hasClass('xui-icon-large')).toBeTruthy();

		expect(icons.at(2).hasClass('xui-icon-xlarge')).toBeTruthy();
	});

	it('Should render with the correct rotation classes when rotations are provided', function () {
		const wrapper = mount(
			<div>
				<XUIIcon path={accessibility} />
				<XUIIcon path={accessibility} rotation="90" />
				<XUIIcon path={accessibility} rotation="180" />
				<XUIIcon path={accessibility} rotation="270" />
			</div>
		);

		const icons = wrapper.find('.xui-icon');
		expect(icons.at(0).hasClass('xui-u-rotate-90')).toBeFalsy();
		expect(icons.at(0).hasClass('xui-u-rotate-180')).toBeFalsy();
		expect(icons.at(0).hasClass('xui-u-rotate-270')).toBeFalsy();

		expect(icons.at(1).hasClass('xui-u-rotate-90')).toBeTruthy();

		expect(icons.at(2).hasClass('xui-u-rotate-180')).toBeTruthy();

		expect(icons.at(3).hasClass('xui-u-rotate-270')).toBeTruthy();
	});

	it('Should render with the correct color class when color is provided', function () {
		const wrapper = mount(
			<div>
				<XUIIcon path={accessibility} />
				<XUIIcon path={accessibility} color={'standard'} />
				<XUIIcon path={accessibility} color={'red'} />
				<XUIIcon path={accessibility} color={'green'} />
				<XUIIcon path={accessibility} color={'white'} />
				<XUIIcon path={accessibility} color={'blue'} />
				<XUIIcon path={accessibility} color={'file_spreadsheet'} />
				<XUIIcon path={accessibility} color={'file_pdf'} />
				<XUIIcon path={accessibility} color={'white_faint'} />
				<XUIIcon path={accessibility} color={'white_muted'} />
			</div>
		);

		const icons = wrapper.find('.xui-icon');
		expect(icons.at(0).hasClass('xui-icon-color-standard')).toBeFalsy();
		expect(icons.at(0).hasClass('xui-icon-color-red')).toBeFalsy();
		expect(icons.at(0).hasClass('xui-icon-color-green')).toBeFalsy();
		expect(icons.at(0).hasClass('xui-icon-color-white')).toBeFalsy();
		expect(icons.at(0).hasClass('xui-icon-color-blue')).toBeFalsy();
		expect(icons.at(0).hasClass('xui-icon-color-file-spreadsheet')).toBeFalsy();
		expect(icons.at(0).hasClass('xui-icon-color-file-pdf')).toBeFalsy();
		expect(icons.at(0).hasClass('xui-icon-color-white-faint')).toBeFalsy();
		expect(icons.at(0).hasClass('xui-icon-color-white-muted')).toBeFalsy();

		expect(icons.at(1).hasClass('xui-icon-color-standard')).toBeTruthy();

		expect(icons.at(2).hasClass('xui-icon-color-red')).toBeTruthy();

		expect(icons.at(3).hasClass('xui-icon-color-green')).toBeTruthy();

		expect(icons.at(4).hasClass('xui-icon-color-white')).toBeTruthy();

		expect(icons.at(5).hasClass('xui-icon-color-blue')).toBeTruthy();

		expect(icons.at(6).hasClass('xui-icon-color-file-spreadsheet')).toBeTruthy();

		expect(icons.at(7).hasClass('xui-icon-color-file-pdf')).toBeTruthy();

		expect(icons.at(8).hasClass('xui-icon-color-white-faint')).toBeTruthy();

		expect(icons.at(9).hasClass('xui-icon-color-white-muted')).toBeTruthy();
	});

	it('Should render title and desc elements within the SVG element based on the props provided', function () {
		const wrapper = render(
			<XUIIcon
				path={accessibility}
				title="Happy poop title 💩"
				desc="Happy poop desc 💩" />
		);

		const title = wrapper.find('title').first();
		const desc = wrapper.find('desc').first();
		expect(title).toBeDefined();
		expect(title.text()).toEqual('Happy poop title 💩')
		expect(desc).toBeDefined();
		expect(desc.text()).toEqual('Happy poop desc 💩');
	});

	it('Should render with role="presentation" on the path element by default', function () {
		const wrapper = mount(<XUIIcon path={accessibility} />);
		expect(wrapper.find('path').prop('role')).toEqual("presentation");
	});

	it('Should render with the given role applied to the path element', function () {
		const wrapper = mount(<XUIIcon path={accessibility} role="img" />);
		expect(wrapper.find('path').prop('role')).toEqual('img');
	});
});
