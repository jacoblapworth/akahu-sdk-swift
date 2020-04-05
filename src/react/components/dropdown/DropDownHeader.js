import React, { Children } from 'react';
import PropTypes from 'prop-types';
import back from '@xero/xui-icon/icons/back';
import cn from 'classnames';
import XUIButton from '../button/XUIButton';
import XUIIconButton from '../button/XUIIconButton';
import { baseClass } from './private/constants';
import { ns } from '../helpers/xuiClassNamespace';

/**
 * Wrapper component for contents of a dropdown header. You can add primary,
 * secondary, and/or back buttons by providing the appropriate callback and
 * button content:
 *
 * | Button | Callback | Content/label |
 * |-|-|-|
 * | Primary button | `onPrimaryButtonClick` | `primaryButtonContent` |
 * | Secondary button | `onSecondaryButtonClick` | `secondaryButtonContent` |
 * | Back button | `onBackButtonClick` | `backButtonAriaLabel` |
 *
 * Child nodes are also allowed for extra customisation.
 *
 * @export
 * @function DropDownHeader
 */
const DropDownHeader = ({
  children,
  className,
  qaHook,
  title,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  primaryButtonContent,
  secondaryButtonContent,
  isPrimaryButtonDisabled,
  isSecondaryButtonDisabled,
  onBackButtonClick,
  backButtonAriaLabel,
  onlyShowForMobile = false,
  leftContent,
  rightContent,
}) => {
  const rootNode = React.createRef();

  const classes = cn(`${baseClass}--header`, className);
  const headerClasses = cn(
    `${baseClass}--header-container`,
    onlyShowForMobile && `${baseClass}-hide-small-up`,
  );

  const backButton = onBackButtonClick ? (
    <XUIIconButton
      ariaLabel={backButtonAriaLabel}
      className={`${ns}-dropdown--headerbackbutton`}
      icon={back}
      onClick={onBackButtonClick}
      qaHook={qaHook != null ? `${qaHook}--button-back` : null}
      size="small"
    />
  ) : null;

  const secondaryButton = onSecondaryButtonClick ? (
    <XUIButton
      isDisabled={isSecondaryButtonDisabled}
      onClick={onSecondaryButtonClick}
      qaHook={qaHook != null ? `${qaHook}--button-secondary` : null}
      size="small"
    >
      {secondaryButtonContent}
    </XUIButton>
  ) : null;

  const primaryButton = onPrimaryButtonClick ? (
    <XUIButton
      className={secondaryButtonContent ? `${ns}-margin-left-small` : ''}
      isDisabled={isPrimaryButtonDisabled}
      onClick={onPrimaryButtonClick}
      qaHook={qaHook != null ? `${qaHook}--button-primary` : null}
      size="small"
      variant="primary"
    >
      {primaryButtonContent}
    </XUIButton>
  ) : null;

  const titleSection = title ? (
    <div
      className={`${ns}-heading-medium ${ns}-margin-left-2xsmall ${ns}-text-truncated`}
      data-automationid={qaHook && `${qaHook}--header-title`}
    >
      {title}
    </div>
  ) : null;

  const leftHeader =
    title || leftContent ? (
      <div
        className={`${baseClass}--header-leftcontent`}
        data-automationid={qaHook && `${qaHook}--header-left`}
      >
        {leftContent}
        {titleSection}
      </div>
    ) : null;

  const rightHeader =
    secondaryButton || primaryButton || rightContent ? (
      <div
        className={`${baseClass}--header-rightcontent`}
        data-automationid={qaHook && `${qaHook}--header-right`}
      >
        <div
          className={`${baseClass}--header-rightcontent`}
          data-automationid={qaHook && `${qaHook}--header-rightcontent`}
        >
          {rightContent}
          {secondaryButton}
          {primaryButton}
        </div>
      </div>
    ) : null;

  const header =
    backButton || leftHeader || rightHeader ? (
      <div className={headerClasses}>
        {backButton}
        {leftHeader}
        {rightHeader}
      </div>
    ) : null;

  return (
    <div className={classes} data-automationid={qaHook} ref={rootNode}>
      {header}
      {Children.map(children, child => (
        <div
          className={`${baseClass}--header-container`}
          data-automationid={qaHook && `${qaHook}--header-container`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

DropDownHeader.propTypes = {
  qaHook: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,

  /** If present, is used in the header */
  title: PropTypes.node,

  /** Callback for when the primary button is clicked (button will not be
   * rendered if this is not provided) */
  onPrimaryButtonClick: PropTypes.func,

  /** Callback for when the secondary button is clicked (button will not be
   * rendered if this is not provided) */
  onSecondaryButtonClick: PropTypes.func,

  /** Content to render within the primary button */
  primaryButtonContent: PropTypes.node,

  /** Content to render within the secondary button */
  secondaryButtonContent: PropTypes.node,

  /** Whether the primary button is disabled */
  isPrimaryButtonDisabled: PropTypes.bool,

  /** Whether the secondary button is disabled */
  isSecondaryButtonDisabled: PropTypes.bool,

  /** Callback for when the back button is pressed (button will not be rendered
   * if this is not provided) */
  onBackButtonClick: PropTypes.func,

  /**
   * `aria-label` attribute for the back button
   * <br />
   * Recommended English value: *Back*
   */
  backButtonAriaLabel: PropTypes.string,

  /** Whether the header should only be shown at mobile sizes. */
  onlyShowForMobile: PropTypes.bool,

  /** Content to be added on the left side of the header, will come after the back button
   * if one is present */
  leftContent: PropTypes.node,

  /** Content to be added on the right side of the header, will come before the
   * primary/secondary button present */
  rightContent: PropTypes.node,
};

export default React.memo(DropDownHeader);
