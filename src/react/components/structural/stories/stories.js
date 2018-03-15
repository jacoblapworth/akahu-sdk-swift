// Libs
import React from 'react';

// Components we need to test with
import XUIRow from '../XUIRow';
import XUIColumn from '../XUIColumn';
import { rowVariants } from '../private/constants';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number, text } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName } from './variations';

const buildColumns = (widths) => {
	const children = [];
	widths.forEach((width, index) => {
		children.push(<XUIColumn key={index} gridColumns={width} className="xui-padding-small" style={{backgroundColor: "RGBA(255,255,255,0.5)"}}>Content of a column with width {width}, here.</XUIColumn>)
	});
	return children;
};

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => {
	const columnCount = number('number of columns', 3);
	const columnWidths = text('list of column widths', '2 8 2');
	function buildColumnsArray() {
		let widthsArr = columnWidths.split(/[,\s]+/);
		if (!widthsArr || !widthsArr.length || widthsArr[0] === "") {
			widthsArr = [];
		}
		if (widthsArr.length == columnCount) {
			return widthsArr;
		} else if (widthsArr.length > columnCount) {
			return widthsArr.slice(0, columnCount);
		} else {
			while (widthsArr.length < columnCount) {
				widthsArr.push("1");
			}
			return widthsArr;
		}
	}
	return (
		<XUIRow variant={select('variant', Object.keys(rowVariants), 'standard')} className="xui-padding-small" style={{backgroundColor: "#028DDE"}}>
			{buildColumns(buildColumnsArray())}
		</XUIRow>
	);
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	const { storyTitle, columnWidths, ...variationMinusStoryDetails } = variation;
	delete variationMinusStoryDetails.storyKind;
	storiesWithVariations.add(storyTitle, () => {
		return (
			<XUIRow {...variationMinusStoryDetails} style={{backgroundColor: "#028DDE"}} className="xui-padding-small">
				{buildColumns(columnWidths)}
			</XUIRow>
		);
	});
});
