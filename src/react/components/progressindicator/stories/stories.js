// Libs
import React, { PureComponent } from 'react';

// Components we need to test with
import XUIProgressLinear from '../XUIProgressLinear';
import XUIProgressCircular from '../XUIProgressCircular';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { COLORS } from '../helpers/constants';
import { variations, storiesWithVariationsKindName } from './variations';
import iconPath from '@xero/xui-icon/icons/suggestion';
import XUIIcon from '../../icon/XUIIcon';
import logReadyState from '../../../stories/helpers/log-ready-state';

const readyEvent = 'xui-progress-ready-event';
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

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);

storiesWithKnobs.add('Playground | Circular', () => {
  const totalColor =
    select('totalColor', colorOptions, defaultColor) == defaultColor
      ? undefined
      : select('totalColor', colorOptions, defaultColor);

  const progressColor =
    select('progressColor', colorOptions, defaultColor) == defaultColor
      ? undefined
      : select('progressColor', colorOptions, defaultColor);

  return (
    <div style={playgroundStyle}>
      <XUIProgressCircular
        id={text('id', 'myCustomCircularId')}
        total={number('total', 10)}
        progress={number('progress', 5)}
        isSegmented={boolean('isSegmented', false)}
        isGrow={boolean('isGrow', false)}
        thickness={number('thickness', 3)}
        hasToolTip={boolean('hasToolTip', false)}
        toolTipMessage={text('toolTipMessage', '')}
        isAlertOnComplete={boolean('isAlertOnComplete', false)}
        isOverflow={boolean('isOverflow', false)}
        isSoftError={boolean('isSoftError', false)}
        isHardError={boolean('isHardError', false)}
        hardErrorAlert={text('hardErrorAlert', '')}
        totalColor={totalColor}
        progressColor={progressColor}
      />
    </div>
  );
});

storiesWithKnobs.add('Playground | Linear', () => {
  const totalColor =
    select('totalColor', colorOptions, defaultColor) == defaultColor
      ? undefined
      : select('totalColor', colorOptions, defaultColor);

  const progressColor =
    select('progressColor', colorOptions, defaultColor) == defaultColor
      ? undefined
      : select('progressColor', colorOptions, defaultColor);

  return (
    <div style={playgroundStyle}>
      <XUIProgressLinear
        id={text('id', 'myCustomLinearId')}
        total={number('total', 10)}
        progress={number('progress', 5)}
        isSegmented={boolean('isSegmented', false)}
        isGrow={boolean('isGrow', false)}
        thickness={number('thickness', 4)}
        hasSegmentDots={boolean('hasSegmentDots', false)}
        hasToolTip={boolean('hasToolTip', false)}
        toolTipMessage={text('toolTipMessage', '')}
        isOverflow={boolean('isOverflow', false)}
        isSoftError={boolean('isSoftError', false)}
        totalColor={totalColor}
        progressColor={progressColor}
      />
    </div>
  );
});

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

class StandardComparison extends PureComponent {
  componentDidMount() {
    logReadyState(readyEvent);
  }

  render() {
    const {
      props: { style, component, children },
    } = this;
    return (
      <div style={style}>
        {component}
        {children}
      </div>
    );
  }
}

const createStandardComparison = (styles, Component, props, componentChildren, children) => (
  <StandardComparison
    style={styles}
    component={<Component {...props}>{componentChildren}</Component>}
  >
    {children}
  </StandardComparison>
);

class ColorComparison extends PureComponent {
  componentDidMount() {
    logReadyState(readyEvent);
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

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

class ToolTipComparison extends PureComponent {
  node = null;

  componentDidMount() {
    setTimeout(() => {
      const { node } = this;
      const wrapper =
        node && node.querySelector('.xui-progress [aria-describedby$="progress--tooltip"]');
      if (wrapper) {
        wrapper.click();
        // eslint-disable-next-line no-console
        logReadyState(readyEvent);
      }
    }, 100);
  }

  render() {
    const {
      props: { style, component },
    } = this;
    return (
      // The Tool Tip is absolutely positioned and can get cropped off in our
      // visual regression captures. This extra padding at the top of the component
      // ensures that the entire "active" Tool Tip gets captured.
      <div style={{ background: 'white', paddingTop: '80px' }}>
        <div ref={node => (this.node = node)} style={style}>
          {component}
        </div>
      </div>
    );
  }
}

const createToolTipComparison = (styles, Component, props) => (
  <ToolTipComparison style={{ ...styles }} component={<Component {...props} />} />
);

variations.forEach(variation => {
  const { storyTitle, storyKind, ...props } = variation; // eslint-disable-line no-unused-vars
  const isLinear = storyTitle.startsWith('linear');
  const isColor = storyTitle.startsWith('color');
  const isTooltip = storyTitle.endsWith('tooltip');
  const isCustomContent = storyTitle.startsWith('circular custom content');
  const isErrorWithIcon = storyTitle.startsWith('circular custom (icon) hard error');
  const isMultiline = storyTitle.startsWith('circular multiline');
  let Comparison;

  if (isColor) {
    Comparison = createColorComparison(props);
  } else if (isTooltip && isLinear) {
    Comparison = createToolTipComparison(linearStyles, XUIProgressLinear, props);
  } else if (isTooltip) {
    Comparison = createToolTipComparison(circularStyles, XUIProgressCircular, props);
  } else if (isLinear) {
    Comparison = createStandardComparison(linearStyles, XUIProgressLinear, props);
  } else if (isCustomContent) {
    const children = (
      <img
        style={{ width: '100%', height: 'auto' }}
        alt="custom indicator fill"
        src="http://via.placeholder.com/350x350"
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
