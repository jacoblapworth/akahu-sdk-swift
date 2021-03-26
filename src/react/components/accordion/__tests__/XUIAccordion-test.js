import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIAccordion from '../XUIAccordion';
import XUIAccordionItem from '../XUIAccordionItem';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

jest.mock('nanoid');
nanoid.mockImplementation(() => '123');

const qaHook = 'test-id';

describe('<XUIAccordion />', () => {
  it('should render the base component with only required props passed', () => {
    const component = renderer.create(
      <XUIAccordion emptyMessage="Nothing available to show" toggleLabel="Toggle" />,
    );
    expect(component).toMatchSnapshot();
  });

  it('should render the accordion with a custom class name', () => {
    const component = renderer.create(
      <XUIAccordion
        className="testClass"
        emptyMessage="Nothing available to show"
        toggleLabel="Toggle"
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('should render the accordion with a custom qa hook', () => {
    const component = renderer.create(
      <XUIAccordion
        emptyMessage="Nothing available to show"
        qaHook={qaHook}
        toggleLabel="Toggle"
      />,
    );
    expect(component).toMatchSnapshot();
  });

  it('should render a closed accordion item', () => {
    const component = renderer.create(
      <XUIAccordion emptyMessage="Nothing available to show" toggleLabel="Toggle">
        <XUIAccordionItem primaryHeading="John smith">Accountant</XUIAccordionItem>
      </XUIAccordion>,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render an open accordion item', () => {
    const component = renderer.create(
      <XUIAccordion emptyMessage="Nothing available to show" toggleLabel="Toggle">
        <XUIAccordionItem isOpen primaryHeading="John Smith">
          Accountant
        </XUIAccordionItem>
      </XUIAccordion>,
    );
    expect(component).toMatchSnapshot();
  });

  it('should render the default empty state', () => {
    const component = renderer.create(
      <XUIAccordion emptyMessage="Nothing available to show" toggleLabel="Toggle">
        <XUIAccordionItem isOpen />
      </XUIAccordion>,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render a custom empty state message', () => {
    const component = renderer.create(
      <XUIAccordion emptyMessage="Custom empty state message" toggleLabel="Toggle">
        <XUIAccordionItem isOpen />
      </XUIAccordion>,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render a custom empty state component', () => {
    const component = renderer.create(
      <XUIAccordion
        emptyStateComponent={<div>Custom empty state component</div>}
        toggleLabel="Toggle"
      >
        <XUIAccordionItem isOpen />
      </XUIAccordion>,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render only one item open by default', () => {
    // Multiple XUIAccordionItems can't have the same id because it will render all of them as open.
    nanoid.mockReturnValue('abc').mockReturnValueOnce('001').mockReturnValueOnce('002');

    const component = mount(
      <XUIAccordion
        emptyStateComponent={<div>Custom empty state component</div>}
        toggleLabel="Toggle"
      >
        <XUIAccordionItem isOpen primaryHeading="One" />
        <XUIAccordionItem isOpen primaryHeading="Two" />
        <XUIAccordionItem primaryHeading="Three" />
      </XUIAccordion>,
    );

    expect(component.find('.xui-accordionwrapper--content-is-open').length).toBe(1);
  });

  it('should pass accessibility testing', async () => {
    const component = mount(
      <XUIAccordion emptyMessage="Nothing available to show" toggleLabel="Toggle" />,
    );
    const results = await axe(component.html());
    expect(results).toHaveNoViolations();
  });
});
