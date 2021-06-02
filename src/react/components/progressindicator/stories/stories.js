// Libs
import React from 'react';

// Story book things
import { storiesOf } from '@storybook/react';
import { boolean, number, text, select } from '@storybook/addon-knobs';

import iconPath from '@xero/xui-icon/icons/suggestion';

// Components we need to test with
import XUIProgressLinear from '../XUIProgressLinear';
import XUIProgressCircular from '../XUIProgressCircular';
import XUIIcon from '../../icon/XUIIcon';

import { COLORS } from '../helpers/constants';
import { variations, storiesWithVariationsKindName, storiesWithKnobsKindName } from './variations';

import ToolTipComparison from './components/ToolTipComparison';
import ColorComparison from './components/ColorComparison';
import StandardComparison from './components/StandardComparison';

const defaultColor = 'default';
const colorOptions = [defaultColor, ...COLORS];

const linearStyles = {
  background: 'white',
  height: '100px',
  padding: '20px',
  width: '90vw',
};

const circularStyles = {
  ...linearStyles,
  height: 'auto',
  width: '30vw',
};

const multilineStyles = {
  ...circularStyles,
  display: 'flex',
};

const playgroundStyle = {
  ...linearStyles,
  height: '100%',
  position: 'fixed',
  left: '0',
  width: '100%',
  top: '0',
};

const colorStyle = {
  ...linearStyles,
  height: 'auto',
  padding: '10px',
};

const tinyWidthStyle = {
  ...linearStyles,
  width: 'auto',
};

const storiesWithKnobs = storiesOf(storiesWithKnobsKindName, module);
storiesWithKnobs.add('Playground | Circular', () => {
  const totalColor =
    select('totalColor', colorOptions, defaultColor) === defaultColor
      ? undefined
      : select('totalColor', colorOptions, defaultColor);

  const progressColor =
    select('progressColor', colorOptions, defaultColor) === defaultColor
      ? undefined
      : select('progressColor', colorOptions, defaultColor);

  return (
    <div style={playgroundStyle}>
      <XUIProgressCircular
        hardErrorAlert={text('hardErrorAlert', '')}
        hasToolTip={boolean('hasToolTip', false)}
        id={text('id', 'myCustomCircularId')}
        isAlertOnComplete={boolean('isAlertOnComplete', false)}
        isGrow={boolean('isGrow', false)}
        isHardError={boolean('isHardError', false)}
        isOverflow={boolean('isOverflow', false)}
        isSegmented={boolean('isSegmented', false)}
        isSoftError={boolean('isSoftError', false)}
        progress={number('progress', 5)}
        progressColor={progressColor}
        thickness={number('thickness', 3)}
        toolTipMessage={text('toolTipMessage', '')}
        total={number('total', 10)}
        totalColor={totalColor}
      />
    </div>
  );
});

storiesWithKnobs.add('Playground | Linear', () => {
  const totalColor =
    select('totalColor', colorOptions, defaultColor) === defaultColor
      ? undefined
      : select('totalColor', colorOptions, defaultColor);

  const progressColor =
    select('progressColor', colorOptions, defaultColor) === defaultColor
      ? undefined
      : select('progressColor', colorOptions, defaultColor);

  return (
    <div style={playgroundStyle}>
      <XUIProgressLinear
        hasSegmentDots={boolean('hasSegmentDots', false)}
        hasToolTip={boolean('hasToolTip', false)}
        id={text('id', 'myCustomLinearId')}
        isGrow={boolean('isGrow', false)}
        isOverflow={boolean('isOverflow', false)}
        isSegmented={boolean('isSegmented', false)}
        isSoftError={boolean('isSoftError', false)}
        progress={number('progress', 5)}
        progressColor={progressColor}
        thickness={number('thickness', 4)}
        toolTipMessage={text('toolTipMessage', '')}
        total={number('total', 10)}
        totalColor={totalColor}
      />
    </div>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);

const createStandardComparison = (styles, Component, props, componentChildren, children) => (
  <StandardComparison
    component={<Component {...props}>{componentChildren}</Component>}
    style={styles}
  >
    {children}
  </StandardComparison>
);

const createColorComparison = props => {
  const enrichedProps = COLORS
    // Take the set of "color" keys, and merge them into groups of two (a custom
    // color for the "total" and "progress" tracks).
    .reduce((acc, color, index) => {
      index = Math.floor(index / 2);
      acc[index] = acc[index] || [];
      acc[index] = [...acc[index], color];

      return acc;
    }, [])
    // Spread the color groups into the supplied props to generate a component
    // scaffold for each color combination.
    .map(([totalColor, progressColor], index) => ({
      ...props,
      id: `myCustomProgressId-${index}`,
      totalColor,
      progressColor,
    }));

  // Create a "circular" and "linear" component for each color combination.
  return (
    <ColorComparison>
      {[
        ...enrichedProps.map((props, index) => (
          <div key={`circular-${index}`} style={colorStyle}>
            <XUIProgressCircular {...props} />
          </div>
        )),
        ...enrichedProps.map((props, index) => (
          <div key={`linear-${index}`} style={colorStyle}>
            <XUIProgressLinear {...props} />
          </div>
        )),
      ]}
    </ColorComparison>
  );
};

const createToolTipComparison = (styles, Component, props) => (
  <ToolTipComparison component={<Component {...props} />} style={{ ...styles }} />
);

variations.forEach(variation => {
  const { storyTitle, storyKind, ...props } = variation;
  const isLinear = storyTitle.startsWith('linear');
  const isColor = storyTitle.startsWith('color');
  const isTooltip = storyTitle.endsWith('tooltip');
  const isCustomContent = storyTitle.startsWith('circular custom content');
  const isErrorWithIcon = storyTitle.startsWith('circular custom (icon) hard error');
  const isMultiline = storyTitle.startsWith('circular multiline');
  const isVeryShort = storyTitle.endsWith('very short');
  let Comparison;

  if (isColor) {
    Comparison = createColorComparison(props);
  } else if (isTooltip && isLinear) {
    Comparison = createToolTipComparison(linearStyles, XUIProgressLinear, props);
  } else if (isTooltip) {
    Comparison = createToolTipComparison(circularStyles, XUIProgressCircular, props);
  } else if (isVeryShort && isLinear) {
    Comparison = createStandardComparison(tinyWidthStyle, XUIProgressLinear, props);
  } else if (isLinear) {
    Comparison = createStandardComparison(linearStyles, XUIProgressLinear, props);
  } else if (isCustomContent) {
    const children = (
      <img
        alt="custom indicator fill"
        src="http://via.placeholder.com/350x350"
        style={{ width: '100%', height: 'auto' }}
      />
    );

    Comparison = createStandardComparison(circularStyles, XUIProgressCircular, props, children);
  } else if (isErrorWithIcon) {
    const starIcon = <XUIIcon icon={iconPath} isBoxed />;

    Comparison = createStandardComparison(circularStyles, XUIProgressCircular, {
      hardErrorAlert: starIcon,
      ...props,
    });
  } else if (isMultiline) {
    const multilineText = (
      <div style={{ marginLeft: '10px' }}>
        Line 1
        <br />
        Line 2
      </div>
    );
    Comparison = createStandardComparison(
      multilineStyles,
      XUIProgressCircular,
      props,
      null,
      multilineText,
    );
  } else {
    Comparison = createStandardComparison(circularStyles, XUIProgressCircular, props);
  }

  storiesWithVariations.add(storyTitle, () => Comparison);
});
