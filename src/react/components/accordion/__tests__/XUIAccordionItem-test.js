import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';
import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIAccordionItem from '../XUIAccordionItem';
import XUIAccordionContext from '../XUIAccordionContext';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

jest.mock('nanoid');
nanoid.mockImplementation(() => '123');

const emptyStateComponent = <div>Empty state component</div>;
const qaHook = 'testHook';

// eslint-disable-next-line react/prop-types
const Test = ({ children, isOpen }) => {
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
        <XUIAccordionItem isOpen={isOpen}>{children}</XUIAccordionItem>
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

  it('should pass accessibility testing', async () => {
    const component = getAccordionItem('Children! 👩‍👧‍👧');
    const results = await axe(component.html());
    expect(results).toHaveNoViolations();
  });

  test('should open/close accordion item when isOpen prop is changed', () => {
    // Arrange
    const contentText = 'Content';
    const TestAccordionItem = ({ isOpen }) => (
      <Test isOpen={isOpen}>
        <div>{contentText}</div>
      </Test>
    );
    const initialIsOpen = true;
    const subsequentIsOpen = false;
    const { rerender } = render(<TestAccordionItem isOpen={initialIsOpen} />);

    // Pre-assert
    expect(screen.getByText(contentText));

    // Act
    rerender(<TestAccordionItem isOpen={subsequentIsOpen} />);

    // Post-Assert
    expect(screen.queryByText(contentText)).not.toBeInTheDocument();
  });
});
