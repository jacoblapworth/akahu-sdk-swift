import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import XUIAccordionItem from '../XUIAccordionItem';
import XUIAccordionContext from '../XUIAccordionContext';

const emptyStateComponentId = 'empty-state-component';
const qaHook = 'test-hook';
Enzyme.configure({ adapter: new Adapter() });

const emptyStateComponent = <div id={emptyStateComponentId}>Empty!</div>;

const getAccordionItem = children =>
  mount(
    <div>
      <XUIAccordionContext.Provider
        value={{
          emptyStateComponent,
          toggleLabel: 'Toggle',
          updateOpenAccordionItem: () => {},
          qaHook,
        }}
      >
        <XUIAccordionItem>{children}</XUIAccordionItem>
      </XUIAccordionContext.Provider>
    </div>,
  );

describe('<XUIAccordionItem />', () => {
  it('should render the base component with only required props passed', () => {
    const component = renderer.create(
      <XUIAccordionContext.Provider
        value={{
          toggleLabel: 'Toggle',
        }}
      >
        <XUIAccordionItem />
      </XUIAccordionContext.Provider>
    );
    expect(component).toMatchSnapshot();
  });

  it('Should render the empty state component provided by XUIAccordionContext with no children', () => {
    const component = getAccordionItem();
    component.find('[role="button"]').simulate('click');
    expect(component.instance()).toMatchSnapshot();
  });

  it('Should render children instead of empty state component when children are provided', () => {
    const component = getAccordionItem('Children! 👩‍👧‍👧');
    component.find('[role="button"]').simulate('click');
    expect(component.instance()).toMatchSnapshot();
  });
});
