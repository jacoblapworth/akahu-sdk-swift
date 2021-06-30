import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import checkRequiredProps from '../../helpers/checkRequiredProps';
import XUIButton from '../button/XUIButton';
import useContainerQuery from '../helpers/useContainerQuery';
import XUIIllustration from '../illustration/XUIIllustration';
import baseClass from './private/constants';
import IntroBannerHeader from './private/IntroBannerHeader';

interface Props {
  /**
   * The body of the intro banner. We recommend a `XUIIntroBannerBody`.
   */
  children: React.ReactNode;
  className?: string;
  /**
   * Text for the dismiss button.
   *
   * Recommended English values: *Hide* or *Close*
   */
  dismissButtonText: string;
  /**
   * The footer of the intro banner. This is required if the intro banner includes a video illustration.
   *
   * We recommend a `XUIIntroBannerFooter`.
   */
  footer?: React.ReactNode;
  /**
   * Classes to add to the intro banner header
   */
  headerClassName?: string;
  /**
   * The title for the intro banner.
   */
  headerTitle: React.ReactNode;
  /**
   * The alternative text for the illustration `img` element.
   *
   * Defaults to an empty string (`alt=""`) which indicates that this image is not a key part of the
   * content (decorative), and that non-visual browsers may omit it from rendering.
   *
   * For more information [visit the MDN page for the Image Embed
   * element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes).
   */
  illustrationAltText?: string;
  /**
   * The url for the illustration image.
   */
  illustrationUrl?: string;
  /**
   * Callback for when the banner is dismissed.
   */
  onDismiss: () => void;
  /**
   * Callback for when the video button is clicked.
   */
  onVideoClick?: () => void;
  qaHook?: string;
  /**
   * Accessibility aria-label to be applied to the video button.
   *
   * Recommended English value: *Watch video*
   */
  videoButtonLabel?: string;
}

const XUIIntroBanner = ({
  children,
  className,
  dismissButtonText,
  footer,
  headerClassName,
  headerTitle,
  illustrationAltText,
  illustrationUrl,
  onDismiss,
  onVideoClick,
  qaHook,
  videoButtonLabel,
  ...spreadProps
}: Props) => {
  const { isWidthAboveBreakpoint, observedElementRef } = useContainerQuery<HTMLDivElement>(
    undefined,
    true,
  );

  const classes = cn(
    `${baseClass}`,
    illustrationUrl && `${baseClass}-has-illustration`,
    isWidthAboveBreakpoint('small') && `${baseClass}-small-up`,
    !isWidthAboveBreakpoint('medium') && `${baseClass}-medium-down`,
    className,
  );

  const dismissButton = (
    <XUIButton
      className={`${baseClass}--dismissbutton`}
      onClick={onDismiss}
      size="small"
      variant="borderless-primary"
    >
      {dismissButtonText}
    </XUIButton>
  );

  const header = <IntroBannerHeader className={headerClassName} headerTitle={headerTitle} />;

  const illustration = illustrationUrl && (
    <XUIIllustration
      alt={illustrationAltText}
      qaHook={qaHook && `${qaHook}--illustration`}
      src={illustrationUrl}
    />
  );

  const playButton = <div className={`${baseClass}--videoicon`} />;

  return (
    <div className={`${baseClass}--wrapper`}>
      <div {...spreadProps} className={classes} data-automationid={qaHook} ref={observedElementRef}>
        {illustration && onVideoClick && (
          <button
            aria-label={videoButtonLabel}
            className={`${baseClass}--illustration ${baseClass}--illustration-has-video`}
            onClick={onVideoClick}
            type="button"
          >
            {illustration}
            {playButton}
          </button>
        )}

        {illustration && !onVideoClick && (
          <div className={`${baseClass}--illustration`}>{illustration}</div>
        )}

        {illustration ? (
          <div className={`${baseClass}--main`}>
            {dismissButton}
            {header}
            {children}
            {footer}
          </div>
        ) : (
          <>
            {dismissButton}
            {header}
            {children}
            {footer}
          </>
        )}
      </div>
    </div>
  );
};

XUIIntroBanner.propTypes = {
  /**
   * The body of the intro banner. We recommend a `XUIIntroBannerBody`.
   */
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  /**
   * Text for the dismiss button.
   *
   * Recommended English values: *Hide* or *Close*
   */
  dismissButtonText: PropTypes.string.isRequired,
  /**
   * The footer of the intro banner. This is required if the intro banner includes a video illustration.
   *
   * We recommend a `XUIIntroBannerFooter`.
   */
  footer(...parameters: [Record<string, unknown>, string, string, string, string]) {
    return checkRequiredProps('onVideoClick', PropTypes.string.isRequired, ...parameters);
  },
  /**
   * Classes to add to the intro banner header
   */
  headerClassName: PropTypes.string,
  /**
   * The title for the intro banner.
   */
  headerTitle: PropTypes.string.isRequired,
  /**
   * The alternative text for the illustration `img` element.
   *
   * Defaults to an empty string (`alt=""`) which indicates that this image is not a key part of the
   * content (decorative), and that non-visual browsers may omit it from rendering.
   *
   * For more information [visit the MDN page for the Image Embed
   * element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes).
   */
  illustrationAltText: PropTypes.string,
  /**
   * The url for the illustration image.
   */
  illustrationUrl: PropTypes.string,
  /**
   * Callback for when the banner is dismissed.
   */
  onDismiss: PropTypes.func.isRequired,
  /**
   * Callback for when the video button is clicked. Provide if the illustration should link to a video.
   */
  onVideoClick: PropTypes.func,
  qaHook: PropTypes.string,
  /**
   * Accessibility aria-label to be applied to the video button.
   *
   * Recommended English value: *Watch video*
   */
  videoButtonLabel(...parameters: [Record<string, unknown>, string, string, string, string]) {
    return checkRequiredProps('onVideoClick', PropTypes.string.isRequired, ...parameters);
  },
};

XUIIntroBanner.defaultProps = {
  illustrationAltText: '',
};

export { XUIIntroBanner as default };
