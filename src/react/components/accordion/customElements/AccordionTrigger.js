import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import arrowPath from '@xero/xui-icon/icons/arrow';
import { ns } from '../../helpers/xuiClassNamespace';
import XUIIcon from '../../icon/XUIIcon';
import XUIButton from '../../button/XUIButton';
import preventDefault from '../../helpers/preventDefault';
import { isKeyClick } from '../../helpers/reactKeyHandler';

export default class AccordionTrigger extends PureComponent {
  handleTriggerInteraction = event => {
    const { updateOpenAccordionItem, onItemClick, onItemClickArgs, isOpen } = this.props;

    if (event.defaultPrevented) {
      return;
    }

    updateOpenAccordionItem();
    if (onItemClick) {
      onItemClick({ ...onItemClickArgs, isOpen: !isOpen });
    }
  };

  onKeyPress = event => {
    if (isKeyClick(event)) {
      this.handleTriggerInteraction(event);
      event.preventDefault(); // prevent spacebar scroll.
    }
  };

  render() {
    const {
      action,
      custom,
      isOpen,
      leftContent,
      toggleLabel,
      overflow,
      pinnedValue,
      qaHook,
      primaryHeading,
      secondaryHeading,
    } = this.props;

    const primaryHeadingScaffold = primaryHeading && (
      <div className={`${ns}-accordiontrigger--primaryheading`}>{primaryHeading}</div>
    );

    const secondaryHeadingScaffold = secondaryHeading && (
      <div className={`${ns}-accordiontrigger--secondaryheading`}>{secondaryHeading}</div>
    );

    const pinnedValueScaffold = pinnedValue && (
      <div className={`${ns}-accordiontrigger--pinnedvalue`}>{pinnedValue}</div>
    );

    const builtRightContent = (pinnedValueScaffold || action || overflow) && (
      <div
        className={`${ns}-accordiontrigger--rightcontent`}
        onClick={preventDefault}
        onKeyPress={preventDefault}
        role="presentation"
      >
        {pinnedValueScaffold}
        {action}
        <div className={`${ns}-accordiontrigger--overflowcontent`}>{overflow}</div>
      </div>
    );

    return (
      <div
        data-automationid={qaHook}
        onClick={this.handleTriggerInteraction}
        onKeyPress={this.onKeyPress}
        tabIndex="0"
        role="button"
        aria-label={toggleLabel}
        className={cn(`${ns}-accordiontrigger`, {
          [`${ns}-accordiontrigger-is-open`]: isOpen,
        })}
      >
        <div className={`${ns}-accordiontrigger--arrow`}>
          <XUIButton variant="icon" title={toggleLabel} tabIndex={-1}>
            <XUIIcon icon={arrowPath} rotation={isOpen ? 180 : null} />
          </XUIButton>
        </div>

        {leftContent}

        <div className={`${ns}-accordiontrigger--content`}>
          <div className={`${ns}-accordiontrigger--headings`}>
            {primaryHeadingScaffold}
            {secondaryHeadingScaffold}
          </div>
          {custom}
          {builtRightContent}
        </div>
      </div>
    );
  }
}

AccordionTrigger.propTypes = {
  qaHook: PropTypes.string,
  custom: PropTypes.node,
  onItemClick: PropTypes.func,
  toggleLabel: PropTypes.string.isRequired,
  updateOpenAccordionItem: PropTypes.func.isRequired,
  onItemClickArgs: PropTypes.object,
  isOpen: PropTypes.bool,
  leftContent: PropTypes.node,
  primaryHeading: PropTypes.node,
  secondaryHeading: PropTypes.node,
  pinnedValue: PropTypes.node,
  action: PropTypes.node,
  overflow: PropTypes.node,
};
