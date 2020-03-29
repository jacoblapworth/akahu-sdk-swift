import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import cn from 'classnames';
import '../helpers/xuiGlobalChecks';
import { sizeClassNames, classNames, variantClassNames } from './constants';
import { getAvatarColorClass, abbreviateAvatar } from './utils';

export default class XUIAvatar extends PureComponent {
  state = {
    imageLoaded: false,
  };

  /**
   * onError handler for the image element
   * @param {Error} e Error object
   */
  onError = e => {
    const { onError } = this.props;
    onError && onError(e);
  };

  onLoad = () => {
    this.setState({
      imageLoaded: true,
    });
  };

  memoizedAbbreviateAvatar = memoizeOne(abbreviateAvatar);

  render() {
    const { imageLoaded } = this.state;

    const { qaHook, className, imageUrl, size, identifier, value, variant } = this.props;

    const avatarClassNames = cn(
      className,
      classNames.base,
      sizeClassNames[size],
      variantClassNames[variant],
    );

    const avatarCharacterCount = variant === 'business' && size !== '2xsmall' ? 3 : 2; // 2xsmall cannot fit 3 characters without overflowing
    return (
      <React.Fragment>
        {imageUrl && (
          <img
            alt=""
            className={cn(avatarClassNames, { [classNames.hidden]: !imageLoaded })}
            data-automationid={qaHook}
            onError={this.onError}
            onLoad={this.onLoad}
            src={imageUrl}
          />
        )}
        <abbr
          className={cn(avatarClassNames, getAvatarColorClass(identifier || value), {
            [classNames.hidden]: imageUrl && imageLoaded,
          })}
          data-automationid={qaHook}
          role="presentation"
        >
          {this.memoizedAbbreviateAvatar(value, avatarCharacterCount)}
        </abbr>
      </React.Fragment>
    );
  }
}

XUIAvatar.propTypes = {
  className: PropTypes.string,
  qaHook: PropTypes.string,

  /** The avatar variant */
  variant: PropTypes.oneOf(Object.keys(variantClassNames)),

  /** The text to display in the avatar */
  value: PropTypes.string.isRequired,

  /** the image the component should render. Initials rendered otherwise */
  imageUrl: PropTypes.string,

  /** The size of the avatar. Can be small, medium, large or xlarge */
  size: PropTypes.oneOf(Object.keys(sizeClassNames)),

  /** A unique string that will be used to generate the color of the avatar if color is not
   * provided. If this is not set then value is used as the identifier. */
  identifier: PropTypes.string,

  /** Error handler if the avatar image fails to load */
  onError: PropTypes.func,
};

XUIAvatar.defaultProps = {
  size: 'medium',
};
