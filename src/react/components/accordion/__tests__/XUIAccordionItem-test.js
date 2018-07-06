import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIAccordionItem from '../XUIAccordionItem';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIAccordionItem />', () => {
    const createComponent = (props = {}) => (
        <XUIAccordionItem
            trigger={<button>This is the trigger</button>}
            isOpen={false}
            {...props}
        />
    );

    it('should render an automation id when passed in the qaHook prop', () => {
        const automationid = renderer.create(createComponent({ qaHook: 'test-qahook' }));

        expect(automationid).toMatchSnapshot();
    });

    it('should render closed', () => {
        const closedItem = renderer.create(createComponent());

        expect(closedItem).toMatchSnapshot();
    });

    it('should render open, defaulting to empty state', () => {
        const openItem = renderer.create(createComponent({ isOpen: true }));

        expect(openItem).toMatchSnapshot();
    });

    it('should render open, with children', () => {
        const openItem = renderer.create(createComponent({
            isOpen: true,
            children: <div>A humble child component</div>
        }));

        expect(openItem).toMatchSnapshot();
    });

    it('should render open, and not pop', () => {
        const openItem = renderer.create(createComponent({ isOpen: true }));

        openItem.getInstance().setState({ left: 0, right: 1024 });

        expect(openItem).toMatchSnapshot();
    });

    it('should render open, and pop', () => {
        const openItem = renderer.create(createComponent({ isOpen: true }));

        openItem.getInstance().setState({ left: 30, right: 970 });

        expect(openItem).toMatchSnapshot();
    });
});
