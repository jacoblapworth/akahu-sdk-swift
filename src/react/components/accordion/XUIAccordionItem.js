import React, { useState, useCallback, useContext, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import AccordionWrapper from './customElements/AccordionWrapper';
import XUIAccordionContext from './XUIAccordionContext';
import AccordionTrigger from './customElements/AccordionTrigger';
import usePrevious from '../helpers/usePrevious';

const XUIAccordionItem = ({
  action,
  children,
  description,
  isOpen: propsIsOpen,
  leftContent,
  onClick,
  overflow,
  pinnedValue,
  primaryHeading,
  qaHook,
  secondaryHeading,
}) => {
  const [id] = useState(nanoid(10));
  const {
    emptyStateComponent,
    openAccordionItemId,
    setOpenAccordionItem,
    toggleLabel,
  } = useContext(XUIAccordionContext);
  const prevPropsIsOpen = usePrevious(propsIsOpen);

  // An `openAccordionItemId` needs to be provided when `propsIsOpen` is `true` so that the item can be closed.
  const isItemOpen =
    (propsIsOpen && openAccordionItemId !== null && openAccordionItemId === id) ||
    openAccordionItemId === id;

  useLayoutEffect(() => {
    if (propsIsOpen && !prevPropsIsOpen) {
      setOpenAccordionItem(id);
    }
  }, [propsIsOpen, prevPropsIsOpen, setOpenAccordionItem, id]);

  const onItemClick = useCallback(
    event => {
      if (event.defaultPrevented) {
        return;
      }
      setOpenAccordionItem(id);

      if (onClick) {
        onClick();
      }
    },
    [setOpenAccordionItem, onClick, id],
  );

  return (
    <AccordionWrapper
      _wrapperId={id}
      isOpen={isItemOpen}
      qaHook={qaHook}
      trigger={
        <AccordionTrigger
          isOpen={isItemOpen}
          qaHook={qaHook && `${qaHook}--trigger`}
          {...{
            action,
            description,
            id,
            leftContent,
            onItemClick,
            overflow,
            pinnedValue,
            primaryHeading,
            secondaryHeading,
            toggleLabel,
          }}
        />
      }
    >
      {isItemOpen && (children || emptyStateComponent)}
    </AccordionWrapper>
  );
};

/* eslint-disable react/no-unused-prop-types */
XUIAccordionItem.propTypes = {
  /** Optional actions to be right aligned. Use the `<XUIActions />` component. */
  action: PropTypes.node,

  children: PropTypes.node,

  /** Description content. */
  description: PropTypes.node,

  /** Whether this accordion item should open, this should only be true for one item */
  isOpen: PropTypes.bool,

  /** Left most consumer specified component option, sits to the right of the arrow.
   * Typically an `<XUIAvatar />`, `<XUICheckbox />` or `<XUIRolloverCheckbox />` component. */
  leftContent: PropTypes.node,

  /** Callback for a accordion item toggle */
  onClick: PropTypes.func,

  /** Any component passed as right most content, typically a `<XUIDropdownToggled />` component. */
  overflow: PropTypes.node,

  /** Pinned to right side of the accordion item trigger. */
  pinnedValue: PropTypes.node,

  /** Primary heading content. */
  primaryHeading: PropTypes.node,

  qaHook: PropTypes.string,

  /** Secondary heading content. */
  secondaryHeading: PropTypes.node,
};

export default XUIAccordionItem;
