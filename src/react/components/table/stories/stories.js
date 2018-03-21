// Libs
import React from 'react';
import PropTypes from 'prop-types';

// Components we need to test with
import Table from '../XUITable';
import Column from '../XUITableColumn';
import Cell from '../XUITableCell';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';
import Pickitem from '../../picklist/Pickitem';
import XUITag from '../../tag/XUITag';
import noop from '../../helpers/noop';

const tableStyles = {
	background: 'white',
	marginBottom: '20px',
	maxWidth: '500px',
	padding: '20px',
	width: '100%',
};

const appendageStyles = {
	background: 'skyblue',
	color: 'white',
	fontWeight: 'bold',
	padding: '20px',
};

const customStyles = (`

.xui-table-visualTesting-tableWrapper {
	border: 10px solid skyblue !important;
	border-radius: 10px !important;
}

.xui-table-visualTesting-cell {
	background: skyblue !important;
	color: white !important;
	font-weight: bold !important;
}

`);

const createOverflowMenu = () => ([
	<Pickitem
		key="0"
		id="0"
		onClick={noop}>
		Menu Option
	</Pickitem>
]);

const Appendage = ({ children }) => (
	<div style={appendageStyles}>{children}</div>
);

Appendage.propTypes = { children: PropTypes.node }

const createCustomStyles = () => {
	const node = document.createElement('style');

	node.innerHTML = customStyles;
	document.head.appendChild(node);
};

const createTags = (total) => new Array(total).fill(0).map((_, index) => (
	<XUITag
		key={index}
		className="xui-margin-right-xsmall"
		variant="positive">
		{`tag ${index + 1}`}
	</XUITag>
));

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);

storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
	const data = {
		0: {},
		1: {},
		2: {}
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
		onRowClick: (({ _id }) => () => alert(`Click row ${_id}`))
	};

	const onCellClick = boolean('onCellClick', false);
	const hasWrapping = boolean('hasWrapping', false);
	const cellProps = {
		onCellClick: onCellClick && (({ _id }) => () => alert(`Click cell in row ${_id}`)),
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
				data={data}
				className={text('className', '')}
				isResponsive={boolean('isResponsive', false)}
				isTruncated={boolean('isTruncated', false)}
				isLoading={boolean('isLoading', false)}
				header={prependHeader && <Appendage>Header</Appendage>}
				footer={appendFooter && <Appendage>Footer</Appendage>}>

				<Column
					head={<Cell sortKey={activeSortKey && 'header-1'}>Header 1</Cell>}
					body={data => <Cell {...cellProps} >Body Cell Data {data._id}</Cell>}
				/>

				<Column
					head={<Cell sortKey={activeSortKey && 'header-2'}>Header 2</Cell>}
					body={data => <Cell {...cellProps} >Body Cell Data {data._id}</Cell>}
				/>

				<Column
					head={<Cell sortKey={activeSortKey && 'header-3'}>Header 3</Cell>}
					body={data => <Cell {...cellProps} >Super looooooooonooooooooooog text {data._id}</Cell>}
				/>

				<Column
					head={<Cell sortKey={activeSortKey && 'header-4'}>Header 4</Cell>}
					body={data => <Cell {...cellProps} >Body Cell Data {data._id}</Cell>}
				/>

				<Column
					head={<Cell sortKey={activeSortKey && 'header-5'}>Header 5</Cell>}
					body={data => <Cell {...cellProps} >Body Cell Data {data._id}</Cell>}
				/>

			</Table>
		</div>
	);
});

/* eslint-disable react/prop-types */
const TestScaffold = ({
	columns,
	removeHeader,
	hasHeaderClassName,
	styleOverrides,
	tableProps
}, tableIndex) => (

		<div
			key={tableIndex}
			className="xui-loader-static"
			style={{ ...tableStyles, ...styleOverrides }}>

			<Table
				{...tableProps}
				emptyStateComponent={tableProps.emptyStateComponent && <Appendage>Custom Empty State</Appendage>}
				createOverflowMenu={tableProps.hasOverflowMenu && createOverflowMenu}
				header={tableProps.header && <Appendage>Header</Appendage>}
				footer={tableProps.footer && <Appendage>Footer</Appendage>}>

				{new Array(columns).fill(0).map((_, columnIndex) => (

					<Column
						key={columnIndex}
						head={!removeHeader && (
							<Cell
								className={hasHeaderClassName && 'xui-table-visualTesting-cell'}
								sortKey={tableProps.activeSortKey && !columnIndex && 'content'}>
								Header {columnIndex + 1}
							</Cell>
						)}
						body={({ content, tags, className, hasWrapping }) => (
							<Cell
								className={className}
								hasWrapping={hasWrapping}>
								{content || (tags && createTags(tags.length)) || `Cell ${columnIndex + 1}`}
							</Cell>
						)}
					/>

				))}

			</Table>
		</div>

	);
/* eslint-enable react/prop-types */

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

storiesWithVariations.addDecorator(centered);
variations.forEach(variation => {
	const { storyTitle, storyKind, examples } = variation; // eslint-disable-line no-unused-vars
	const Comparison = examples.map(TestScaffold);

	createCustomStyles();
	storiesWithVariations.add(storyTitle, () => <div>{Comparison}</div>);
});

export default TestScaffold;