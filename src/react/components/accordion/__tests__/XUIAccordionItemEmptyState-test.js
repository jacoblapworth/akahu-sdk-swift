import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIAccordionItemEmptyState from '../XUIAccordionItemEmptyState';
import filter from '@xero/xui-icon/icons/filter';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIAccordionItemEmptyState />', () => {
    it('should render an automation id when passed in the qaHook prop', () => {
        const automationid = renderer.create(<XUIAccordionItemEmptyState qaHook={'test-qahook'} />);

        expect(automationid).toMatchSnapshot();
    });

    it('should include an icon that defaults to list', () => {
        const iconComp = renderer.create(<XUIAccordionItemEmptyState />);

        expect(iconComp).toMatchSnapshot();
    });

    it('should change the icon when the name is passed to iconPath', () => {
        const iconComp = renderer.create(<XUIAccordionItemEmptyState iconPath={filter}/>);

        expect(iconComp).toMatchSnapshot();
    });

    it('should render any children after the icon', () => {
        const childComp = renderer.create(<XUIAccordionItemEmptyState>Example Child Text</XUIAccordionItemEmptyState>);

        expect(childComp).toMatchSnapshot();
    });
});
