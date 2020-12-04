import React, { useState, useCallback, useContext, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import AccordionWrapper from './customElements/AccordionWrapper';
import XUIAccordionContext from './XUIAccordionContext';
import AccordionTrigger from './customElements/AccordionTrigger';
import usePrevious from '../helpers/usePrevious';

const XUIAccordionItem = ({
  action,
  leftContent,
  overflow,
  pinnedValue,
  primaryHeading,
  secondaryHeading,
  description,
  children,
  onClick,
  qaHook,
  isOpen: propsIsOpen,
}) => {
  const [id] = useState(uuidv4());
  const {
    setOpenAccordionItem,
    openAccordionItemId,
    emptyStateComponent,
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
            leftContent,
            id,
            overflow,
            pinnedValue,
            primaryHeading,
            secondaryHeading,
            description,
            toggleLabel,
            onItemClick,
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
  /** Left most consumer specified component option, sits to the right of the arrow.
   * Typically an `<XUIAvatar />`, `<XUICheckbox />` or `<XUIRolloverCheckbox />` component. */
  leftContent: PropTypes.node,

  /** Primary heading content. */
  primaryHeading: PropTypes.node,

  /** Secondary heading content. */
  secondaryHeading: PropTypes.node,

  /** Description content. */
  description: PropTypes.node,

  /** Pinned to right side of the accordion item trigger. */
  pinnedValue: PropTypes.node,

  /** Optional actions to be right aligned. Use the `<XUIActions />` component. */
  action: PropTypes.node,

  /** Any component passed as right most content, typically a `<XUIDropdownToggled />` component. */
  overflow: PropTypes.node,

  /** Callback for a accordion item toggle */
  onClick: PropTypes.func,

  /** Whether this accordion item should open, this should only be true for one item */
  isOpen: PropTypes.bool,

  children: PropTypes.node,

  qaHook: PropTypes.string,
};

export default XUIAccordionItem;
