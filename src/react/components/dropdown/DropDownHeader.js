import React, { PureComponent, Children } from 'react';
import PropTypes from 'prop-types';
import back from '@xero/xui-icon/icons/back';
import cn from 'classnames';
import XUIButton from '../button/XUIButton';
import XUIIconButton from '../button/XUIIconButton';
import { baseClass } from './private/constants';
import { ns } from '../helpers/xuiClassNamespace';

/**
 * Wrapper component for contents of a dropdown header. Certain elements (back button, title, etc)
 * are added and controlled via props, but children nodes are also allowed for extra customization.
 *
 * @export
 * @class DropDownHeader
 * @extends {PureComponent}
 */
export default class DropDownHeader extends PureComponent {
  rootNode = React.createRef();

  render() {
    const {
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
      backButtonLabel,
      onlyShowForMobile,
      leftContent,
      rightContent,
    } = this.props;

    const classes = cn(`${baseClass}--header`, className);
    const headerClasses = cn(
      `${baseClass}--header-container`,
      onlyShowForMobile && `${baseClass}-hide-small-up`,
    );

    const backButton = onBackButtonClick ? (
      <XUIIconButton
        icon={back}
        className={`${ns}-dropdown--headerbackbutton`}
        onClick={onBackButtonClick}
        ariaLabel={backButtonLabel}
        qaHook={qaHook != null ? `${qaHook}--button-back` : null}
        size="small"
      />
    ) : null;

    const secondaryButton = onSecondaryButtonClick ? (
      <XUIButton
        size="small"
        onClick={onSecondaryButtonClick}
        isDisabled={isSecondaryButtonDisabled}
        qaHook={qaHook != null ? `${qaHook}--button-secondary` : null}
      >
        {secondaryButtonContent}
      </XUIButton>
    ) : null;

    const primaryButton = onPrimaryButtonClick ? (
      <XUIButton
        className={secondaryButtonContent ? `${ns}-margin-left-small` : ''}
        size="small"
        variant="primary"
        onClick={onPrimaryButtonClick}
        isDisabled={isPrimaryButtonDisabled}
        qaHook={qaHook != null ? `${qaHook}--button-primary` : null}
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
      backButton || title || leftContent ? (
        <div
          className={`${baseClass}--header-leftcontent`}
          data-automationid={qaHook && `${qaHook}--header-left`}
        >
          {backButton}
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
      leftHeader || rightHeader ? (
        <div className={headerClasses}>
          {leftHeader}
          {rightHeader}
        </div>
      ) : null;

    return (
      <div ref={this.rootNode} className={classes} data-automationid={qaHook}>
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
  }
}

DropDownHeader.propTypes = {
  qaHook: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,

  /** If present, is used in the header */
  title: PropTypes.node,

  /** Callback for when the primary button is clicked */
  onPrimaryButtonClick: PropTypes.func,

  /** Callback for when the secondary button is clicked */
  onSecondaryButtonClick: PropTypes.func,

  /** Content to render within the primary button */
  primaryButtonContent: PropTypes.node,

  /** Content to render within the secondary button */
  secondaryButtonContent: PropTypes.node,

  /** Whether the primary button is disabled */
  isPrimaryButtonDisabled: PropTypes.bool,

  /** Whether the primary button is disabled */
  isSecondaryButtonDisabled: PropTypes.bool,

  /** Callback for when the back button is pressed (back button will not be rendered
   * if this is not provided) */
  onBackButtonClick: PropTypes.func,

  /** Specify an alternate label attribute for the back button, defaults to 'Back'. */
  backButtonLabel: PropTypes.string,

  /** Whether the header should only be shown at mobile sizes. */
  onlyShowForMobile: PropTypes.bool,

  /** Content to be added on the left side of the header, will come after the back button
   * if one is present */
  leftContent: PropTypes.node,

  /** Content to be added on the right side of the header, will come before the
   * primary/secondary button present */
  rightContent: PropTypes.node,
};

DropDownHeader.defaultProps = {
  primaryButtonContent: 'Apply',
  secondaryButtonContent: 'Cancel',
  backButtonLabel: 'Back',
  onlyShowForMobile: false,
};
