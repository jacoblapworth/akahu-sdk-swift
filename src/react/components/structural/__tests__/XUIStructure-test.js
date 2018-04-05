import React from 'react';
import XUIRow from '../XUIRow';
import XUIColumn from '../XUIColumn';
import XUIPageheader from '../XUIPageheader';
import XUIBreadcrumb from '../XUIBreadcrumb';
import XUIPicklist from '../../picklist/Picklist';
import XUIPickitem from '../../picklist/Pickitem';
import XUIButton from '../../button/XUIButton';
import XUIActions from '../XUIActions';
import { rowVariants, columnShortNames } from '../private/constants';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUI Structure/>', () => {
	const primary = <XUIButton>Primary</XUIButton>
	const secondary = <XUIButton>Secondary</XUIButton>
	const tabs = (
		<XUIPicklist>
			<XUIPickitem id="1">Tab 1</XUIPickitem>
			<XUIPickitem id="2" isSelected={true}>Tab 2</XUIPickitem>
			<XUIPickitem id="3">This is tab 3</XUIPickitem>
		</XUIPicklist>
	);
	describe('Rows and columns:', () => {
		it('renders the base row with no extra settings passed', () => {
			const testRow = renderer.create(<XUIRow>Testing 💩</XUIRow>);
			expect(testRow).toMatchSnapshot();
		});
		it('renders the base column with no extra settings passed', () => {
			const testCol = renderer.create(<XUIColumn>Testing 💩</XUIColumn>);
			expect(testCol).toMatchSnapshot();
		});
		it('renders with the correct row variant classes', () => {
			Object.keys(rowVariants).forEach(variant => {
				const tag = shallow(<XUIRow variant={variant}>Testing 💩</XUIRow>);
				if(rowVariants[variant]){
					expect(tag.hasClass(`xui-row-${rowVariants[variant]}`)).toEqual(true);
				}
			});
		});
		it('renders with the correct column width classes, from shorthand', () => {
			Object.keys(columnShortNames).forEach(shorthand => {
				const tag = shallow(<XUIColumn gridColumns={shorthand}>Testing 💩</XUIColumn>);
				expect(tag.hasClass(`xui-column-${columnShortNames[shorthand]}-of-12`)).toEqual(true);
			});
		});
		it('renders the column with wide and medium column widths, if provided', () => {
			const testCol = renderer.create(<XUIColumn gridColumnsMedium="3" gridColumnsWide="6">Testing 💩</XUIColumn>);
			expect(testCol).toMatchSnapshot();
		});
		it('renders row classes that are passed in', () => {
			const wrapper = mount(<XUIRow className="testClass">Testing 💩</XUIRow>);
			const tag = wrapper.find(XUIRow);
			expect(tag.hasClass("testClass")).toEqual(true);
		});
		it('renders column classes that are passed in', () => {
			const wrapper = mount(<XUIColumn className="testClass">Testing 💩</XUIColumn>);
			const tag = wrapper.find(XUIColumn);
			expect(tag.hasClass("testClass")).toEqual(true);
		});
	});
	describe('Actions:', () => {
		it('renders the simplest actions with no extra settings passed', () => {
			const testActions = renderer.create(
				<XUIActions primary={primary} secondary={secondary}>Testing 💩</XUIActions>
			);
			expect(testActions).toMatchSnapshot();
		});
		it('renders extra actions classes that are passed in', () => {
			const wrapper = mount(<XUIActions primary={primary} className="testClass" />);
			const tag = wrapper.find(XUIActions);
			expect(tag.hasClass("testClass")).toEqual(true);
		});
		it('renders actions as a linear type layout', () => {
			const wrapper = mount(
				<XUIActions primary={primary} secondary={secondary} isLinear={true} />
			);
			expect(wrapper.find(".xui-actions-linear").length).toBe(1);
		});
		it('renders actions without default layout', () => {
			const wrapper = mount(<XUIActions primary={primary} hasLayout={false} />);
			expect(wrapper.find(".xui-actions-layout").length).toBe(0);
		});
	});
	describe('Pageheader and Breadcrumb:', () => {
		const actions = <XUIActions primary={primary} secondary={secondary} />;
		const bcObj = [
			{label: "hello", href: "#1"},
			{label: "hiya", href: "#2"},
			{label: "yo"}];
		const exampleBreadcrumb = <XUIBreadcrumb breadcrumbs={bcObj} />;
		it('renders the simplest pageheader with no extra settings passed', () => {
			const testPageheader = renderer.create(
				<XUIPageheader title="Testing 💩" />
			);
			expect(testPageheader).toMatchSnapshot();
		});
		it('renders pageheader without default layout', () => {
			const wrapper = mount(<XUIPageheader title="Testing 💩" hasLayout={false} />);
			expect(wrapper.find(".xui-pageheading--content-layout").length).toBe(0);
		});
		it('renders extra pageheader classes that are passed in', () => {
			const wrapper = mount(<XUIPageheader title="Testing 💩" className="testClass" />);
			const tag = wrapper.find(XUIPageheader);
			expect(tag.hasClass("testClass")).toEqual(true);
		});
		it('renders pageheader containing Actions', () => {
			const wrapper = mount(<XUIPageheader actions={actions} />);
			expect(wrapper.find(".xui-pageheading--actions").length).toBe(1);
		});
		it('renders pageheader with title and Actions', () => {
			const wrapper = mount(<XUIPageheader title="Testing 💩" actions={actions} />);
			expect(wrapper.find(".xui-pageheading--actions").length).toBe(1);
			expect(wrapper.find(".xui-pageheading--title").length).toBe(1);
		});
		it('renders pageheader with title and tabs and Actions', () => {
			const wrapper = mount(<XUIPageheader title="Testing 💩" tabs={tabs} actions={actions} />);
			expect(wrapper.find(".xui-pageheading--actions").length).toBe(1);
			expect(wrapper.find(".xui-pageheading--title").length).toBe(1);
			expect(wrapper.find(".xui-pageheading--tabs").length).toBe(1);
		});
		it('renders pageheader with Breadcrumb and Actions', () => {
			const wrapper = mount(<XUIPageheader breadcrumb={exampleBreadcrumb} actions={actions} />);
			expect(wrapper.find(".xui-pageheading--actions").length).toBe(1);
			expect(wrapper.find("ol.xui-pageheading--breadcrumbs.xui-breadcrumbs").length).toBe(1);
		});
		it('renders pageheader containing Breadcrumb', () => {
			const wrapper = mount(<XUIPageheader breadcrumb={exampleBreadcrumb} />);
			expect(wrapper.find("ol.xui-pageheading--breadcrumbs.xui-breadcrumbs").length).toBe(1);
		});
		it('renders pageheader with title ONLY, if both Breadcrumb and title are passed', () => {
			const wrapper = mount(<XUIPageheader title="Testing 💩" breadcrumb={exampleBreadcrumb} />);
			expect(wrapper.find("ol.xui-pageheading--breadcrumbs.xui-breadcrumbs").length).toBe(0);
		});
		it('renders pageheader containing tabs', () => {
			const wrapper = mount(<XUIPageheader tabs={tabs} />);
			expect(wrapper.find(".xui-pageheading--tabs").length).toBe(1);
			expect(wrapper.find(".xui-pageheading--title").length).toBe(0);
		});
		it('renders pageheader containing title and tabs', () => {
			const wrapper = mount(<XUIPageheader title="Testing 💩" tabs={tabs} />);
			expect(wrapper.find(".xui-pageheading--tabs").length).toBe(1);
		});
		it('renders pageheader with tabs ONLY, if both Breadcrumb and tabs are passed', () => {
			const wrapper = mount(<XUIPageheader breadcrumb={exampleBreadcrumb} tabs={tabs} />);
			expect(wrapper.find(".xui-pageheading--tabs").length).toBe(1);
			expect(wrapper.find("ol.xui-pageheading--breadcrumbs.xui-breadcrumbs").length).toBe(0);
		});
		it('renders pageheader with tabs and title but not Breadcrumb, though Breadcrumb is passed', () => {
			const wrapper = mount(<XUIPageheader title="Testing 💩" tabs={tabs} breadcrumb={exampleBreadcrumb} />);
			expect(wrapper.find(".xui-pageheading--tabs").length).toBe(1);
			expect(wrapper.find(".xui-pageheading--title").length).toBe(1);
			expect(wrapper.find("ol.xui-pageheading--breadcrumbs.xui-breadcrumbs").length).toBe(0);
		});
	});
});
