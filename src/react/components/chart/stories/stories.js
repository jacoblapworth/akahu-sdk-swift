// Libs
import React, { PureComponent } from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { object, boolean, text, select, number, color } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import customCentered from '../../../../../.storybook/decorators/xuiResponsiveCenter';
import logReadyState from '../../../stories/helpers/log-ready-state';
import { variations, storiesWithVariationsKindName } from './variations';
import { createArray } from '../../progressindicator/helpers/utilities';

// Components we need to test with
import XUIBarChart from '../XUIBarChart';

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);

storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.add('Playground', () => {
  const chartWidth = number('Chart width', 500);
  const chartHeight = number('Chart height', 400);
  const barsTotal = number('Total bars', 3) || undefined;
  const xAxisVisibleItems = number('X-axis visible items', 0) || undefined;
  const yAxisDefaultTopValue = number('Y-axis default top value', 0) || undefined;

  const chartId = text('Chart ID', 'chartPlayground');
  const chartTitle = text('Chart title', 'Chart Playground');
  const chartDescription = text(
    'Chart description',
    'A playground to experiment with the chart component',
  );
  const keyTitle = text('Key title', 'Graph key');
  const paginationNextTitle = text('Pagination next title', '') || undefined;
  const paginationPreviousTitle = text('Pagination next title', '') || undefined;
  const emptyMessage = text('Empty state message', '') || undefined;
  const loadingLabel = text('Loading label', '') || undefined;

  const isChartTitleHidden = boolean('Hide chart title', false);
  const isBarStacked = boolean('Stack bars', false);
  const isBarToolTipHidden = boolean('Hide bar tooltip', false);
  const isXAxisToolTipHidden = boolean('Hide x-axis label tooltip', false);
  const createYAxisLabelFormat =
    boolean('Create custom y-axis format', false) && (y => `${Math.round(y * 100)}k`);
  const hasPagination = boolean('Show pagination', false);
  const createPaginationMessage =
    boolean('Create custom pagination message', false) &&
    ((current, total) => `Page ${current} of ${total}`);
  const emptyStateComponent = boolean('Show empty state custom component', false) ? (
    <div className="xui-text-align-center">
      <h3 className="xui-heading-xlarge">
        Sorry{' '}
        <span aria-label="Confused face" role="img">
          🙁
        </span>
      </h3>
      <p className="xui-heading-small">There is no data to display!</p>
    </div>
  ) : (
    undefined
  );
  const isLoading = boolean('Show loading state', false);
  const hasNegativeValues = boolean('Include bars with negative values', false);

  const xAxisTypes = ['abbreviation', 'avatar', 'standard'];
  const xAxisType = select('X-axis type', xAxisTypes, 'standard', 'xAxisType');
  const barColorActive = color('Active bar color', '', 'activeColor') || undefined;

  const totalStacks = 3;
  let onBarClick;
  let createBarToolTipMessage;
  let activeBars;
  let barColor;
  let keyLabel;

  if (isBarStacked) {
    onBarClick =
      boolean('Create bar click callback', false) &&
      ((event, { y, stackIndex }) => alert(`Clicked stack ${y[stackIndex]}`));
    createBarToolTipMessage =
      boolean('Create bar tooltip message', false) &&
      (({ y, stackIndex }) => `Looking at stack ${y[stackIndex]}`);
    activeBars = object('Active bars', { 0: true, 1: [0] });
    keyLabel = createArray(totalStacks).map((_, index) =>
      text(`Stack #${index + 1} key`, '', `stackKey${index + 1}`),
    );
    barColor = createArray(totalStacks).map((_, index) =>
      color(`Stack #${index + 1} color`, '', `stackColor${index + 1}`),
    );
  } else {
    onBarClick =
      boolean('Create bar click callback', false) && ((event, { y }) => alert(`Clicked bar ${y}`));
    createBarToolTipMessage =
      boolean('Create bar tooltip message', false) && (({ y }) => `Looking at bar ${y}`);
    activeBars = object('Active bars', { 0: true });
    barColor = color('Bar color', '', 'barColor');
    keyLabel = text('Bar key', '');
  }
  const multiplyWithNegativity = () => (hasNegativeValues && Math.round(Math.random()) ? -1 : 1);
  const randomise = () => Math.random() * 4 * multiplyWithNegativity();
  const wrapperStyles = { width: `${chartWidth}px` };
  const isLabelAbbreviation = xAxisType === 'abbreviation';
  const barsData = createArray(barsTotal).map((_, id) => {
    const ref = id + 1;
    return {
      id,
      x: isLabelAbbreviation
        ? `${ref} | #${ref} | Num #${ref} | Number #${ref}`
        : `Item Number ${ref}`,
      y: isBarStacked ? createArray(totalStacks).map(randomise) : randomise(),
    };
  });

  return (
    <div style={wrapperStyles}>
      <XUIBarChart
        {...{
          chartId,
          chartTitle,
          isChartTitleHidden,
          chartDescription,
          chartHeight,
          isBarStacked,
          keyTitle,
          keyLabel,
          barsData,
          barColor,
          activeBars,
          isBarToolTipHidden,
          isXAxisToolTipHidden,
          xAxisType,
          xAxisVisibleItems,
          yAxisDefaultTopValue,
          hasPagination,
          paginationNextTitle,
          barColorActive,
          paginationPreviousTitle,
          emptyMessage,
          emptyStateComponent,
          isLoading,
          loadingLabel,
        }}
        // Make sure functions are are delayed correctly (not booleans from knobs).
        createBarToolTipMessage={createBarToolTipMessage || undefined}
        createPaginationMessage={createPaginationMessage || undefined}
        createYAxisLabelFormat={createYAxisLabelFormat || undefined}
        onBarClick={onBarClick || undefined}
      />
    </div>
  );
});

class EventReadyWrapper extends PureComponent {
  constructor() {
    super();
    this.node = null;
  }

  componentDidMount() {
    setTimeout(() => {
      const { rootNode } = this;

      rootNode &&
        rootNode
          .querySelectorAll('.xui-chart--content')
          .forEach(contentNode => (contentNode.scrollLeft = 0));
      logReadyState('xui-bar-chart-ready-event');
    }, 100);
  }

  render() {
    const { children } = this.props;
    return (
      <div
        ref={node => (this.rootNode = node)}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100vw',
          maxWidth: '1000px',
        }}
      >
        {children}
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

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module).addDecorator(
  centered,
);
const storiesWithResponsiveVariations = storiesOf(
  storiesWithVariationsKindName,
  module,
).addDecorator(customCentered);
variations.forEach(variation => {
  const { storyTitle, storyKind, examples, customDecorator } = variation;
  const Comparison = examples.map(TestScaffold);
  const targetStories = customDecorator ? storiesWithResponsiveVariations : storiesWithVariations;

  targetStories.add(storyTitle, () => <EventReadyWrapper>{Comparison}</EventReadyWrapper>);
});

export default TestScaffold;
