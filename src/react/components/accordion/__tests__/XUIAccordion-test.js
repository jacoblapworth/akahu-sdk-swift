import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIAccordion from '../XUIAccordion';
import XUIAccordionItem from '../XUIAccordionItem';

Enzyme.configure({ adapter: new Adapter() });
const qaHook = 'test-id';

const openAccordionItemChild = component => {
  component.root.find(node => node.type === XUIAccordionItem).instance.setState({ isOpen: true });
};

describe('<XUIAccordion />', () => {
  it('should render the base component with only required props passed', () => {
    const component = renderer.create(
      <XUIAccordion toggleLabel="Toggle" emptyMessage="Nothing available to show" />,
    );
    expect(component).toMatchSnapshot();
  });

  it('should render the accordion with a custom class name', () => {
    const component = renderer.create(
      <XUIAccordion
        className="testClass"
        toggleLabel="Toggle"
        emptyMessage="Nothing available to show"
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('should render the accordion with a custom qa hook', () => {
    const component = renderer.create(
      <XUIAccordion
        qaHook={qaHook}
        toggleLabel="Toggle"
        emptyMessage="Nothing available to show"
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('should render a closed accordion item', () => {
    const component = renderer.create(
      <XUIAccordion
        className="testClass"
        items={[{ id: 1, name: 'John Smith', content: 'Accountant' }]}
        createItem={({ name }) => <XUIAccordionItem primaryHeading={name} />}
        toggleLabel="Toggle"
        emptyMessage="Nothing available to show"
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render an open accordion item', () => {
    const component = renderer.create(
      <XUIAccordion
        items={[{ id: 1, name: 'John Smith', content: 'Accountant' }]}
        createItem={({ name, content }) => (
          <XUIAccordionItem primaryHeading={name}>{content}</XUIAccordionItem>
        )}
        toggleLabel="Toggle"
        emptyMessage="Nothing available to show"
      />,
    );
    openAccordionItemChild(component);
    expect(component).toMatchSnapshot();
  });

  it('should render the default empty state', () => {
    const component = renderer.create(
      <XUIAccordion
        items={[{ id: 1, name: 'John Smith' }]}
        createItem={({ content }) => <XUIAccordionItem>{content}</XUIAccordionItem>}
        toggleLabel="Toggle"
        emptyMessage="Nothing available to show"
      />,
    );

    openAccordionItemChild(component);
    expect(component).toMatchSnapshot();
  });

  it('should render a custom empty state message', () => {
    const component = renderer.create(
      <XUIAccordion
        items={[{ id: 1, name: 'John Smith' }]}
        createItem={({ content }) => <XUIAccordionItem>{content}</XUIAccordionItem>}
        emptyMessage="Custom empty state message"
        toggleLabel="Toggle"
      />,
    );

    openAccordionItemChild(component);
    expect(component).toMatchSnapshot();
  });

  it('should render a custom empty state component', () => {
    const component = renderer.create(
      <XUIAccordion
        items={[{ id: 1, name: 'John Smith' }]}
        createItem={({ content }) => <XUIAccordionItem>{content}</XUIAccordionItem>}
        emptyStateComponent={<div>Custom empty state component</div>}
        toggleLabel="Toggle"
      />,
    );

    openAccordionItemChild(component);
    expect(component).toMatchSnapshot();
  });

  it('associate items to a custom key', () => {
    const component = renderer.create(
      <XUIAccordion
        idKey="name"
        items={[{ name: 'John Smith', content: 'Accountant' }]}
        createItem={({ name, content }) => (
          <XUIAccordionItem primaryHeading={name}>{content}</XUIAccordionItem>
        )}
        toggleLabel="Toggle"
        emptyMessage="Nothing available to show"
      />,
    );

    expect(component).toMatchSnapshot();
  });

  it('should call supplied item callback', () => {
    const qaHook = 'test-id';
    const onItemClick = jest.fn();
    const getArgs = () => onItemClick.mock.calls[0][0];
    const component = mount(
      <XUIAccordion
        qaHook={qaHook}
        idKey="name"
        items={[{ name: 'John Smith', content: 'Accountant' }]}
        createItem={({ name, content }) => (
          <XUIAccordionItem primaryHeading={name} onItemClick={onItemClick}>
            {content}
          </XUIAccordionItem>
        )}
        toggleLabel="Toggle"
        emptyMessage="Nothing available to show"
      />,
    );

    component.find(`[data-automationid="${qaHook}-trigger"]`).simulate('click');
    expect(onItemClick).toHaveBeenCalled();
    expect(getArgs()).toMatchObject({ name: 'John Smith', content: 'Accountant', isOpen: true });
  });
});
