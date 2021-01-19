import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import throttle from 'lodash.throttle';
import '../helpers/xuiGlobalChecks';
import { NAME_SPACE, STACKED, SIDE_BAR, INLINE } from './helpers/constants';
import { enrichStepperProps, enrichTabProps } from './helpers/enrichprops';
import { createAriaTabId } from './helpers/utilities';
import StepperTab from './customElements/StepperTab';
import InlineDummyLayout, { testIsInlineRelevant } from './customElements/InlineDummyLayout';
import SideBarDummyLayout, { testIsSideBarRelevant } from './customElements/SideBarDummyLayout';

const createTabs = (
  { qaHook, tabs, id, ariaPanelId, currentStep, updateCurrentStep, isTruncated },
  overrides,
) =>
  tabs.map((tabProps, index) => {
    const isFirst = index === 0;
    const isLast = index === tabs.length - 1;
    const isActive = currentStep === index;
    const ariaTabId = createAriaTabId(id, index);
    const enrichedProps = enrichTabProps({
      ...tabProps,
      ...overrides,
      updateCurrentStep,
      isActive,
      id: ariaTabId,
      step: index + 1,
    });
    const tabClasses = cn(`${NAME_SPACE}-tab`, {
      [`${NAME_SPACE}-tab-first`]: isFirst,
      [`${NAME_SPACE}-tab-last`]: isLast,
    });

    return (
      <div
        aria-controls={ariaPanelId}
        aria-selected={isActive}
        className={tabClasses}
        data-automationid={qaHook && `${qaHook}-tab-${index}`}
        id={ariaTabId}
        key={ariaTabId}
        role="tab"
        style={{ order: index }}
      >
        <StepperTab index={index} isTruncated={isTruncated} qaHook={qaHook} {...enrichedProps} />
      </div>
    );
  });

class XUIStepper extends Component {
  state = { layout: STACKED };

  rootNode = null;

  throttled = null;

  componentDidUpdate = () => this.setCurrentLayout();

  componentDidMount = () => {
    this.setCurrentLayout();
    this.throttled = throttle(this.setCurrentLayout, 500);
    window.addEventListener('resize', this.throttled);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.throttled);
    this.throttled.cancel();
  };

  setCurrentLayout = () => {
    const { rootNode, props } = this;
    const { layout } = this.state;
    const { lockLayout } = props;
    const setLayout = newLayout => newLayout !== layout && this.setState({ layout: newLayout });

    if (lockLayout && lockLayout !== 'vertical') {
      setLayout(lockLayout);
    } else if (rootNode) {
      const isInline = testIsInlineRelevant(rootNode) && lockLayout !== 'vertical';
      const isSideBar = testIsSideBarRelevant(rootNode);

      if (isInline) {
        setLayout(INLINE);
      } else if (isSideBar) {
        setLayout(SIDE_BAR);
      } else {
        setLayout(STACKED);
      }
    }
  };

  render = () => {
    const { props, state } = this;
    const {
      children,
      tabs,
      id,
      qaHook,
      currentStep,
      updateCurrentStep,
      lockLayout,
      hasStackedButtons,
      gridTemplateRows,
      ariaActiveTabId,
      ariaPanelId,
      wrapperClasses,
      isTruncated,
    } = enrichStepperProps(props, state);

    const tabProps = {
      qaHook,
      tabs,
      id,
      ariaPanelId,
      currentStep,
      updateCurrentStep,
      isTruncated,
    };
    const visibleTabs = createTabs(tabProps);

    // We use the override parameter here to ensure that the dummy UI's do not
    // render progress indicators as this will result in multiple progress indicator
    // instances with the same `id` value (which will blow up the page). The
    // progress indicator does not augment the space taken up by the tab (we fall
    // back to the icon layout that uses the same size) so it will not effect the math.
    const hiddenTabs = createTabs(tabProps, { isHidden: true, isProgress: false });

    return (
      <div className={NAME_SPACE} data-automationid={qaHook} ref={node => (this.rootNode = node)}>
        {!lockLayout && (
          <div aria-hidden="true" className={`${NAME_SPACE}-hidden-content`}>
            {/* Render "dummy" UI scenarios in secret to determine what layout the
						component best conforms to the <XUIStepper /> width if no pre-defined
						layout has been supplied. */}
            <InlineDummyLayout hasStackedButtons={hasStackedButtons} tabs={hiddenTabs} />
            <SideBarDummyLayout gridTemplateRows={gridTemplateRows} tabs={hiddenTabs} />
          </div>
        )}

        <div className={wrapperClasses} role="tablist" style={{ gridTemplateRows }}>
          {visibleTabs}

          <div
            aria-labelledby={ariaActiveTabId}
            className={`${NAME_SPACE}-section`}
            data-automationid={qaHook && `${qaHook}-content`}
            id={ariaPanelId}
            role="tabpanel"
            style={{ order: currentStep }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  };
}

export default XUIStepper;

/* eslint-disable react/no-unused-prop-types */
XUIStepper.propTypes = {
  children: PropTypes.node,

  /** Target a tab by its index in the "tabs" array and set it to its "active" state
   * (index is zero based). */
  currentStep: PropTypes.number.isRequired,

  /** Set the tab buttons to have a "stacked" layout (only applicable in the "inline" layout) */
  hasStackedButtons: PropTypes.bool,

  /** A unique ID that is used to generate Aria references. */
  id: PropTypes.string.isRequired,

  /** Whether step names and description truncate or wrap. Defaults to true. */
  isTruncated: PropTypes.bool,

  /** Lock the Stepper to only use a single layout style (the Stepper will augment its layout
   * automatically by default). Setting `vertical` will render as either a sidebar or stacked
   * depending on the space available. */
  lockLayout: PropTypes.oneOf(['stacked', 'sidebar', 'inline', 'vertical']),

  qaHook: PropTypes.string,

  /** The group of Stepper tabs */
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      /** Set the current Progress Indicator value. */
      currentProgress: PropTypes.number,

      /** Secondary display text. */
      description: PropTypes.node,

      /** `. */
      isComplete: PropTypes.bool,

      /** `. */
      isDisabled: PropTypes.bool,

      /** `. */
      isError: PropTypes.bool,

      /** Render a Progress Indicator. */
      isProgress: PropTypes.bool,

      /** Main display text. */
      name: PropTypes.string.isRequired,

      /** Set the maximum Progress Indicator value. */
      totalProgress: PropTypes.number,
    }),
  ).isRequired,

  /** A callback that receives an "index" value relating to the clicked "currentStep". */
  updateCurrentStep: PropTypes.func,
};

XUIStepper.defaultProps = {
  isTruncated: true,
};
