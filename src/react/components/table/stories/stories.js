// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, text, select } from '@storybook/addon-knobs';

// Components we need to test with
import Table from '../XUITable';
import Column from '../XUITableColumn';
import Cell from '../XUITableCell';
import XUIPickitem from '../../picklist/XUIPickitem';
import XUITag from '../../tag/XUITag';

import logReadyState from '../../../stories/helpers/log-ready-state';
import { variations, storiesWithVariationsKindName } from './variations';
import noop from '../../helpers/noop';

const tableStyles = {
  background: 'white',
  display: 'inline-block',
  verticalAlign: 'top',
  marginBottom: '20px',
  maxWidth: '500px',
  minWidth: '300px',
  padding: '20px',
  width: '50%',
};

const appendageStyles = {
  background: 'darkslategray',
  color: 'white',
  fontWeight: 'bold',
  padding: '20px',
};

const customStyles = `

.xui-table-visualTesting-tableWrapper {
	border: 10px solid darkslategray !important;
	border-radius: 10px !important;
}

.xui-table-visualTesting-cell {
	background: darkslategray !important;
	color: white !important;
	font-weight: bold !important;
}

.xui-table-visualTesting-row {
  font-style: italic;
  font-weight: bold;
}

`;

const createOverflowMenu = () => [
  <XUIPickitem id="0" key="0" onClick={noop}>
    Menu Option
  </XUIPickitem>,
];

const Appendage = ({ children }) => <div style={appendageStyles}>{children}</div>;

const CustomHeader = () => <div style={{ width: '400px', height: '50px' }} />;

const CustomFooter = () => <div style={{ width: '400px', height: '40px' }} />;

Appendage.propTypes = { children: PropTypes.node };

const createCustomStyles = () => {
  const node = document.createElement('style');

  node.innerHTML = customStyles;
  document.head.appendChild(node);
};

const createTags = total =>
  new Array(total).fill(0).map((_, index) => (
    <XUITag className="xui-margin-right-xsmall" key={index}>
      {`tag ${index + 1}`}
    </XUITag>
  ));

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);

storiesWithKnobs.add('Playground', () => {
  const data = {
    0: {},
    1: { rowClassName: text('custom row className for row 1', '') },
    2: {},
  };

  const hasCheckbox = boolean('hasCheckbox', false);
  const hasPinnedFirstColumn = boolean('hasPinnedFirstColumn', false);
  const checkboxProps = hasCheckbox && {
    hasCheckbox,
    hasPinnedFirstColumn,
    checkedIds: { 0: true },
    onCheckAllToggle: noop,
    onCheckOneToggle: noop,
  };

  const hasOverflowMenu = boolean('hasOverflowMenu', false);
  const hasPinnedLastColumn = boolean('hasPinnedLastColumn', false);
  const overflowMenuProps = hasOverflowMenu && {
    hasOverflowMenu,
    hasPinnedLastColumn,
    createOverflowMenu,
  };

  const prependHeader = boolean('prependHeader', false);
  const appendFooter = boolean('appendFooter', false);
  const hasCustomHeader = boolean('hasCustomHeader', false);
  const hasCustomFooter = boolean('hasCustomFooter', false);

  const sortKeyOptions = ['header-1', 'header-2', 'header-3', 'header-4', 'header-5'];
  const activeSortKey = select('activeSortKey', sortKeyOptions, sortKeyOptions[0]);
  const isSortAsc = boolean('isSortAsc', false);
  const sortkeyProps = {
    activeSortKey,
    isSortAsc,
    onSortChange: noop,
  };

  const onRowClick = boolean('onRowClick', false);
  const rowClickProps = onRowClick && {
    onRowClick: (event, { _id }) => alert(`Click row ${_id}`),
    shouldRowClick: () => true,
  };

  const onCellClick = boolean('onCellClick', false);
  const hasWrapping = boolean('hasWrapping', false);
  const cellProps = {
    ...(onCellClick && {
      onCellClick: ({ _id }) => alert(`Click cell in row ${_id}`),
    }),
    hasWrapping,
  };

  const tableProps = {
    ...checkboxProps,
    ...overflowMenuProps,
    ...sortkeyProps,
    ...rowClickProps,
  };

  return (
    <div style={tableStyles}>
      <Table
        {...tableProps}
        caption={text('caption', '')}
        checkAllRowsAriaLabel="Select all rows"
        checkOneRowAriaLabel="Select row"
        className={text('className', '')}
        data={data}
        emptyMessage="Nothing to show here"
        footer={
          (appendFooter && <Appendage>Footer</Appendage>) || (hasCustomFooter && <CustomFooter />)
        }
        header={
          (prependHeader && <Appendage>Header</Appendage>) || (hasCustomHeader && <CustomHeader />)
        }
        isBorderless={boolean('isBorderless', false)}
        isLoading={boolean('isLoading', false)}
        isResponsive={boolean('isResponsive', false)}
        isTruncated={boolean('isTruncated', false)}
        loaderAriaLabel="Loading more data"
        overflowMenuTitle="More row options"
        qaHook={text('qaHook', '')}
      >
        <Column
          body={data => <Cell {...cellProps}>Body Cell Data {data._id}</Cell>}
          head={<Cell sortKey="header-1">Header 1</Cell>}
        />
        <Column
          body={data => <Cell {...cellProps}>Body Cell Data {data._id}</Cell>}
          head={<Cell sortKey="header-2">Header 2</Cell>}
        />
        <Column
          body={data => <Cell {...cellProps}>Super looooooooonooooooooooog text {data._id}</Cell>}
          head={<Cell sortKey="header-3">Header 3</Cell>}
        />
        <Column
          body={data => <Cell {...cellProps}>Body Cell Data {data._id}</Cell>}
          head={<Cell sortKey="header-4">Header 4</Cell>}
        />
        <Column
          body={data => <Cell {...cellProps}>Body Cell Data {data._id}</Cell>}
          head={<Cell sortKey="header-5">Header 5</Cell>}
        />
      </Table>
    </div>
  );
});

/* eslint-disable react/prop-types */
class ScrollResetWrapper extends PureComponent {
  constructor() {
    super();
    this.node = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      const { node } = this;
      const wrapper = node?.current?.querySelector('.xui-table-wrapper');
      if (wrapper) {
        wrapper.scrollLeft = 0;
        logReadyState('xui-table-ready-event');
      }
    }, 100);
  }

  render() {
    const {
      props: { style, children },
    } = this;
    return (
      <div className="xui-loader-static" ref={this.node} style={style}>
        {children}
      </div>
    );
  }
}

const TestScaffold = (
  {
    columns,
    removeHeader,
    hasHeaderClassName,
    styleOverrides,
    cellHeadQaHook,
    cellBodyQaHook,
    tableProps,
  },
  tableIndex,
) => (
  <ScrollResetWrapper key={tableIndex} style={{ ...tableStyles, ...styleOverrides }}>
    <Table
      checkAllRowsAriaLabel="Select all rows"
      checkOneRowAriaLabel="Select row"
      emptyMessage="Nothing to show here"
      loaderAriaLabel="Loading more data"
      overflowMenuTitle="More row options"
      {...tableProps}
      createOverflowMenu={tableProps.hasOverflowMenu && createOverflowMenu}
      emptyStateComponent={
        tableProps.emptyStateComponent && <Appendage>Custom Empty State</Appendage>
      }
      footer={
        (tableProps.footer && <Appendage>Footer</Appendage>) ||
        (tableProps.hasCustomFooter && <CustomFooter />)
      }
      header={
        (tableProps.header && <Appendage>Header</Appendage>) ||
        (tableProps.hasCustomHeader && <CustomHeader />)
      }
    >
      {new Array(columns).fill(0).map((_, columnIndex) => (
        <Column
          body={({ content, tags, className, hasWrapping }) => (
            <Cell className={className} hasWrapping={hasWrapping} qaHook={cellBodyQaHook}>
              {content || (tags && createTags(tags.length)) || `Cell ${columnIndex + 1}`}
            </Cell>
          )}
          head={
            !removeHeader && (
              <Cell
                {...(tableProps.activeSortKey && !columnIndex && { sortKey: 'content' })}
                className={hasHeaderClassName && 'xui-table-visualTesting-cell'}
                qaHook={cellHeadQaHook}
              >
                {`Header ${columnIndex + 1}`}
              </Cell>
            )
          }
          key={columnIndex}
        />
      ))}
    </Table>
  </ScrollResetWrapper>
);
/* eslint-enable react/prop-types */

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

createCustomStyles();
variations.forEach(variation => {
  const { storyTitle, examples } = variation;
  const Comparison = examples.map(TestScaffold);

  storiesWithVariations.add(storyTitle, () => <div>{Comparison}</div>);
});

export default TestScaffold;
