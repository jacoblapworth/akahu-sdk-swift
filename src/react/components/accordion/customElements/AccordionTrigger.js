import React, { useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import arrowPath from '@xero/xui-icon/icons/arrow';
import XUIContentBlockItem from '../../contentblock/XUIContentBlockItem';
import XUIIconButton from '../../button/XUIIconButton';
import { ns } from '../../helpers/xuiClassNamespace';
import { isKeyClick } from '../../helpers/reactKeyHandler';

const AccordionTrigger = ({
  action,
  description,
  id,
  isOpen,
  leftContent,
  onItemClick,
  onKeyDown,
  overflow,
  pinnedValue,
  primaryHeading,
  qaHook,
  secondaryHeading,
  toggleLabel,
}) => {
  const onTriggerKeyDown = useCallback(
    event => {
      if (isKeyClick(event)) {
        onItemClick(event);
        event.preventDefault(); // prevent spacebar scroll.
        if (onKeyDown) {
          onKeyDown();
        }
      }
    },
    [onItemClick, onKeyDown],
  );

  const accordionArrow = (
    <div className={`${ns}-accordiontrigger--arrow`}>
      <XUIIconButton
        ariaLabel={toggleLabel}
        icon={arrowPath}
        rotation={isOpen ? 180 : null}
        tabIndex={-1}
        title={toggleLabel}
      />
    </div>
  );

  return (
    <XUIContentBlockItem
      _ariaControls={`${ns}-accordionwrapper--content-${id}`}
      _ariaExpanded={isOpen}
      _isAccordionTrigger
      isRowLink
      leftContent={
        <>
          {accordionArrow}
          {leftContent}
        </>
      }
      onClick={onItemClick}
      onKeyDown={onTriggerKeyDown}
      qaHook={qaHook}
      {...{
        action,
        description,
        overflow,
        pinnedValue,
        primaryHeading,
        qaHook,
        secondaryHeading,
      }}
    />
  );
};

AccordionTrigger.propTypes = {
  action: PropTypes.node,
  description: PropTypes.node,
  id: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  leftContent: PropTypes.node,
  onItemClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  overflow: PropTypes.node,
  pinnedValue: PropTypes.node,
  primaryHeading: PropTypes.node,
  qaHook: PropTypes.string,
  secondaryHeading: PropTypes.node,
  toggleLabel: PropTypes.string,
};

export default React.memo(AccordionTrigger);
