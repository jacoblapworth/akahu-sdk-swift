import React from 'react';

import {
	XUICompositionDetail,
	XUICompositionDetailHeader,
	XUICompositionSplit,
	XUICompositionSplitHeader,
	XUICompositionMasterDetail,
	XUICompositionMasterDetailHeader,
	XUICompositionMasterDetailSummary,
	XUICompositionMasterDetailSummaryHeader,
	XUICompositionDetailSummary,
	XUICompositionDetailSummaryHeader,
} from '../../../compositions';
import commonViewports from '../../../stories/helpers/viewports';

const compositions = {
	detail: XUICompositionDetail,
	detailHeader: XUICompositionDetailHeader,
	split: XUICompositionSplit,
	splitHeader: XUICompositionSplitHeader,
	masterDetail: XUICompositionMasterDetail,
	masterDetailHeader: XUICompositionMasterDetailHeader,
	masterDetailSummary: XUICompositionMasterDetailSummary,
	masterDetailSummaryHeader: XUICompositionMasterDetailSummaryHeader,
	detailSummary: XUICompositionDetailSummary,
	detailSummaryHeader: XUICompositionDetailSummaryHeader,
};

// Testing only the viewports we expect to show different behavior for compositions.
const compViewports = commonViewports.slice(1, 6);
const lockViewports = commonViewports.slice(3, 6);
const biggestViewport = commonViewports.slice(6);

const storiesWithVariationsKindName = 'Compositions/Tests';
const variations = [];

Object.keys(compositions).forEach(compositionName => {
	const compositionProps = {};

	for (let i = 0; i < 2; i += 1) { // outer space switch
		compositionProps.hasAutoSpaceAround = !!i;
		if (compositionName !== 'detail') {
			for (let j = 0; j < 2; j += 1) { // gap switch
				compositionProps.hasGridGap = !!j;
				if (!(/^split|detailheader/i).test(compositionName)) {
					for (let k = 0; k < 2; k += 1) { // column width switch
						compositionProps.hasAutoColumnWidths = !!k;
						const titleString = `${compositionName}${i ? ' hasAutoSpaceAround' : ''}${j ? ' hasGridGap' : ''}${k ? ' hasAutoColumnWidths' : ''}`;
						pushVariation({
							storyTitle: titleString,
							composition: compositions[compositionName],
							compositionProps: {...compositionProps},
						});
						compositionProps.isInfinite = true;
						pushVariation({
							storyTitle: `${titleString}${compositionProps.isInfinite && ' isInfinite'}`,
							composition: compositions[compositionName],
							compositionProps: { ...compositionProps },
							viewports: biggestViewport,
						});
						delete compositionProps.isInfinite;
					}
				} else {
					const titleString = `${compositionName}${i ? ' hasAutoSpaceAround' : ''}${j ? ' hasGridGap' : ''}`;
					pushVariation({
						storyTitle: titleString,
						composition: compositions[compositionName],
						compositionProps: {...compositionProps},
					});
					compositionProps.isInfinite = true;
					pushVariation({
						storyTitle: `${titleString}${compositionProps.isInfinite && ' isInfinite'}`,
						composition: compositions[compositionName],
						compositionProps: { ...compositionProps },
						viewports: biggestViewport,
					});
					delete compositionProps.isInfinite;
				}
			}
		} else {
			const titleString = `${compositionName}${i ? ' hasAutoSpaceAround' : ''}`;
			pushVariation({
				storyTitle: titleString,
				composition: compositions[compositionName],
				compositionProps: {...compositionProps},
			});
			compositionProps.isInfinite = true;
			pushVariation({
				storyTitle: `${titleString}${compositionProps.isInfinite && ' isInfinite'}`,
				composition: compositions[compositionName],
				compositionProps: { ...compositionProps },
				viewports: biggestViewport,
			});
			delete compositionProps.isInfinite;
		}
	}
});

const lockableLayouts = [
	'split',
	'masterDetail',
	'masterDetailSummary',
	'detailSummary',
];

lockableLayouts.forEach(compositionName => {
	for (let l = 0; l < 2; l += 1) {
		if (l) {
			compositionName += 'Header';
		}
		for (let m = 0; m < 2; m += 1) {
			let titleString = `${compositionName} locked small${m ? ' hasGridGap' : ''}`;
			pushVariation({
				storyTitle: titleString,
				composition: compositions[compositionName],
				compositionProps: { retainWidth: 'small', hasGridGap: !!m },
				viewports: lockViewports,
			});
			if ((/^masterDetailSummary/).test(compositionName)) {
				titleString = `${compositionName} locked medium${m ? ' hasGridGap' : ''}`;
				pushVariation({
					storyTitle: titleString,
					composition: compositions[compositionName],
					compositionProps: { retainWidth: 'medium', hasGridGap: !!m },
					viewports: lockViewports,
				});
			}
		}
	}
});

function pushVariation(settings) {
	variations.push({
		storyKind: storiesWithVariationsKindName,
		viewports: compViewports,
		...settings
	});
};

module.exports = {
	storiesWithVariationsKindName,
	variations
};
