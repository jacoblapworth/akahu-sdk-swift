import crossIcon from '@xero/xui-icon/icons/cross';
import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { XUIIconButton } from '../../button';
import IdContext from './contexts/IdContext';
import { baseClassName } from './private/constants';

const XUIPopoverHeader = ({ className, closeButtonProps, onClose, qaHook, subtitle, title }) => {
  const { getTitleId } = React.useContext(IdContext);

  const titleId = getTitleId();

  return (
    <div className={cn(`${baseClassName}--header`, className)} data-automationid={qaHook}>
      <div className={`${baseClassName}--title-wrapper`} id={titleId}>
        <div className={cn(`${baseClassName}--title`)}>{title}</div>
        {subtitle && <div className={cn(`${baseClassName}--subtitle`)}>{subtitle}</div>}
      </div>
      <XUIIconButton
        icon={crossIcon}
        {...closeButtonProps}
        className={cn(`${baseClassName}--close`, closeButtonProps && closeButtonProps.className)}
        onClick={event => {
          closeButtonProps && closeButtonProps.onClick && closeButtonProps.onClick(event);
          onClose && onClose(event);
        }}
        qaHook={qaHook && `${qaHook}--close`}
        size="small"
      />
    </div>
  );
};

XUIPopoverHeader.propTypes = {
  className: PropTypes.string,
  /**
   * Props to be spread onto the close button. This must include an `ariaLabel` to help assistive
   * technologies communicate the purpose of the icon button. See XUIIconButton's documentation for
   * more details.
   */
  closeButtonProps: PropTypes.object.isRequired,
  /**
   * Callback to be called when the close button is clicked. If provided along with
   * `closeButtonProps.onClick`, both will be called.
   */
  onClose: PropTypes.func,
  qaHook: PropTypes.string,
  /**
   * An optional subtitle for the popover. This is useful for conveying progress during an
   * onboarding experience, for example "Step 1/3".
   */
  subtitle: PropTypes.string,
  /**
   * The title for the popover. This is required when using this component.
   */
  title: PropTypes.string.isRequired,
};

export default XUIPopoverHeader;
