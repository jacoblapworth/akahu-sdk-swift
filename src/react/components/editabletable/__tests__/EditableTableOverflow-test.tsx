import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme, { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';

import NOOP from '../../helpers/noop';
import XUIEditableTableContext from '../contexts/XUIEditableTableContext';
import EditableTableOverflow from '../private/EditableTableOverflow';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

describe('EditableTableOverflow', () => {
  it('renders correctly', () => {
    // Arrange
    const wrapper = mount(<EditableTableOverflow />);

    // Assert
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = mount(<EditableTableOverflow className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('applies the right overflow when the table can be scrolled to the right', () => {
    // Arrange
    const scrollContainerRef = ({
      current: {
        addEventListener: NOOP,
        removeEventListener: NOOP,
        clientWidth: 400,
        scrollLeft: 0,
      },
    } as unknown) as React.RefObject<HTMLDivElement>;
    const tableRef = ({
      current: {
        addEventListener: NOOP,
        removeEventListener: NOOP,
        clientWidth: 600,
        querySelector: NOOP,
      },
    } as unknown) as React.RefObject<HTMLTableElement>;

    const wrapper = mount(
      <XUIEditableTableContext.Provider
        value={{ dragAndDrop: {}, rowOptions: {}, scrollContainerRef, tableRef }}
      >
        <EditableTableOverflow />
      </XUIEditableTableContext.Provider>,
    );

    // Assert
    expect(wrapper.html()).toContain('overflowright');
  });

  it('applies the left overflow when the table can be scrolled to the left', () => {
    // Arrange
    const scrollContainerRef = ({
      current: {
        addEventListener: NOOP,
        removeEventListener: NOOP,
        clientWidth: 400,
        scrollLeft: 1,
      },
    } as unknown) as React.RefObject<HTMLDivElement>;
    const tableRef = ({
      current: {
        addEventListener: NOOP,
        removeEventListener: NOOP,
        clientWidth: 600,
        querySelector: NOOP,
      },
    } as unknown) as React.RefObject<HTMLTableElement>;

    const wrapper = mount(
      <XUIEditableTableContext.Provider
        value={{ dragAndDrop: {}, rowOptions: {}, scrollContainerRef, tableRef }}
      >
        <EditableTableOverflow />
      </XUIEditableTableContext.Provider>,
    );

    // Assert
    expect(wrapper.html()).toContain('overflowleft');
  });

  it('applies the footaction class', () => {
    // Arrange
    const tableRef = ({
      current: {
        querySelector: className => className.includes('editabletablefoot--action'),
      },
    } as unknown) as React.RefObject<HTMLTableElement>;

    const wrapper = mount(
      <XUIEditableTableContext.Provider value={{ dragAndDrop: {}, rowOptions: {}, tableRef }}>
        <EditableTableOverflow />
      </XUIEditableTableContext.Provider>,
    );

    // Assert
    expect(wrapper.html()).toContain('has-footaction');
  });

  it('applies the pinoverflowleft class when the table can be scrolled to the left and has a pinned first column', () => {
    // Arrange
    const currentRef = {
      addEventListener: NOOP,
      removeEventListener: NOOP,
    };
    const scrollContainerRef = ({
      current: {
        ...currentRef,
        clientWidth: 400,
        scrollLeft: 1,
      },
    } as unknown) as React.RefObject<HTMLDivElement>;
    const tableRef = ({
      current: {
        ...currentRef,
        clientWidth: 600,
        querySelector: NOOP,
      },
    } as unknown) as React.RefObject<HTMLTableElement>;

    const wrapper = mount(
      <XUIEditableTableContext.Provider
        value={{ dragAndDrop: {}, rowOptions: {}, scrollContainerRef, tableRef }}
      >
        <EditableTableOverflow hasPinnedFirstColumn />
      </XUIEditableTableContext.Provider>,
    );

    // Assert
    expect(wrapper.html()).toContain('-pinoverflowleft');
  });

  it('applies the pinoverflowright class when the table can be scrolled to the right and has a pinned last column', () => {
    // Arrange
    const currentRef = {
      addEventListener: NOOP,
      removeEventListener: NOOP,
    };
    const scrollContainerRef = ({
      current: {
        ...currentRef,
        clientWidth: 400,
        scrollLeft: 0,
      },
    } as unknown) as React.RefObject<HTMLDivElement>;
    const tableRef = ({
      current: {
        ...currentRef,
        clientWidth: 600,
        querySelector: NOOP,
      },
    } as unknown) as React.RefObject<HTMLTableElement>;

    const wrapper = mount(
      <XUIEditableTableContext.Provider
        value={{ dragAndDrop: {}, rowOptions: {}, scrollContainerRef, tableRef }}
      >
        <EditableTableOverflow hasPinnedLastColumn />
      </XUIEditableTableContext.Provider>,
    );

    // Assert
    expect(wrapper.html()).toContain('-pinoverflowright');
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<EditableTableOverflow />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
