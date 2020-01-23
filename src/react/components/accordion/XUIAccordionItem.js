import React, { useState, useCallback, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
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
  isOpen: propsIsOpen,
}) => {
  const [id] = useState(uuid());
  const {
    setOpenAccordionItem,
    openAccordionItemId,
    qaHook,
    emptyStateComponent,
    toggleLabel,
  } = useContext(XUIAccordionContext);
  const prevPropsIsOpen = usePrevious(propsIsOpen);

  const isItemOpen = propsIsOpen || openAccordionItemId === id;

  useEffect(() => {
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
      qaHook={qaHook && `${qaHook}-wrapper`}
      trigger={
        <AccordionTrigger
          isOpen={isItemOpen}
          qaHook={qaHook && `${qaHook}-trigger`}
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

  /** Any component passed as right most content, typically a `<DropDownToggled />` component. */
  overflow: PropTypes.node,

  /** Callback for a accordion item toggle */
  onClick: PropTypes.func,

  /** Whether this accordion item should open, this should only be true for one item */
  isOpen: PropTypes.bool,

  children: PropTypes.node,
};

export default XUIAccordionItem;
