import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AccordionWrapper from './customElements/AccordionWrapper';
import AccordionTrigger from './customElements/AccordionTrigger';
import XUIAccordionContext from './XUIAccordionContext';

export default class XUIAccordionItem extends PureComponent {
  static contextType = XUIAccordionContext;
  state = {
    isOpen: false,
  };

  onItemClick = () => {
    this.setState(
      prevState => ({
        isOpen: !prevState.isOpen,
      }),
      () => this.context.updateOpenAccordionItem(this, this.state.isOpen),
    );
  };

  closeItem = () => {
    this.setState({
      isOpen: false,
    });
  };

  openItem = () => {
    this.setState({
      isOpen: true,
    });
  };

  render() {
    const {
      action,
      custom,
      leftContent,
      overflow,
      pinnedValue,
      primaryHeading,
      secondaryHeading,
      onItemClickArgs,
      children,
      onItemClick,
    } = this.props;
    const { isOpen } = this.state;
    const { qaHook, emptyStateComponent, toggleLabel } = this.context;

    return (
      <AccordionWrapper
        isOpen={this.state.isOpen}
        qaHook={qaHook && `${qaHook}-wrapper`}
        trigger={
          <AccordionTrigger
            {...{
              isOpen,
              action,
              custom,
              leftContent,
              overflow,
              pinnedValue,
              primaryHeading,
              secondaryHeading,
              toggleLabel,
              onItemClick,
              onItemClickArgs,
            }}
            qaHook={qaHook && `${qaHook}-trigger`}
            updateOpenAccordionItem={this.onItemClick}
          />
        }
      >
        {isOpen && (children || emptyStateComponent)}
      </AccordionWrapper>
    );
  }
}

/* eslint-disable react/no-unused-prop-types */
XUIAccordionItem.propTypes = {
  /** A space to accommodate additional content that is not addressed by the
   * various _"official"_ trigger props. */
  custom: PropTypes.node,

  /** Left most consumer specified component option, sits to the right of the arrow.
   * Typically an `<XUIAvatar />`, `<XUICheckbox />` or `<XUIRolloverCheckbox />` component. */
  leftContent: PropTypes.node,

  /** Primary heading content. */
  primaryHeading: PropTypes.node,

  /** Secondary heading content. */
  secondaryHeading: PropTypes.node,

  /** Pinned to right side of the accordion item trigger. */
  pinnedValue: PropTypes.node,

  /** Optional actions to be right aligned. Use the `<XUIActions />` component. */
  action: PropTypes.node,

  /** Any component passed as right most content, typically a `<DropDownToggled />` component. */
  overflow: PropTypes.node,

  /** Callback for a accordion item toggle. Returns the entire `item` from the `items` array in
   * addition to an `isOpen` boolean representing the items toggled state. */
  onItemClick: PropTypes.func,

  /** An object with props to be passed to the `onItemClick` callback function. */
  onItemClickArgs: PropTypes.object,

  children: PropTypes.node,
};
