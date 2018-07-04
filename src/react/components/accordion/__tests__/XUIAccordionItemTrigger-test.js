import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIAccordionItemTrigger from '../XUIAccordionItemTrigger';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIAccordionItemTrigger />', () => {
    const createComponent = (props = {}) => (
        <XUIAccordionItemTrigger onClick={() => {}} isOpen={false} {...props} />
    );

    it('should render an automation id when passed in the qaHook prop', () => {
        const automationid = renderer.create(createComponent({ qaHook: 'test-qahook' }));

        expect(automationid).toMatchSnapshot();
    });

    it('should render closed', () => {
        const closedTrigger = renderer.create(createComponent());

        expect(closedTrigger).toMatchSnapshot();
    });

    it('should render open', () => {
        const openTrigger = renderer.create(createComponent({ isOpen: true }));

        expect(openTrigger).toMatchSnapshot();
    });

    it('should render with available props', () => {
        const props = {
            leftContent: <abbr role="presentation">GB</abbr>,
            primaryHeading: 'This is the title',
            secondaryHeading: (
                <div>
                    <span>Nodes!</span>
                    <br />Plain text
                </div>
            ),
            pinnedValue: '00:00',
            action: <button>Action</button>,
            overflow: <button>...</button>
        };

        const trigger = renderer.create(createComponent(props));

        expect(trigger).toMatchSnapshot();
    });

    it('should call onClick handler', () => {
        const qaHook = 'test-id';
        const onClick = jest.fn();
        const trigger = mount(createComponent({ onClick, qaHook }));

        trigger.find(`[data-automationid="${qaHook}"]`).simulate('click');

        expect(onClick).toHaveBeenCalled();
    });

    it('should call onClick handler on keydown for space and enter', () => {
        const qaHook = 'test-id';
        const onClick = jest.fn();
        const trigger = mount(createComponent({ onClick, qaHook }));

        const keyDownNode = trigger.find(`[data-automationid="${qaHook}"]`)

        const keyCodes = [13, 32];
        keyCodes.forEach(keyCode => {
            keyDownNode.simulate('keyDown', { keyCode });
        });

        expect(onClick).toHaveBeenCalledTimes(2);
    });
});
