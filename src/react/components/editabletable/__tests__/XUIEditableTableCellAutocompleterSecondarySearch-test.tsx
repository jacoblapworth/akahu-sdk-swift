import { fireEvent, render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import React from 'react';

import NOOP from '../../helpers/noop';
import XUIPickitem from '../../picklist/XUIPickitem';
import XUIPicklist from '../../picklist/XUIPicklist';
import XUIEditableTableCellAutocompleterSecondarySearch from '../XUIEditableTableCellAutocompleterSecondarySearch';

expect.extend(toHaveNoViolations);

const createComponent = (props = {}) => (
  <table>
    <tbody>
      <tr>
        <XUIEditableTableCellAutocompleterSecondarySearch
          buttonContent="item 1"
          onSearch={NOOP}
          qaHook="testId"
          {...props}
        >
          <XUIPicklist>
            <XUIPickitem id="1">item 1</XUIPickitem>
            <XUIPickitem id="2">item 2</XUIPickitem>
          </XUIPicklist>
        </XUIEditableTableCellAutocompleterSecondarySearch>
      </tr>
    </tbody>
  </table>
);

describe('<XUIEditableTableCellAutocompleterSecondarySearch />', () => {
  test('renders basic example correctly', () => {
    const { asFragment } = render(createComponent());
    expect(asFragment()).toMatchSnapshot();
  });

  test('should pass accessibility testing', async () => {
    const { container } = render(createComponent());
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('trigger button renders content', () => {
    render(createComponent({ buttonContent: 'An item' }));

    expect(screen.queryByText('An item')).toBeInTheDocument();
  });

  test('trigger button renders placeholder', () => {
    render(createComponent({ buttonContent: undefined, buttonContentPlaceholder: 'Search items' }));

    expect(screen.getByTestId('testId--container').querySelector('button span')).toHaveClass(
      'xui-select--content-placeholder',
    );
  });

  describe('focusing', () => {
    test('Cell control knows when the trigger button is focused', () => {
      const { container } = render(createComponent());

      fireEvent.focus(screen.getByText('item 1'));

      expect(container.querySelector('td')).toHaveClass('xui-editabletablecell-control-is-focused');
    });

    test('Cell control knows when the trigger button is blurred', () => {
      const { container } = render(createComponent());

      fireEvent.focus(screen.getByText('item 1'));
      fireEvent.blur(screen.getByText('item 1'));

      expect(container.querySelector('td')).not.toHaveClass(
        'xui-editabletablecell-control-is-focused',
      );
    });

    test('Cell control knows when the trigger button is disabled', () => {
      const { container } = render(createComponent({ isDisabled: true }));

      expect(container.querySelector('td')).toHaveClass(
        'xui-editabletablecell-control-is-disabled',
      );
    });

    test('Cell control knows when the trigger button is invalid and has a invalidation message', () => {
      const { container } = render(createComponent({ isInvalid: true }));

      expect(container.querySelector('td')).toHaveClass('xui-editabletablecell-control-is-invalid');
    });

    test('Cell control knows when the trigger button has a validation message', () => {
      const expectedMessage = 'Test validation message';

      render(createComponent({ isInvalid: true, validationMessage: expectedMessage }));

      expect(screen.queryByText(expectedMessage)).toBeInTheDocument();
    });
  });

  test('spreads cellProps onto the table cell', () => {
    const { container } = render(createComponent({ cellProps: { width: '100px' } }));

    expect(container.querySelector('td')).toHaveAttribute('width', '100px');
  });

  test('dropdownId is applied', () => {
    render(createComponent({ dropdownId: 'test-dropdown-id' }));

    // Open the dropdown
    fireEvent.click(screen.getByText('item 1'));

    expect(screen.getByTestId('testId--list--layout')).toHaveAttribute('id', 'test-dropdown-id');
  });

  test('triggerClassName is applied', () => {
    render(createComponent({ triggerClassName: 'trigger-class' }));

    expect(screen.getByTestId('testId--container').querySelector('button')).toHaveClass(
      'trigger-class',
    );
  });
});
