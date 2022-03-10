import React, { PureComponent } from 'react';
import XLabsEmptyState from '@xero/xlabs-emptystate/';

import { storiesOf } from '@storybook/react';
import { object, boolean, text, select, number, color } from '@storybook/addon-knobs';
import { variations, storiesWithVariationsKindName, storiesWithKnobsKindName } from './variations';
import { flattenedIconList, flattenedIconMap } from '../../helpers/icons';

// Components we need to test with
import XUIBarChart from '../XUIBarChart';
import { CHART_BREAKPOINT, CHART_HEIGHT } from '../helpers/constants';

import logReadyState from '../../../stories/helpers/log-ready-state';

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);

storiesWithKnobs.add('Playground', () => {
  const xAxisTypes = ['abbreviation', 'avatar', 'standard'];
  const hasCustomEmptyState = boolean('Has custom empty state component', false);
  const hasCustomBarToolTip = boolean('Has custom bar tool tip', false);
  const hasPaginationMessage = boolean('Has pagination message', true);
  const hasCustomYAxisFormatting = boolean('Has custom y axis formatting', false);
  const hasOnBarClickHandler = boolean('Has onBarClick handler', false);
  const isBarStacked = boolean('isBarStacked', false);
  const customEmptyState = (
    <XLabsEmptyState icon={flattenedIconMap.chart} message={<p>No income data found</p>} />
  );
  return (
    <div style={{ width: CHART_BREAKPOINT + 1 }}>
      <XUIBarChart
        activeBars={object(
          `activeBars${isBarStacked ? '' : ' '}`, // Force storybook to update the knob with the new stacked data
          isBarStacked ? {} : { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false },
        )}
        barColor={
          isBarStacked ? object('barColor', ['#80C19E', '#EE99A3']) : color('barColor', '#80C19E')
        }
        barColorActive={color('barColorActive', '#EE99A3')}
        barsData={object(
          `barsData${isBarStacked ? '' : ' '}`, // Force storybook to update the knob with the new stacked data
          isBarStacked
            ? [
                { id: 0, x: '2021', y: [3, 7] },
                { id: 1, x: '2020', y: [7, 13] },
                { id: 2, x: '2019', y: [2, 3] },
                { id: 3, x: '2018', y: [3, 7] },
                { id: 4, x: '2017', y: [7, 13] },
                { id: 5, x: '2016', y: [2, 3] },
              ]
            : [
                { id: 0, x: '2021', y: 10 },
                { id: 1, x: '2020', y: 20 },
                { id: 2, x: '2019', y: 5 },
                { id: 3, x: '2018', y: 10 },
                { id: 4, x: '2017', y: 20 },
                { id: 5, x: '2016', y: 5 },
              ],
        )}
        chartDescription={text(
          'chartDescription',
          'Bar chart showing yearly income from the past six years. ' +
            '2021: $10000, ' +
            '2020: $20000,  ' +
            '2019: $5000, ' +
            '2018: $10000, ' +
            '2017: $20000, ' +
            '2016: $5000.',
        )}
        chartHeight={number('chartHeight', CHART_HEIGHT)}
        chartId={text('chartId', 'incomeChart')}
        chartTitle={text('chartTitle', 'Yearly income (in thousands of U.S. dollars)')}
        createBarToolTipMessage={
          hasCustomBarToolTip
            ? bar =>
                bar.stackIndex !== undefined
                  ? `${Math.round(bar.y[bar.stackIndex])}k`
                  : `${Math.round(bar.y)}k`
            : undefined
        }
        createPaginationMessage={
          hasPaginationMessage ? (current, total) => `Page ${current} of ${total}` : undefined
        }
        createYAxisLabelFormat={
          hasCustomYAxisFormatting ? value => `${Math.round(value)}k` : undefined
        }
        emptyMessage={text('emptyMessage', 'There is no data to display')}
        emptyStateComponent={hasCustomEmptyState ? customEmptyState : undefined}
        emptyStateIcon={
          flattenedIconMap[select('emptyStateIcon', ['', ...flattenedIconList], 'chart')]
        }
        hasPagination={boolean('hasPagination', true)}
        isBarStacked={isBarStacked}
        isBarToolTipHidden={boolean('isBarToolTipHidden', false)}
        isChartTitleHidden={boolean('isChartTitleHidden', false)}
        isLoading={boolean('isLoading', false)}
        isXAxisToolTipHidden={boolean('isXAxisToolTipHidden', false)}
        keyLabel={
          isBarStacked
            ? object('keyLabel', ['Restaurant', 'Bar'])
            : text('keyLabel', 'Yearly income')
        }
        keyTitle={text('keyTitle', 'Income graph key')}
        loadingAriaLabel={text('loadingAriaLabel', 'Loading income chart')}
        onBarClick={
          hasOnBarClickHandler
            ? (_, { y, stackIndex }) => {
                alert(`Bar value is: ${stackIndex !== undefined ? y[stackIndex] : y}`);
              }
            : undefined
        }
        paginationLabel={text('paginationLabel', 'Pagination')}
        paginationNextTitle={text('paginationNextTitle', 'Next page')}
        paginationPreviousTitle={text('paginationPreviousTitle', 'Previous page')}
        qaHook={text('qaHook', 'income-chart')}
        xAxisType={select('xAxisType', xAxisTypes, 'standard')}
        xAxisVisibleItems={number('xAxisVisibleItems', 3)}
        yAxisDefaultTopValue={number('yAxisDefaultTopValue', 0)}
      />
    </div>
  );
});

class EventReadyWrapper extends PureComponent {
  constructor() {
    super();
    this.node = null;
    this.rootNode = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      const { rootNode } = this;

      rootNode.current
        ?.querySelectorAll('.xui-chart--content')
        .forEach(contentNode => (contentNode.scrollLeft = 0));
      logReadyState('xui-bar-chart-ready-event');
    }, 100);
  }

  render() {
    return (
      <div
        ref={this.rootNode}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100vw',
          maxWidth: '1000px',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

const TestScaffold = ({ testStyles, emptyStateComponent, ...testProps }, testIndex) => (
  <div
    className="xui-loader-static"
    key={testIndex}
    style={{
      flexGrow: 1,
      padding: '20px',
      ...testStyles,
    }}
  >
    <XUIBarChart
      emptyMessage="There is no data to display"
      keyTitle="Graph key"
      paginationNextTitle="Next page"
      paginationPreviousTitle="Previous page"
      {...testProps}
      emptyStateComponent={emptyStateComponent && <span>{emptyStateComponent}</span>}
    />
  </div>
);

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
const storiesWithResponsiveVariations = storiesOf(storiesWithVariationsKindName, module);
variations.forEach(variation => {
  const { storyTitle, storyKind, examples, customDecorator } = variation;
  const Comparison = examples.map(TestScaffold);
  const targetStories = customDecorator ? storiesWithResponsiveVariations : storiesWithVariations;

  targetStories.add(storyTitle, () => <EventReadyWrapper>{Comparison}</EventReadyWrapper>);
});

export default TestScaffold;
