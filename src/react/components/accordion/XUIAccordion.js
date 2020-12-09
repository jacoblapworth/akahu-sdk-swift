import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import listIcon from '@xero/xui-icon/icons/list';
import { ns } from '../helpers/xuiClassNamespace';
import EmptyState from './customElements/EmptyState';
import XUIAccordionContext from './XUIAccordionContext';

const XUIAccordion = ({
  children,
  className,
  emptyIcon,
  emptyMessage,
  emptyStateComponent,
  qaHook,
  toggleLabel,
}) => {
  const [openAccordionItemId, setOpenAccordionItemId] = useState(null);
  const setOpenAccordionItem = useCallback(
    itemId => {
      setOpenAccordionItemId(itemId !== openAccordionItemId ? itemId : null);
    },
    [openAccordionItemId, setOpenAccordionItemId],
  );

  const emptyComponent = emptyStateComponent || (
    <EmptyState emptyIcon={emptyIcon} qaHook={qaHook && `${qaHook}--empty`}>
      {emptyMessage}
    </EmptyState>
  );

  if (children && children.length) {
    let multipleOpenWarning = false;

    children.forEach(child => {
      if (child.props.isOpen) {
        if (multipleOpenWarning) {
          // eslint-disable-next-line no-console
          console.log('You should be using isOpen property maximum on one XUIAccordionItem.');
        }

        multipleOpenWarning = true;
      }
    });
  }

  return (
    <div className={cn(`${ns}-accordion`, className)} data-automationid={qaHook}>
      <XUIAccordionContext.Provider
        value={{
          emptyStateComponent: emptyComponent,
          openAccordionItemId,
          setOpenAccordionItem,
          toggleLabel,
        }}
      >
        {children}
      </XUIAccordionContext.Provider>
    </div>
  );
};

XUIAccordion.propTypes = {
  children: PropTypes.node,

  /** Attached to the outer most element of the accordion component. */
  className: PropTypes.string,

  /** Customise the default "empty" icon path data. */
  emptyIcon: PropTypes.shape({
    height: PropTypes.number,
    path: PropTypes.string,
    width: PropTypes.number,
  }),

  /**
   * The message to show if the accordion is empty.
   * <br />
   * Recommended English value: *Nothing available to show*
   */
  emptyMessage: PropTypes.node,

  /** Override the default "empty" component. */
  emptyStateComponent: PropTypes.element,

  qaHook: PropTypes.string,

  /**
   * Accessibility label representing the `<XUIAccordionItem />` toggle functionality.
   * <br />
   * Recommended English value: *Toggle*
   */
  toggleLabel: PropTypes.string.isRequired,
};

XUIAccordion.defaultProps = {
  emptyIcon: listIcon,
};

export default XUIAccordion;
