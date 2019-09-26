import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import listIcon from '@xero/xui-icon/icons/list';
import { ns } from '../helpers/xuiClassNamespace';
import EmptyState from './customElements/EmptyState';
import XUIAccordionContext from './XUIAccordionContext';

export default class XUIAccordion extends PureComponent {
  state = {
    openItem: null,
  };

  /**
   * This function is called when an accordionItem is clicked. It is responsible for closing the currently
   * open accordion item and updating the open accordion item reference in state. If the clicked item is closing,
   * it will set the openItem reference to null, making sure we don't close it if it's clicked again.
   *
   * @param item - The reference to the XUIAccordionItem that has been clicked
   * @param isOpening - Whether or not the XUIAccordionItem is now opening since being clicked
   * */
  updateOpenAccordionItem = (item, isOpening) => {
    const { openItem } = this.state;
    openItem && openItem.closeItem();
    this.setState({
      openItem: isOpening ? item : null,
    });
  };

  render() {
    const {
      qaHook,
      className,
      items,
      createItem,
      emptyStateComponent,
      emptyIcon,
      emptyMessage,
      toggleLabel,
      idKey,
      children,
    } = this.props;
    const shouldCreateItems = !!(items.length && createItem);

    const emptyComponent = emptyStateComponent || (
      <EmptyState emptyIcon={emptyIcon} qaHook={qaHook && `${qaHook}-empty`}>
        {emptyMessage}
      </EmptyState>
    );

    return (
      <div className={cn(`${ns}-accordion`, className)} data-automationid={qaHook}>
        <XUIAccordionContext.Provider
          value={{
            emptyStateComponent: emptyComponent,
            updateOpenAccordionItem: this.updateOpenAccordionItem,
            toggleLabel,
            qaHook,
          }}
        >
          {// TODO: Remove element clone in breaking-changes when `onItemClick` props can be swapped
          // for ID
          shouldCreateItems &&
            items.map(item =>
              React.cloneElement(createItem(item), { onItemClickArgs: item, key: item[idKey] }),
            )}
          {children}
        </XUIAccordionContext.Provider>
      </div>
    );
  }
}

XUIAccordion.propTypes = {
  children: PropTypes.node,
  qaHook: PropTypes.string,

  /** Attached to the outer most element of the accordion component. */
  className: PropTypes.string,

  /** A list of the data to be displayed in the accordion. item in the array is individually
   * passed through to the `createItem` function to create an `<XUIAccordionItem />`. */
  items: PropTypes.array,

  /** String representing the key of the unique identifier for each item in data. */
  idKey: PropTypes.string,

  /** A function that receives an item from the "items" prop and expects a populated
   * `<XUIAccordionItem />` component back. */
  createItem: PropTypes.func,

  /** Accessibility label representing the `<XUIAccordionItem />` toggle functionality. */
  toggleLabel: PropTypes.string,

  /** Customise the default "empty" message. */
  emptyMessage: PropTypes.node,

  /** Customise the default "empty" icon path data. */
  emptyIcon: PropTypes.object,

  /** Override the default "empty" component. */
  emptyStateComponent: PropTypes.element,
};

XUIAccordion.defaultProps = {
  idKey: 'id',
  items: [],
  toggleLabel: 'Toggle',
  emptyMessage: 'Nothing available to show',
  emptyIcon: listIcon,
};
