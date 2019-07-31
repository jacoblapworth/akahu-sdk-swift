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
import { commonViewports } from '../../../stories/helpers/viewports';

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
const blockVariations = [];
const realVariations = [];

Object.keys(compositions).forEach(compositionName => {
  [false, true].forEach(hasAutoSpaceAround => {
    // outer space switch
    if (compositionName === 'detail') {
      addComposition(compositionName, hasAutoSpaceAround);
      return;
    }
    [false, true].forEach(hasGridGap => {
      // gap switch
      if (/^(split|detailheader)|^detail$/i.test(compositionName)) {
        addComposition(compositionName, hasAutoSpaceAround, hasGridGap);
        return;
      }

      [false, true].forEach(hasAutoColumnWidths => {
        // column width switch
        addComposition(compositionName, hasAutoSpaceAround, hasGridGap, hasAutoColumnWidths);
      });
    });
  });

  // Add variations of sample content
  realVariations.push({
    storyKind: storiesWithVariationsKindName,
    storyTitle: `${compositionName} sample`,
    composition: compositions[compositionName],
    viewports: compViewports,
    useRealAreas: true,
  });
});

const lockableLayouts = ['split', 'masterDetail', 'masterDetailSummary', 'detailSummary'];

lockableLayouts.forEach(compositionName => {
  [false, true].forEach(hasHeader => {
    if (hasHeader) {
      compositionName += 'Header';
    }
    [false, true].forEach(hasGridGap => {
      let titleString = `${compositionName} locked small${hasGridGap ? ' hasGridGap' : ''}`;
      pushBlockVariation({
        storyTitle: titleString,
        composition: compositions[compositionName],
        compositionProps: { retainWidth: 'small', hasGridGap },
        viewports: lockViewports,
      });
      if (/^masterDetailSummary/.test(compositionName)) {
        titleString = `${compositionName} locked medium${hasGridGap ? ' hasGridGap' : ''}`;
        pushBlockVariation({
          storyTitle: titleString,
          composition: compositions[compositionName],
          compositionProps: { retainWidth: 'medium', hasGridGap },
          viewports: lockViewports,
        });
      }
    });
  });
});

function addComposition(compositionName, hasAutoSpaceAround, hasGridGap, hasAutoColumnWidths) {
  const titleString = [
    compositionName,
    hasAutoSpaceAround && 'hasAutoSpaceAround',
    hasGridGap && 'hasGridGap',
    hasAutoColumnWidths && 'hasAutoColumnWidths',
  ]
    .filter(value => Boolean(value))
    .join(' ');
  pushBlockVariation({
    storyTitle: titleString,
    composition: compositions[compositionName],
    compositionProps: { hasAutoSpaceAround, hasGridGap, hasAutoColumnWidths },
  });
  pushBlockVariation({
    storyTitle: `${titleString} isInfinite`,
    composition: compositions[compositionName],
    compositionProps: { hasAutoSpaceAround, hasGridGap, hasAutoColumnWidths, isInfinite: true },
    viewports: biggestViewport,
  });
}

function pushBlockVariation(settings) {
  blockVariations.push({
    storyKind: storiesWithVariationsKindName,
    viewports: compViewports,
    ...settings,
  });
}

module.exports = {
  storiesWithVariationsKindName,
  variations: [...blockVariations, ...realVariations],
};
