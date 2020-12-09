import React, { useState } from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import XUIAccordionItem from '../XUIAccordionItem';
import XUIAccordionContext from '../XUIAccordionContext';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('uuid', () => ({
  v4: jest.fn(() => '123'),
}));

const emptyStateComponent = <div>Empty state component</div>;
const qaHook = 'testHook';

// eslint-disable-next-line react/prop-types
const Test = ({ children }) => {
  const [openItemId, setOpenItemId] = useState(null);
  return (
    <div>
      <XUIAccordionContext.Provider
        value={{
          emptyStateComponent,
          openAccordionItemId: openItemId,
          qaHook,
          setOpenAccordionItem: setOpenItemId,
          toggleLabel: 'Toggle',
        }}
      >
        <XUIAccordionItem>{children}</XUIAccordionItem>
      </XUIAccordionContext.Provider>
    </div>
  );
};

const getAccordionItem = children => mount(<Test>{children}</Test>);

describe('<XUIAccordionItem />', () => {
  it('should render the base component with only required props passed', () => {
    const component = renderer.create(
      <XUIAccordionContext.Provider
        value={{
          toggleLabel: 'Toggle',
        }}
      >
        <XUIAccordionItem />
      </XUIAccordionContext.Provider>,
    );
    expect(component).toMatchSnapshot();
  });

  it('Should render the empty state component provided by XUIAccordionContext with no children', () => {
    const component = getAccordionItem();
    component.find('[role="button"]').simulate('click');
    expect(toJson(component.render())).toMatchSnapshot();
  });

  it('Should render children instead of empty state component when children are provided', () => {
    const component = getAccordionItem('Children! 👩‍👧‍👧');
    component.find('[role="button"]').simulate('click');
    expect(toJson(component.render())).toMatchSnapshot();
  });

  it('renders an automation id when a qaHook is passed', () => {
    const component = renderer.create(
      <XUIAccordionContext.Provider
        value={{
          toggleLabel: 'Toggle',
        }}
      >
        <XUIAccordionItem qaHook={qaHook} />
      </XUIAccordionContext.Provider>,
    );
    expect(component).toMatchSnapshot();
  });
});
