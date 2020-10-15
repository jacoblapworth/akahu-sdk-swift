import React, { useCallback, Fragment } from 'react';
import PropTypes from 'prop-types';
import arrowPath from '@xero/xui-icon/icons/arrow';
import XUIContentBlockItem from '../../contentblock/XUIContentBlockItem';
import XUIIconButton from '../../button/XUIIconButton';
import { ns } from '../../helpers/xuiClassNamespace';
import { isKeyClick } from '../../helpers/reactKeyHandler';

const AccordionTrigger = ({
  action,
  qaHook,
  leftContent,
  onItemClick,
  toggleLabel,
  id,
  isOpen,
  primaryHeading,
  secondaryHeading,
  description,
  overflow,
  pinnedValue,
  onKeyDown,
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
        qaHook,
        primaryHeading,
        secondaryHeading,
        description,
        overflow,
        pinnedValue,
      }}
    />
  );
};

AccordionTrigger.propTypes = {
  id: PropTypes.string.isRequired,
  leftContent: PropTypes.node,
  qaHook: PropTypes.string,
  primaryHeading: PropTypes.node,
  secondaryHeading: PropTypes.node,
  description: PropTypes.node,
  pinnedValue: PropTypes.node,
  action: PropTypes.node,
  overflow: PropTypes.node,
  onItemClick: PropTypes.func,
  onKeyDown: PropTypes.func,
  toggleLabel: PropTypes.string,
  isOpen: PropTypes.bool,
};

export default React.memo(AccordionTrigger);
