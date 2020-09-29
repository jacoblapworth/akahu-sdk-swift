// Libs
import React, { Fragment } from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// import { addReadme } from 'storybook-readme';
// import readme from './README.md';

// Components we need to test with
import XUICompositionSplitHeader from '../XUICompositionSplitHeader';
import XUICompositionSplit from '../XUICompositionSplit';
import XUICompositionDetailHeader from '../XUICompositionDetailHeader';
import XUICompositionDetail from '../XUICompositionDetail';
import XUICompositionDetailSummaryHeader from '../XUICompositionDetailSummaryHeader';
import XUICompositionDetailSummary from '../XUICompositionDetailSummary';
import XUICompositionMasterDetailSummaryHeader from '../XUICompositionMasterDetailSummaryHeader';
import XUICompositionMasterDetailSummary from '../XUICompositionMasterDetailSummary';
import XUICompositionMasterDetailHeader from '../XUICompositionMasterDetailHeader';
import XUICompositionMasterDetail from '../XUICompositionMasterDetail';

import { variations, storiesWithVariationsKindName } from './variations';

import XUIPanel from '../../panel/XUIPanel';
import XUIPicklist from '../../picklist/Picklist';
import XUIPickItem from '../../picklist/Pickitem';
import StatefulPicklist from '../../picklist/StatefulPicklist';

// Custom Components
import CustomContentBlock from './content-block';
import CustomHeader from './header';
import CustomSummary from './summary';
import CustomForm from './form';
import XUIButton from '../../button/XUIButton';

const onSelectItem = itemNumber => console.log(`selected ${itemNumber}`);

const realHeader = <CustomHeader />;

const realMaster = (style = {}, navigation = []) => (
  <XUIPanel style={style}>
    <StatefulPicklist secondaryProps={{ role: null }}>
      <XUIPicklist>
        {navigation.map(item => (
          <XUIPickItem id={item} key={item} onSelect={onSelectItem.bind(this, item)}>
            Navigation item {item}
          </XUIPickItem>
        ))}
      </XUIPicklist>
    </StatefulPicklist>
  </XUIPanel>
);

const realSummary = (style = {}) => <CustomSummary style={style} />;
const realDetail = (showMediumDownButton, navigation) => (
  <CustomContentBlock
    dropdownOptions={navigation}
    onSelectItem={onSelectItem}
    showMediumDownButton={showMediumDownButton}
  />
);

const realPrimary = (
  <XUIPanel className="xui-u-flex xui-u-flex-align-center xui-u-flex-justify-center xui-padding-5xlarge">
    <XUIButton>Upload an image</XUIButton>
  </XUIPanel>
);

const realAreas = {
  master: realMaster(),
  summary: realSummary(),
  detail: realDetail(),
  header: realHeader,
  primary: realPrimary,
  secondary: realDetail,
};

const blockAreas = {
  master: ({ width, minWidth } = { width: '100%', minWidth: undefined }) => (
    <div style={{ background: '#50DCAA', height: '100px', width, minWidth }} />
  ),
  summary: ({ width, minWidth } = { width: '100%', minWidth: undefined }) => (
    <div style={{ background: '#FA8200', height: '100px', width, minWidth }} />
  ),
  detail: <div style={{ background: '#0078C8', height: '100px' }} />,
  header: <div style={{ background: '#B446C8', height: '60px' }} />,
  primary: <div style={{ background: '#ff6496', height: '100px' }} />,
  secondary: <div style={{ background: '#0078C8', height: '100px' }} />,
};

const storiesWithKnobs = storiesOf('Compositions', module);

// TODO: storybook-readme is commented out until the package fixes issues with IE11.
// test.addDecorator(addReadme);
// test.addParameters({
// 	readme: {
// 		sidebar: readme
// 	}
// });
storiesWithKnobs.add('Master detail summary', () => {
  const Tag = boolean('Include content header', false, '1')
    ? XUICompositionMasterDetailSummaryHeader
    : XUICompositionMasterDetailSummary;
  const standardWidths = boolean('Apply standard widths to columns', true, '1');

  const widthLeftColumn =
    !standardWidths &&
    select(
      'Pick a left column width',
      {
        None: null,
        '100px': '100px',
        '250px': '250px',
        '400px': '400px',
      },
      '250px',
      '1',
    );

  const widthRightColumn =
    !standardWidths &&
    select(
      'Pick a right column width',
      {
        None: null,
        '100px': '100px',
        '250px': '250px',
        '400px': '400px',
      },
      '250px',
      '1',
    );

  const settings = {
    isReal: boolean('Show example content', false, '1'),
    hasGridGap: boolean('Apply a gap between grid areas', true, '1'),
    hasAutoSpaceAround: boolean(
      'Apply context-dependent space between the grid and the viewport',
      true,
      '1',
    ),
    hasAutoColumnWidths: standardWidths,
    isInfinite: boolean('Expand width infinitely', false, '1'),
    retainWidth: select(
      'Retain a width',
      {
        None: '',
        Medium: 'medium',
        Small: 'small',
      },
      '',
      '1',
    ),
  };

  const areas = settings.isReal ? { ...realAreas } : { ...blockAreas };

  const navigation = [1, 2, 3, 4];

  if (widthLeftColumn != null) {
    areas.master = settings.isReal
      ? realMaster({ minWidth: widthLeftColumn }, navigation)
      : blockAreas.master({ width: widthLeftColumn });
    areas.summary = settings.isReal
      ? realSummary({ minWidth: widthRightColumn, width: '100%' })
      : blockAreas.summary({ minWidth: widthRightColumn, width: '100%' });
  }

  if (settings.isReal) {
    areas.detail = realDetail(true, navigation);
    return (
      <>
        <Tag {...settings} {...areas} />
      </>
    );
  }
  return <Tag {...settings} {...areas} />;
});

storiesWithKnobs.add('Master detail', () => {
  const Tag = boolean('Include content header', false, '1')
    ? XUICompositionMasterDetailHeader
    : XUICompositionMasterDetail;
  const standardWidths = boolean('Apply standard widths to columns', true, '1');

  const widthLeftColumn =
    !standardWidths &&
    select(
      'Pick a left column width',
      {
        None: null,
        '100px': '100px',
        '250px': '250px',
        '400px': '400px',
      },
      '250px',
      '1',
    );

  const widthRightColumn =
    !standardWidths &&
    select(
      'Pick a right column width',
      {
        None: null,
        '100px': '100px',
        '250px': '250px',
        '400px': '400px',
      },
      '250px',
      '1',
    );

  const settings = {
    isReal: boolean('Show example content', false, '1'),
    hasGridGap: boolean('Apply a gap between grid areas', true, '1'),
    hasAutoSpaceAround: boolean(
      'Apply context-dependent space between the grid and the viewport',
      true,
      '1',
    ),
    hasAutoColumnWidths: standardWidths,
    isInfinite: boolean('Expand width infinitely', false, '1'),
    retainWidth: select(
      'Retain a width',
      {
        None: '',
        Small: 'small',
      },
      '',
      '1',
    ),
  };
  const areas = settings.isReal ? { ...realAreas } : { ...blockAreas };

  const navigation = [1, 2, 3, 4];

  if (widthLeftColumn != null) {
    areas.master = settings.isReal
      ? realMaster({ minWidth: widthLeftColumn }, navigation)
      : blockAreas.master({ width: widthLeftColumn });
    areas.summary = settings.isReal
      ? realSummary({ minWidth: widthRightColumn, width: '100%' })
      : blockAreas.summary({ minWidth: widthRightColumn, width: '100%' });
  }

  if (settings.isReal) {
    areas.detail = realDetail(true, navigation);
    return (
      <>
        <Tag {...settings} {...areas} />
      </>
    );
  }
  return <Tag {...settings} {...areas} />;
});

storiesWithKnobs.add('Detail summary', () => {
  const Tag = boolean('Include content header', false, '1')
    ? XUICompositionDetailSummaryHeader
    : XUICompositionDetailSummary;

  const standardWidths = boolean('Apply standard widths to columns', true, '1');

  const settings = {
    isReal: boolean('Show example content', false, '1'),
    hasGridGap: boolean('Apply a gap between grid areas', true, '1'),
    hasAutoSpaceAround: boolean(
      'Apply context-dependent space between the grid and the viewport',
      true,
      '1',
    ),
    hasAutoColumnWidths: standardWidths,
    isInfinite: boolean('Expand width infinitely', false, '1'),
    retainWidth: select(
      'Retain a width',
      {
        None: '',
        Small: 'small',
      },
      '',
      '1',
    ),
  };

  const widthRightColumn =
    !standardWidths &&
    select(
      'Pick a right column width',
      {
        None: null,
        '100px': '100px',
        '250px': '250px',
        '400px': '400px',
      },
      '250px',
      '1',
    );

  const areas = settings.isReal ? { ...realAreas } : { ...blockAreas };

  areas.summary = settings.isReal
    ? realSummary({ minWidth: widthRightColumn, width: '100%' })
    : blockAreas.summary({ minWidth: widthRightColumn, width: '100%' });

  return <Tag {...settings} {...areas} />;
});

storiesWithKnobs.add('Detail', () => {
  const Tag = boolean('Include content header', false, '1')
    ? XUICompositionDetailHeader
    : XUICompositionDetail;
  const settings = {
    isReal: boolean('Show example content', false, '1'),
    hasGridGap: boolean('Apply a gap between grid areas', true, '1'),
    hasAutoSpaceAround: boolean(
      'Apply context-dependent space between the grid and the viewport',
      true,
      '1',
    ),
    isInfinite: boolean('Expand width infinitely', false, '1'),
  };
  const areas = settings.isReal ? realAreas : blockAreas;

  return <Tag {...settings} {...areas} />;
});

storiesWithKnobs.add('Split', () => {
  const Tag = boolean('Include content header', false, '1')
    ? XUICompositionSplitHeader
    : XUICompositionSplit;
  const settings = {
    isReal: boolean('Show example content', false, '1'),
    hasGridGap: boolean('Apply a gap between grid areas', true, '1'),
    hasAutoSpaceAround: boolean(
      'Apply context-dependent space between the grid and the viewport',
      true,
      '1',
    ),
    isInfinite: boolean('Expand width infinitely', false, '1'),
    retainWidth: select(
      'Retain a width',
      {
        None: '',
        Small: 'small',
      },
      '',
      '1',
    ),
  };
  const areas = settings.isReal
    ? {
        header: realHeader,
        primary: realPrimary,
        secondary: <CustomForm />,
      }
    : blockAreas;

  return <Tag {...settings} {...areas} />;
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

variations.forEach(variation => {
  const variationMinusStoryDetails = { ...variation };
  delete variationMinusStoryDetails.useRealAreas;
  const Tag = variationMinusStoryDetails.composition;
  const compositionProps = variationMinusStoryDetails.compositionProps;
  let areasInstance;

  if (variation.useRealAreas) {
    areasInstance = { ...realAreas };
    areasInstance.secondary = <CustomForm />;
    if (/^masterDetail/.test(variation.storyTitle)) {
      const navigation = [1, 2, 3, 4];
      areasInstance.detail = realDetail(true, navigation);
      areasInstance.master = realMaster({}, navigation);
    }
  } else {
    areasInstance = { ...blockAreas };
    areasInstance.summary = compositionProps.hasAutoColumnWidths
      ? blockAreas.summary()
      : blockAreas.summary({ minWidth: '100px', width: '100%' });
    areasInstance.master = compositionProps.hasAutoColumnWidths
      ? blockAreas.master()
      : blockAreas.master({ minWidth: '100px', width: '100%' });
  }

  storiesWithVariations.add(variation.storyTitle, () => (
    <Tag {...compositionProps} {...areasInstance} />
  ));
});
