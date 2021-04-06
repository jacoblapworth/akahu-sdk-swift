import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import noop from '../../helpers/noop';
import AccordionTrigger from '../customElements/AccordionTrigger';

Enzyme.configure({ adapter: new Adapter() });

const qaHook = 'test-id';

const renderTrigger = overrideProps => (
  <AccordionTrigger
    getItemData={noop}
    id="xyz"
    onItemClick={noop}
    onKeyDown={noop}
    primaryHeading="John Smith"
    toggleLabel="Toggle"
    updateOpenAccordionItem={noop}
    updateOpenId={noop}
    {...overrideProps}
  />
);

describe('<XUIAccordion /> | Accordion Trigger', () => {
  it('should render an automation id when passed in the qaHook prop', () => {
    const component = renderer.create(renderTrigger({ qaHook }));

    expect(component).toMatchSnapshot();
  });

  it('should render closed', () => {
    const component = renderer.create(renderTrigger());

    expect(component).toMatchSnapshot();
  });

  it('should render open', () => {
    const component = renderer.create(renderTrigger({ isOpen: true }));

    expect(component).toMatchSnapshot();
  });

  it('should render with available props', () => {
    const leftContent = <abbr role="presentation">GB</abbr>;
    const secondaryHeading = (
      <div>
        <span>Nodes!</span>
        <br />
        Plain text
      </div>
    );

    const description = 'description';
    const action = <button>Action</button>;
    const overflow = <button>...</button>;
    const pinnedValue = '00:00';
    const component = renderer.create(
      renderTrigger({ leftContent, secondaryHeading, action, overflow, pinnedValue, description }),
    );

    expect(component).toMatchSnapshot();
  });

  it('should call onClick handler', () => {
    const onItemClick = jest.fn();
    const component = mount(renderTrigger({ qaHook, onItemClick }));

    component.find(`[data-automationid="${qaHook}"]`).simulate('click');
    expect(onItemClick).toHaveBeenCalled();
  });

  it('should call onClick handler on keydown for space and enter', () => {
    const onItemClick = jest.fn();
    const component = mount(renderTrigger({ qaHook, onItemClick }));
    const keyDownNode = component.find(`[role="button"]`);
    const keys = [' ', 'Enter'];

    keys.forEach(key => keyDownNode.simulate('keyDown', { key }));
    expect(onItemClick).toHaveBeenCalledTimes(2);
  });

  it('should not call onClick handler when clicking on overflow contents', () => {
    const buttonQaHook = `${qaHook}-button`;
    const onClick = jest.fn();
    const overflow = <button data-automationid={buttonQaHook}>...</button>;
    const component = mount(renderTrigger({ overflow, qaHook }));

    component.find(`[data-automationid="${buttonQaHook}"]`).simulate('click');
    expect(onClick).not.toHaveBeenCalled();
  });

  it('should not call onClick handler when clicking on action contents', () => {
    const buttonQaHook = `${qaHook}-button`;
    const onClick = jest.fn();
    const action = <button data-automationid={buttonQaHook}>...</button>;
    const component = mount(renderTrigger({ qaHook, action }));

    component.find(`[data-automationid="${buttonQaHook}"]`).simulate('click');
    expect(onClick).not.toHaveBeenCalled();
  });
});
