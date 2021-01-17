import React, { useState } from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import cn from 'classnames';
import '../helpers/xuiGlobalChecks';
import { sizeClassNames, classNames, variantClassNames } from './constants';
import { getAvatarColorClass, abbreviateAvatar } from './utils';

const XUIAvatar = ({ className, identifier, imageUrl, onError, size, qaHook, value, variant }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  /**
   * onError handler for the image element
   * @param {Error} e Error object
   */
  const handleOnError = e => {
    onError && onError(e);
  };

  const onLoad = () => {
    setImageLoaded(true);
  };

  const memoizedAbbreviateAvatar = memoizeOne(abbreviateAvatar);
  const avatarClassNames = cn(
    className,
    classNames.base,
    sizeClassNames[size],
    variantClassNames[variant],
  );
  const avatarCharacterCount = variant === 'business' && size !== '2xsmall' ? 3 : 2; // 2xsmall cannot fit 3 characters without overflowing

  return (
    <>
      {imageUrl && (
        <img
          alt=""
          className={cn(avatarClassNames, { [classNames.hidden]: !imageLoaded })}
          data-automationid={qaHook}
          onError={handleOnError}
          onLoad={onLoad}
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
        {memoizedAbbreviateAvatar(value, avatarCharacterCount)}
      </abbr>
    </>
  );
};

export default XUIAvatar;

XUIAvatar.propTypes = {
  className: PropTypes.string,

  /** A unique string that will be used to generate the color of the avatar if color is not
   * provided. If this is not set then value is used as the identifier. */
  identifier: PropTypes.string,

  /** the image the component should render. Initials rendered otherwise */
  imageUrl: PropTypes.string,

  /** Error handler if the avatar image fails to load */
  onError: PropTypes.func,

  qaHook: PropTypes.string,

  /** The size of the avatar. Can be small, medium, large or xlarge */
  size: PropTypes.oneOf(Object.keys(sizeClassNames)),

  /** The text to display in the avatar */
  value: PropTypes.string.isRequired,

  /** The avatar variant */
  variant: PropTypes.oneOf(Object.keys(variantClassNames)),
};

XUIAvatar.defaultProps = {
  size: 'medium',
};
