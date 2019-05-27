import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import noop from '../../helpers/noop';
import AccordionTrigger from '../customElements/AccordionTrigger';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIAccordion /> | Accordion Trigger', () => {
  it('should render an automation id when passed in the qaHook prop', () => {
    const component = renderer.create(
      <AccordionTrigger
        toggleLabel="Toggle"
        qaHook="test-qahook"
        primaryHeading="John Smith"
        onItemClick={noop}
        updateOpenId={noop}
        getItemData={noop}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render closed', () => {
    const component = renderer.create(
      <AccordionTrigger
        toggleLabel="Toggle"
        primaryHeading="John Smith"
        onItemClick={noop}
        updateOpenId={noop}
        getItemData={noop}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render open', () => {
    const component = renderer.create(
      <AccordionTrigger
        toggleLabel="Toggle"
        primaryHeading="John Smith"
        isOpen
        onItemClick={noop}
        updateOpenId={noop}
        getItemData={noop}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render with available props', () => {
    const component = renderer.create(
      <AccordionTrigger
        toggleLabel="Toggle"
        primaryHeading="John Smith"
        onItemClick={noop}
        updateOpenId={noop}
        getItemData={noop}
        leftContent={<abbr role="presentation">GB</abbr>}
        secondaryHeading={
          <div>
            <span>Nodes!</span>
            <br />
            Plain text
          </div>
        }
        pinnedValue="00:00"
        action={<button>Action</button>}
        overflow={<button>...</button>}
        custom={<div>Custom content</div>}
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should call onClick handler', () => {
    const qaHook = 'test-id';
    const onClick = jest.fn();
    const component = mount(
      <AccordionTrigger
        toggleLabel="Toggle"
        primaryHeading="John Smith"
        qaHook={qaHook}
        onItemClick={onClick}
        updateOpenId={noop}
        getItemData={noop}
      />,
    );

    component.find(`[data-automationid="${qaHook}"]`).simulate('click');
    expect(onClick).toHaveBeenCalled();
  });

  it('should call onClick handler on keydown for space and enter', () => {
    const qaHook = 'test-id';
    const onClick = jest.fn();
    const component = mount(
      <AccordionTrigger
        toggleLabel="Toggle"
        primaryHeading="John Smith"
        qaHook={qaHook}
        onItemClick={onClick}
        updateOpenId={noop}
        getItemData={noop}
      />,
    );
    const keyDownNode = component.find(`[data-automationid="${qaHook}"]`);
    const keys = [' ', 'Enter'];

    keys.forEach(key => keyDownNode.simulate('keyDown', { key }));
    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('should not call onClick handler when clicking on overflow contents', () => {
    const qaHook = 'test-id';
    const onClick = jest.fn();
    const component = mount(
      <AccordionTrigger
        getItemData={noop}
        onItemClick={onClick}
        overflow={<button data-automationid={qaHook}>...</button>}
        primaryHeading="John Smith"
        toggleLabel="Toggle"
        updateOpenId={noop}
      />,
    );

    component.find(`[data-automationid="${qaHook}"]`).simulate('click');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should not call onClick handler when clicking on action contents', () => {
    const qaHook = 'test-id';
    const onClick = jest.fn();
    const component = mount(
      <AccordionTrigger
        action={<button data-automationid={qaHook}>...</button>}
        getItemData={noop}
        onItemClick={onClick}
        primaryHeading="John Smith"
        toggleLabel="Toggle"
        updateOpenId={noop}
      />,
    );

    component.find(`[data-automationid="${qaHook}"]`).simulate('click');
    expect(onClick).not.toHaveBeenCalled();
  });
});
