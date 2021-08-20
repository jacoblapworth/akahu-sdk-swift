/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { searchIcon } from '@xero/xui-icon';
import { axe, toHaveNoViolations } from 'jest-axe';
import { nanoid } from 'nanoid';
import * as React from 'react';
import { toMatchDiffSnapshot } from 'snapshot-diff';

import NOOP from '../../helpers/noop';
import { tableName } from '../helpers/constants';
import TestScaffold from '../stories/stories';
import XUITable from '../XUITable';
import XUITableCell from '../XUITableCell';
import XUITableWithData from './XUITableWithData';

jest.mock('nanoid');
(nanoid as any).mockImplementation(() => 'nanoid');
jest.mock('../helpers/canTruncate');

expect.extend(toHaveNoViolations);
expect.extend({ toMatchDiffSnapshot });

describe('XUITable', () => {
  test('snapshot', () => {
    // Arrange
    const { container } = render(
      <XUITableWithData
        className="snapshot"
        createOverflowMenu={() => <div />}
        footer="Custom footer"
        hasCheckbox
        hasOverflowMenu
        header="Custom header"
        isLoading
        loaderAriaLabel="Loading more data"
        onCheckAllToggle={NOOP}
        overflowMenuTitle="More row options"
        qaHook="testId"
      />,
    );

    // Assert
    expect(container).toMatchSnapshot();
  });

  test('rootNode points to the root element', () => {
    // Arrange
    const XUITableRef = React.createRef<XUITable>();
    render(<XUITableWithData qaHook="testId" ref={XUITableRef} />);

    // Assert
    expect(XUITableRef.current?.rootNode.current).toHaveTestId('testId');
  });

  test('tableNode points to the table element', () => {
    // Arrange
    const XUITableRef = React.createRef<XUITable>();
    render(<XUITableWithData qaHook="testId" ref={XUITableRef} />);

    // Assert
    expect(XUITableRef.current?.tableNode.current).toHaveTestId('testId-table');
    expect(XUITableRef.current?.tableNode.current?.tagName).toBe('TABLE');
  });

  test('wrapperNode contains the table element', () => {
    // Arrange
    const XUITableRef = React.createRef<XUITable>();
    render(<XUITableWithData qaHook="testId" ref={XUITableRef} />);

    // Assert
    expect(XUITableRef.current?.wrapperNode.current.querySelector('table')).toHaveTestId(
      'testId-table',
    );
  });

  test('the last cell is right aligned by default', () => {
    // Arrange
    render(<XUITableWithData qaHook="testId" />);

    // Assert
    const headingCells = screen.getByTestId('testId-head').querySelectorAll('th');
    expect(headingCells[headingCells.length - 1]).toHaveClass(
      'xui-readonlytableheadingcell-rightaligned',
    );
  });

  test('isBorderless removes the border', () => {
    // Arrange
    const { rerender } = render(<XUITableWithData qaHook="testId" />);
    expect(screen.getByTestId('testId')).toHaveClass('xui-readonlytable-hasborder');
    rerender(<XUITableWithData isBorderless qaHook="testId" />);

    // Assert
    expect(screen.getByTestId('testId')).not.toHaveClass('xui-readonlytable-hasborder');
  });

  test('isResponsive enables scrolling', () => {
    // Arrange
    const { rerender } = render(<XUITableWithData qaHook="testId" />);
    expect(screen.getByTestId('testId')).toHaveClass('xui-readonlytable-noscroll');
    rerender(<XUITableWithData isResponsive qaHook="testId" />);

    // Assert
    expect(screen.getByTestId('testId')).not.toHaveClass('xui-readonlytable-noscroll');
  });

  test('isTruncated enables truncation', () => {
    // Arrange
    render(<XUITableWithData isTruncated qaHook="testId" />);

    // Assert
    expect(screen.getByTestId('testId-table')).toHaveClass('xui-readonlytable-is-truncated');
  });

  test('hasPinnedFirstColumn pins the first column', () => {
    // Arrange
    render(<XUITableWithData hasPinnedFirstColumn qaHook="testId" />);

    // Assert
    expect(screen.getByTestId('testId-table')).toHaveClass('xui-readonlytable-pinfirst');
  });

  test('hasPinnedLastColumn pins the last column', () => {
    // Arrange
    render(<XUITableWithData hasPinnedLastColumn qaHook="testId" />);

    // Assert
    expect(screen.getByTestId('testId-table')).toHaveClass('xui-readonlytable-pinlast');
  });

  test('End align the first column', () => {
    // Arrange
    render(<XUITableWithData inlineAlignment="end" qaHook="testId" />);

    // Assert
    expect(screen.getByTestId('testId-head').querySelectorAll('th')[0]).toHaveClass(
      'xui-readonlytableheadingcell-rightaligned',
    );
    expect(screen.getByTestId('testId-table').querySelectorAll('td')[0]).toHaveClass(
      'xui-readonlytablecell-rightaligned',
    );
  });

  it('renders a style element, when hiddenColumns are passed', () => {
    render(<XUITableWithData hiddenColumns={[1]} qaHook="testId" />);
    expect(screen.getByTestId('testId').querySelectorAll('style')).toHaveLength(1);
  });

  it('renders rules to hide the proper columns, when hiddenColumns are passed', () => {
    render(<XUITableWithData hiddenColumns={[1, 2]} qaHook="testId" />);
    expect(screen.getByTestId('testId').querySelector('style')).toHaveTextContent(
      `#${tableName}-nanoid .${tableName}row > *:nth-child(2):not(.${tableName}--emptystate-cell) { display: none; }`,
    );
    expect(screen.getByTestId('testId').querySelector('style')).toHaveTextContent(
      `#${tableName}-nanoid .${tableName}row > *:nth-child(3):not(.${tableName}--emptystate-cell) { display: none; }`,
    );
  });

  test('columnWidths applied', () => {
    // Arrange
    render(<XUITableWithData columnWidths={['200px', '100px', 'auto']} qaHook="testId" />);

    // Assert
    expect(
      window.getComputedStyle(screen.getByTestId('testId').querySelectorAll('col')[0]).width,
    ).toBe('200px');
    expect(
      window.getComputedStyle(screen.getByTestId('testId').querySelectorAll('col')[1]).width,
    ).toBe('100px');
    expect(
      window.getComputedStyle(screen.getByTestId('testId').querySelectorAll('col')[2]).width,
    ).toBe('auto');
  });

  test('get minWidth and maxWidth styling', () => {
    // Arrange
    render(<XUITableWithData maxWidth="750px" minWidth="350px" qaHook="testId" />);

    // Assert
    expect(window.getComputedStyle(screen.getByTestId('testId')).maxWidth).toBe('750px');
    expect(window.getComputedStyle(screen.getByTestId('testId')).minWidth).toBe('350px');
  });

  describe('XUITableHead', () => {
    test('the header row is only rendered when every column has a header', () => {
      // Arrange
      const { rerender } = render(<XUITableWithData qaHook="testId" />);
      expect(screen.getByTestId('testId-head')).toBeInTheDocument();
      rerender(<XUITableWithData customHeadProps={[undefined]} qaHook="testId" />);

      // Assert
      expect(screen.queryByTestId('testId-head')).not.toBeInTheDocument();
    });

    test('isTruncated adds truncation styling to head cells', () => {
      // Arrange
      render(<XUITableWithData isTruncated qaHook="testId" />);

      // Assert
      expect(
        window.getComputedStyle(screen.getByTestId('testId-head').querySelector('th')).overflow,
      ).toBe('hidden');
      expect(
        window.getComputedStyle(screen.getByTestId('testId-head').querySelector('th')).textOverflow,
      ).toBe('ellipsis');
      expect(
        window.getComputedStyle(screen.getByTestId('testId-head').querySelector('th')).whiteSpace,
      ).toBe('nowrap');
    });

    describe('sorting by columns', () => {
      test('snapshot', () => {
        // Arrange
        const { container } = render(
          <XUITableWithData
            activeSortKey="fruit"
            customHeadProps={[
              <XUITableCell sortKey="fruit">Fruit</XUITableCell>,
              <XUITableCell sortKey="color">Color</XUITableCell>,
              <XUITableCell sortKey="price">Price / kg</XUITableCell>,
            ]}
            qaHook="testId"
          />,
        );

        // Assert
        expect(container).toMatchSnapshot();
      });

      test('sorting data in ascending order', () => {
        // Arrange
        render(
          <XUITableWithData
            activeSortKey="fruit"
            customHeadProps={[
              <XUITableCell sortKey="fruit">Fruit</XUITableCell>,
              <XUITableCell sortKey="color">Color</XUITableCell>,
              <XUITableCell sortKey="price">Price / kg</XUITableCell>,
            ]}
            data={{
              row1: { fruit: 'Apple', color: 'Red', price: 2.99 },
              row2: { fruit: 'Banana', color: 'Yellow', price: 2.99 },
            }}
            isSortAsc
            qaHook="testId"
          />,
        );

        // Act
        const rows = screen.getAllByTestId('testId-body-row');
        const appleIndex = rows.findIndex(row => row.outerHTML.includes('Apple'));
        const bananaIndex = rows.findIndex(row => row.outerHTML.includes('Banana'));

        // Assert
        expect(appleIndex).toBeLessThan(bananaIndex);
      });

      test('sorting data in descending order', () => {
        // Arrange
        render(
          <XUITableWithData
            activeSortKey="fruit"
            customHeadProps={[
              <XUITableCell sortKey="fruit">Fruit</XUITableCell>,
              <XUITableCell sortKey="color">Color</XUITableCell>,
              <XUITableCell sortKey="price">Price / kg</XUITableCell>,
            ]}
            data={{
              row1: { fruit: 'Apple', color: 'Red', price: 2.99 },
              row2: { fruit: 'Banana', color: 'Yellow', price: 2.99 },
            }}
            qaHook="testId"
          />,
        );

        // Act
        const rows = screen.getAllByTestId('testId-body-row');
        const appleIndex = rows.findIndex(row => row.outerHTML.includes('Apple'));
        const bananaIndex = rows.findIndex(row => row.outerHTML.includes('Banana'));

        // Assert
        expect(appleIndex).toBeGreaterThan(bananaIndex);
      });

      test('clicking on a heading cell calls onSortChange', () => {
        // Arrange
        const mockOnSortChange = jest.fn();
        render(
          <XUITableWithData
            activeSortKey="fruit"
            customHeadProps={[
              <XUITableCell sortKey="fruit">Fruit</XUITableCell>,
              <XUITableCell sortKey="color">Color</XUITableCell>,
              <XUITableCell sortKey="price">Price / kg</XUITableCell>,
            ]}
            isSortAsc
            onSortChange={mockOnSortChange}
            qaHook="testId"
          />,
        );

        // Act
        userEvent.click(screen.getByText('Color'));

        // Assert
        expect(mockOnSortChange).toBeCalledWith('color');
      });

      test('pressing enter on a heading cell calls onSortChange', () => {
        // Arrange
        const mockOnSortChange = jest.fn();
        render(
          <XUITableWithData
            customHeadProps={[
              <XUITableCell sortKey="fruit">Fruit</XUITableCell>,
              <XUITableCell sortKey="color">Color</XUITableCell>,
              <XUITableCell sortKey="price">Price / kg</XUITableCell>,
            ]}
            isSortAsc
            onSortChange={mockOnSortChange}
          />,
        );

        // Act
        fireEvent.keyDown(screen.getByText('Color'), { key: 'Enter', code: 13 });

        // Assert
        expect(mockOnSortChange).toBeCalledWith('color');
      });

      test('pressing space on a heading cell calls onSortChange', () => {
        // Arrange
        const mockOnSortChange = jest.fn();
        render(
          <XUITableWithData
            customHeadProps={[
              <XUITableCell sortKey="fruit">Fruit</XUITableCell>,
              <XUITableCell sortKey="color">Color</XUITableCell>,
              <XUITableCell sortKey="price">Price / kg</XUITableCell>,
            ]}
            isSortAsc
            onSortChange={mockOnSortChange}
          />,
        );

        // Act
        fireEvent.keyDown(screen.getByText('Color'), { key: ' ', code: 32 });

        // Assert
        expect(mockOnSortChange).toBeCalledWith('color');
      });

      test('pressing tab on a heading cell does not call onSortChange', () => {
        // Arrange
        const mockOnSortChange = jest.fn();
        render(
          <XUITableWithData
            customHeadProps={[
              <XUITableCell sortKey="fruit">Fruit</XUITableCell>,
              <XUITableCell sortKey="color">Color</XUITableCell>,
              <XUITableCell sortKey="price">Price / kg</XUITableCell>,
            ]}
            isSortAsc
            onSortChange={mockOnSortChange}
          />,
        );

        // Act
        fireEvent.keyDown(screen.getByText('Color'), { key: 'Tab', code: 9 });

        // Assert
        expect(mockOnSortChange).toBeCalledTimes(0);
      });
    });

    describe('select all checkbox', () => {
      test('selecting a fraction of the rows will make the checkbox indeterminate', () => {
        // Arrange
        render(
          <XUITableWithData
            checkedIds={{
              row1: true,
            }}
            data={{
              row1: { fruit: 'Apple', color: 'Red', price: 2.99 },
              row2: { fruit: 'Banana', color: 'Yellow', price: 2.99 },
            }}
            hasCheckbox
            onCheckAllToggle={NOOP}
            qaHook="testId"
          />,
        );

        // Assert
        expect(
          (screen.queryByTestId('testId-head-checkbox--input') as HTMLInputElement).indeterminate,
        ).toBeTruthy();
        expect(screen.queryByTestId('testId-head-checkbox--input')).not.toHaveAttribute('checked');
      });

      test('selecting all rows will make the checkbox checked', () => {
        // Arrange
        render(
          <XUITableWithData
            checkedIds={{
              row1: true,
              row2: true,
            }}
            data={{
              row1: { fruit: 'Apple', color: 'Red', price: 2.99 },
              row2: { fruit: 'Banana', color: 'Yellow', price: 2.99 },
            }}
            hasCheckbox
            onCheckAllToggle={NOOP}
            qaHook="testId"
          />,
        );

        // Assert
        expect(screen.queryByTestId('testId-head-checkbox--input')).toHaveAttribute('checked');
      });

      test('checking the checkbox will call onCheckAllToggle', () => {
        // Arrange
        const mockOnCheckAllToggle = jest.fn();
        render(
          <XUITableWithData
            data={{
              row1: { fruit: 'Apple', color: 'Red', price: 2.99 },
              row2: { fruit: 'Banana', color: 'Yellow', price: 2.99 },
            }}
            hasCheckbox
            onCheckAllToggle={mockOnCheckAllToggle}
            qaHook="testId"
          />,
        );

        // Act
        userEvent.click(screen.getByTestId('testId-head-checkbox--input'));

        // Assert
        expect(mockOnCheckAllToggle).toHaveBeenCalled();
      });

      test('if there are no rows the checkbox is disabled', () => {
        // Arrange
        render(<XUITableWithData data={{}} hasCheckbox onCheckAllToggle={NOOP} qaHook="testId" />);

        // Assert
        expect(screen.queryByTestId('testId-head-checkbox--input')).toHaveAttribute('disabled');
      });
    });
  });

  describe('XUITableBody', () => {
    test('isTruncated adds truncation styling to body cells', () => {
      // Arrange
      render(<XUITableWithData isTruncated qaHook="testId" />);

      // Assert
      expect(
        window.getComputedStyle(screen.getByTestId('testId-body-row').querySelector('td')).overflow,
      ).toBe('hidden');
      expect(
        window.getComputedStyle(screen.getByTestId('testId-body-row').querySelector('td'))
          .textOverflow,
      ).toBe('ellipsis');
      expect(
        window.getComputedStyle(screen.getByTestId('testId-body-row').querySelector('td'))
          .whiteSpace,
      ).toBe('nowrap');
    });

    test('hovering over a clickable cell adds the hasprecedence class', () => {
      // Arrange
      render(
        <XUITableWithData
          customBodyProps={[({ fruit }) => <XUITableCell onCellClick={NOOP}>{fruit}</XUITableCell>]}
          qaHook="testId"
        />,
      );

      // Act
      userEvent.hover(screen.getByText('Apple'));

      // Assert
      expect(screen.getByText('Apple')).toHaveClass('xui-readonlytablecell-hasprecedence');
    });

    test('unhovering a clickable cell removes the hasprecedence class', () => {
      // Arrange
      render(
        <XUITableWithData
          customBodyProps={[({ fruit }) => <XUITableCell onCellClick={NOOP}>{fruit}</XUITableCell>]}
          qaHook="testId"
        />,
      );

      // Act
      userEvent.hover(screen.getByText('Apple'));
      userEvent.unhover(screen.getByText('Apple'));

      // Assert
      expect(screen.getByText('Apple')).not.toHaveClass('xui-readonlytablecell-hasprecedence');
    });

    test('cell has id', () => {
      // Arrange
      render(
        <XUITableWithData
          customBodyProps={[
            ({ fruit }) => (
              <XUITableCell id="test-cell-id" qaHook="testId">
                {fruit}
              </XUITableCell>
            ),
          ]}
        />,
      );

      // Assert
      expect(screen.queryByTestId('testId-cell')).toHaveAttribute('id', 'test-cell-id');
    });

    describe('select row checkbox', () => {
      test("checkOneRowAriaLabel is applied to the row's checkbox", () => {
        // Arrange
        render(
          <XUITableWithData checkOneRowAriaLabel="Select test row" hasCheckbox qaHook="testId" />,
        );

        // Assert
        expect(screen.queryByTestId('testId-body-row-checkbox--input')).toHaveAttribute(
          'aria-label',
          'Select test row',
        );
      });

      test('checking the checkbox will call onCheckOneToggle', () => {
        // Arrange
        const mockOnCheckOneToggle = jest.fn();
        render(
          <XUITableWithData hasCheckbox onCheckOneToggle={mockOnCheckOneToggle} qaHook="testId" />,
        );

        // Act
        userEvent.click(screen.getByTestId('testId-body-row-checkbox--input'));

        // Assert
        expect(mockOnCheckOneToggle).toHaveBeenCalled();
      });

      test('checkedRowIds determines which checkboxes are checked', () => {
        // Arrange
        render(
          <XUITableWithData
            checkedIds={{ row2: true }}
            data={{
              row1: { fruit: 'Apple', color: 'Red', price: 2.99 },
              row2: { fruit: 'Banana', color: 'Yellow', price: 2.99 },
            }}
            hasCheckbox
            qaHook="testId"
          />,
        );

        // Assert
        const checkboxes = screen.queryAllByTestId(
          'testId-body-row-checkbox--input',
        ) as Array<HTMLInputElement>;

        expect(checkboxes[0].checked).toBeFalsy();
        expect(checkboxes[1].checked).toBeTruthy();
      });

      test('disabledRowIds disables specific rows', () => {
        // Arrange
        render(
          <XUITableWithData
            data={{
              row1: { fruit: 'Apple', color: 'Red', price: 2.99 },
              row2: { fruit: 'Banana', color: 'Yellow', price: 2.99 },
            }}
            disabledIds={{ row1: true }}
            hasCheckbox
            qaHook="testId"
          />,
        );

        // Assert
        const checkboxes = screen.getAllByTestId('testId-body-row-checkbox--input');
        expect(checkboxes[0]).toHaveAttribute('disabled');
        expect(checkboxes[1]).not.toHaveAttribute('disabled');
      });
    });

    describe('overflow menu', () => {
      test('createOverflowMenu creates the contents of the overflow menu', () => {
        // Arrange
        render(
          <XUITableWithData
            createOverflowMenu={() => <div data-automationid="testOverflowId" />}
            hasOverflowMenu
            qaHook="testId"
          />,
        );

        // Act
        userEvent.click(screen.getByTestId('testId-body-row-overflowmenu'));

        // Assert
        expect(screen.queryByTestId('testOverflowId')).toBeInTheDocument();
      });

      test('createOverflowMenu is called with row data', () => {
        // Arrange
        const mockCreateOverflowMenu = jest.fn();
        render(<XUITableWithData createOverflowMenu={mockCreateOverflowMenu} qaHook="testId" />);

        // Assert
        expect(mockCreateOverflowMenu).toHaveBeenCalledWith({
          _id: 'row1',
          color: 'Red',
          fruit: 'Apple',
          price: 2.99,
        });
      });
    });

    describe('empty states', () => {
      test('emptyMessage is rendered when there are no rows', () => {
        // Arrange
        render(<XUITableWithData data={{}} emptyMessage="test empty message" qaHook="testId" />);

        // Assert
        expect(screen.queryByText('test empty message')).toBeInTheDocument();
      });

      test('emptyStateIcon replaces the default icon when there are no rows', () => {
        // Arrange
        render(<XUITableWithData data={{}} emptyStateIcon={searchIcon} qaHook="testId" />);

        // Assert
        expect(screen.getByTestId('testId-empty')).toMatchSnapshot();
      });

      test('emptyStateComponent replaces the default empty state when there are no rows', () => {
        // Arrange
        render(
          <XUITableWithData
            data={{}}
            emptyMessage="test empty message"
            emptyStateComponent={<div data-automationid="testEmptyStateComponentId" />}
            qaHook="testId"
          />,
        );

        // Assert
        expect(screen.queryByText('test empty message')).not.toBeInTheDocument();
        expect(screen.queryByTestId('testEmptyStateComponentId')).toBeInTheDocument();
      });

      test('does not render the empty state when isLoading is true', () => {
        // Arrange
        render(<XUITableWithData data={{}} isLoading qaHook="testId" />);

        // Assert
        expect(screen.queryByTestId('testId-empty')).not.toBeInTheDocument();
      });
    });

    describe('interactive rows', () => {
      test('rows are only clickable if they meet the requirements of shouldRowClick', () => {
        // Arrange
        const mockOnRowClick = jest.fn();
        render(
          <XUITableWithData
            data={{
              row1: { fruit: 'Apple', color: 'Red', price: 2.99 },
              row2: { fruit: 'Banana', color: 'Yellow', price: 2.99 },
            }}
            onRowClick={mockOnRowClick}
            qaHook="testId"
            shouldRowClick={rowData => rowData._id === 'row1'}
          />,
        );

        // Act
        userEvent.click(screen.getAllByTestId('testId-body-row')[0]);
        userEvent.click(screen.getAllByTestId('testId-body-row')[1]);

        // Assert
        expect(mockOnRowClick).toHaveBeenCalledTimes(1);
      });

      test('clicking a row calls onRowClick with the row data', () => {
        // Arrange
        const mockOnRowClick = jest.fn();
        render(
          <XUITableWithData
            onRowClick={mockOnRowClick}
            qaHook="testId"
            shouldRowClick={() => true}
          />,
        );

        // Act
        userEvent.click(screen.getByTestId('testId-body-row'));

        // Assert
        expect(mockOnRowClick.mock.calls[0][1]).toMatchObject({
          _id: 'row1',
          color: 'Red',
          fruit: 'Apple',
          price: 2.99,
        });
      });

      test('clicking a cell calls onCellClick', () => {
        // Arrange
        const mockOnCellClick = jest.fn();
        render(
          <XUITableWithData
            customBodyProps={[
              ({ fruit }) => <XUITableCell onCellClick={mockOnCellClick}>{fruit}</XUITableCell>,
            ]}
            qaHook="testId"
          />,
        );

        // Act
        userEvent.click(screen.getByText('Apple'));

        // Assert
        expect(mockOnCellClick).toHaveBeenCalled();
      });

      test('pressing enter on a cell calls onCellClick', () => {
        // Arrange
        const mockOnCellClick = jest.fn();
        render(
          <XUITableWithData
            customBodyProps={[
              ({ fruit }) => <XUITableCell onCellClick={mockOnCellClick}>{fruit}</XUITableCell>,
            ]}
            qaHook="testId"
          />,
        );

        // Act
        fireEvent.keyDown(screen.getByText('Apple'), { key: 'Enter' });

        // Assert
        expect(mockOnCellClick).toHaveBeenCalled();
      });

      test('pressing space on a cell calls onCellClick', () => {
        // Arrange
        const mockOnCellClick = jest.fn();
        render(
          <XUITableWithData
            customBodyProps={[
              ({ fruit }) => <XUITableCell onCellClick={mockOnCellClick}>{fruit}</XUITableCell>,
            ]}
            qaHook="testId"
          />,
        );

        // Act
        fireEvent.keyDown(screen.getByText('Apple'), { key: ' ' });

        // Assert
        expect(mockOnCellClick).toHaveBeenCalled();
      });
    });
  });

  test('should pass accessibility testing', async () => {
    const wrapper = render(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore – This component isn't TS and TS is overly aggressive with its inferred type
      // definitions
      <TestScaffold
        cellBodyQaHook="cellBodyQaHook"
        cellHeadQaHook="cellHeadQaHook"
        columns={1}
        tableProps={{
          data: {
            0: { content: 'Apple' },
            1: { content: 'Carrot' },
          },
          qaHook: 'testTableHook',
          header: true,
          footer: true,
          hasCheckbox: true,
          onCheckAllToggle: NOOP,
          onCheckOneToggle: NOOP,
          hasOverflowMenu: true,
          createOverflowMenu: NOOP,
        }}
      />,
    );

    expect(await axe(wrapper.baseElement)).toHaveNoViolations();
  });
});
