import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import listIcon from '@xero/xui-icon/icons/list';
import { ns } from '../helpers/xuiClassNamespace';
import EmptyState from './customElements/EmptyState';
import XUIAccordionContext from './XUIAccordionContext';

const XUIAccordion = ({
  qaHook,
  className,
  emptyStateComponent,
  emptyIcon,
  emptyMessage,
  toggleLabel,
  children,
}) => {
  const [openAccordionItemId, setOpenAccordionItemId] = useState(null);
  const setOpenAccordionItem = useCallback(
    itemId => {
      setOpenAccordionItemId(itemId !== openAccordionItemId ? itemId : null);
    },
    [openAccordionItemId, setOpenAccordionItemId],
  );

  const emptyComponent = emptyStateComponent || (
    <EmptyState emptyIcon={emptyIcon} qaHook={qaHook && `${qaHook}-empty`}>
      {emptyMessage}
    </EmptyState>
  );

  return (
    <div className={cn(`${ns}-accordion`, className)} data-automationid={qaHook}>
      <XUIAccordionContext.Provider
        value={{
          setOpenAccordionItem,
          openAccordionItemId,
          emptyStateComponent: emptyComponent,
          toggleLabel,
          qaHook,
        }}
      >
        {children}
      </XUIAccordionContext.Provider>
    </div>
  );
};

XUIAccordion.propTypes = {
  children: PropTypes.node,
  qaHook: PropTypes.string,

  /** Attached to the outer most element of the accordion component. */
  className: PropTypes.string,

  /**
   * Accessibility label representing the `<XUIAccordionItem />` toggle functionality.
   * <br />
   * Recommended English value: *Toggle*
   */
  toggleLabel: PropTypes.string.isRequired,

  /** Customise the default "empty" icon path data. */
  emptyIcon: PropTypes.object,

  /**
   * The message to show if the accordion is empty.
   * <br />
   * Recommended English value: *Nothing available to show*
   */
  emptyMessage: PropTypes.node,

  /** Override the default "empty" component. */
  emptyStateComponent: PropTypes.element,
};

XUIAccordion.defaultProps = {
  emptyIcon: listIcon,
};

export default XUIAccordion;
