import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIAccordion from '../XUIAccordion';
import XUIAccordionItem from '../XUIAccordionItem';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('uuid/v4', () => jest.fn(() => '123'));

const qaHook = 'test-id';

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
      <XUIAccordion toggleLabel="Toggle" emptyMessage="Nothing available to show">
        <XUIAccordionItem primaryHeading="John smith">Accountant</XUIAccordionItem>
      </XUIAccordion>,
    );

    expect(component).toMatchSnapshot();
  });

  it('should render an open accordion item', () => {
    const component = renderer.create(
      <XUIAccordion toggleLabel="Toggle" emptyMessage="Nothing available to show">
        <XUIAccordionItem isOpen primaryHeading="John Smith">
          Accountant
        </XUIAccordionItem>
      </XUIAccordion>,
    );
    expect(component).toMatchSnapshot();
  });

  it('should render the default empty state', () => {
    const component = renderer.create(
      <XUIAccordion toggleLabel="Toggle" emptyMessage="Nothing available to show">
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
});
