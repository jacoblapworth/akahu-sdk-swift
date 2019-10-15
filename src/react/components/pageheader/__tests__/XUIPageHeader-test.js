import React from 'react';
import XUIPageHeader from '../XUIPageHeader';
import XUIBreadcrumb from '../XUIBreadcrumb';
import XUIPicklist from '../../picklist/Picklist';
import XUIPickitem from '../../picklist/Pickitem';
import XUIButton from '../../button/XUIButton';
import XUIActions from '../../actions/XUIActions';
import WidthContext from '../../../contexts/WidthContext';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUI PageHeader and Breadcrumb/>', () => {
  const qaHook = 'qaHook';
  const primary = <XUIButton>Primary</XUIButton>;
  const secondary = <XUIButton>Secondary</XUIButton>;
  const tabs = (
    <XUIPicklist>
      <XUIPickitem id="1">Tab 1</XUIPickitem>
      <XUIPickitem id="2" isSelected={true}>
        Tab 2
      </XUIPickitem>
      <XUIPickitem id="3">This is tab 3</XUIPickitem>
    </XUIPicklist>
  );
  const actions = <XUIActions primary={primary} secondary={secondary} />;
  const bcObj = [<span
    className="testy-mctesterson"
    key="1"
    onClick={() => alert('hello')}
    onKeyDown={() => {}}
    role="link"
    tabIndex="0"
  >
    hello
  </span>, { label: 'hiya', href: '#2' }, { label: 'yo' }];
  const bcObj2 = [{ label: 'Settings', href: '#1' }, { label: 'Edit', href: '#2' }];
  const bcObj3 = [
    { label: 'Settings', href: '#1' },
    { label: 'Edit', href: '#2' },
    { label: 'Invite', href: '#3' },
  ];
  const exampleBreadcrumb = <XUIBreadcrumb breadcrumbs={bcObj} qaHook={qaHook} />;
  it('renders the simplest pageHeader with no extra settings passed', () => {
    const testPageHeader = renderer.create(<XUIPageHeader title="Testing 💩" />);
    expect(testPageHeader).toMatchSnapshot();
  });
  it('renders pageHeader without default layout', () => {
    const wrapper = mount(<XUIPageHeader title="Testing 💩" hasLayout={false} />);
    expect(wrapper.find('.xui-pageheading--content-layout').length).toBe(0);
  });
  it('renders extra pageHeader classes that are passed in', () => {
    const testPageHeader = renderer.create(
      <XUIPageHeader title="Testing 💩" className="testClass" contentClassName="testClassTwo" />,
    );
    expect(testPageHeader).toMatchSnapshot();
  });
  it('renders pageHeader containing Actions', () => {
    const wrapper = mount(<XUIPageHeader actions={actions} />);
    expect(wrapper.find('.xui-pageheading--actions').length).toBe(1);
  });
  it('renders pageHeader with title and Actions', () => {
    const wrapper = mount(<XUIPageHeader title="Testing 💩" actions={actions} />);
    expect(wrapper.find('.xui-pageheading--actions').length).toBe(1);
    expect(wrapper.find('.xui-pageheading--title').length).toBe(1);
  });
  it('renders pageHeader with title and tabs and Actions', () => {
    const wrapper = mount(<XUIPageHeader title="Testing 💩" tabs={tabs} actions={actions} />);
    expect(wrapper.find('.xui-pageheading--actions').length).toBe(1);
    expect(wrapper.find('.xui-pageheading--title').length).toBe(1);
    expect(wrapper.find('ul.xui-pageheading--tabs').length).toBe(1);
  });
  it('renders pageHeader with Breadcrumb and Actions', () => {
    const wrapper = mount(
      <XUIPageHeader breadcrumb={exampleBreadcrumb} actions={actions} title="Test" />,
    );
    expect(wrapper.find('.xui-pageheading--actions').length).toBe(1);
    expect(wrapper.find('ol.xui-breadcrumbs').length).toBe(1);
  });
  it('errors when passed a Breadcrumb with no title', () => {
    expect(() => renderer.create(<XUIPageHeader breadcrumb={exampleBreadcrumb} />)).toThrow();
  });
  it('renders pageHeader containing Breadcrumb from nodes', () => {
    const bcNodeObj = [
      <span role="link" onClick={() => alert('hello')} key="1">
        hello
      </span>,
      <span role="link" onClick={() => alert('hiya')} key="2">
        hello
      </span>,
      <span key="3">yo</span>,
    ];
    const exampleNodeBreadcrumb = <XUIBreadcrumb breadcrumbs={bcNodeObj} />;
    const testPageHeader = renderer.create(
      <XUIPageHeader breadcrumb={exampleNodeBreadcrumb} title="Test" />,
    );
    expect(testPageHeader).toMatchSnapshot();
  });
  it('renders pageHeader containing tabs', () => {
    const wrapper = mount(<XUIPageHeader tabs={tabs} />);
    expect(wrapper.find('ul.xui-pageheading--tabs').length).toBe(1);
    expect(wrapper.find('.xui-pageheading--title').length).toBe(0);
  });
  it('renders pageHeader containing title and tabs', () => {
    const wrapper = mount(<XUIPageHeader title="Testing 💩" tabs={tabs} />);
    expect(wrapper.find('ul.xui-pageheading--tabs').length).toBe(1);
  });
  it('renders pageHeader with tabs, title, and Breadcrumb when all are passed', () => {
    const wrapper = mount(
      <XUIPageHeader title="Testing 💩" tabs={tabs} breadcrumb={exampleBreadcrumb} />,
    );
    expect(wrapper.find('ul.xui-pageheading--tabs').length).toBe(1);
    expect(wrapper.find('.xui-pageheading--title').length).toBe(1);
    expect(wrapper.find('ol.xui-breadcrumbs').length).toBe(1);
  });
  it('renders pageHeader and breadcrumb with automation id when qaHook prop is passed in', () => {
    const wrapper = renderer.create(
      <XUIPageHeader qaHook={qaHook} breadcrumb={exampleBreadcrumb} title="Test" />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('renders compact Breadcrumb, when at a width context below the specified size and breadcrumb length > 2', () => {
    const contextualBc = renderer.create(
      <WidthContext.Provider value={{ medium: false, small: true }}>
        <XUIBreadcrumb breadcrumbs={bcObj3} swapAtBreakpoint="medium" />
      </WidthContext.Provider>,
    );
    expect(contextualBc).toMatchSnapshot();
  });
  it('does not condense Breadcrumb, if context is too wide', () => {
    const contextualBc = renderer.create(
      <WidthContext.Provider value={{ medium: true, small: true }}>
        <XUIBreadcrumb breadcrumbs={bcObj3} swapAtBreakpoint="medium" />
      </WidthContext.Provider>,
    );
    expect(contextualBc).toMatchSnapshot();
  });
  it('does not condense Breadcrumb, if breadcrumb length < 3', () => {
    const contextualBc = renderer.create(
      <WidthContext.Provider value={{ medium: false, small: true }}>
        <XUIBreadcrumb breadcrumbs={bcObj2} swapAtBreakpoint="medium" />
      </WidthContext.Provider>,
    );
    expect(contextualBc).toMatchSnapshot();
  });
});
