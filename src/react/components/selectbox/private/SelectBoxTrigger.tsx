import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { textButtonVariants } from '../../button/private/constants';
import XUIButton from '../../button/XUIButton';
import { selectBaseClass } from './constants';

interface BaseProps {
  _caretClassName?: string;
  _useCellStyling?: boolean;
  buttonClassName?: string;
  buttonContent?: React.ReactNode;
  buttonContentPlaceholder?: string;
  buttonVariant?: keyof typeof textButtonVariants;
  isTextTruncated?: boolean;
}

type Props = BaseProps & React.ComponentProps<typeof XUIButton>;

const SelectBoxTrigger: React.FunctionComponent<Props> = React.forwardRef<XUIButton, Props>(
  (
    {
      _useCellStyling,
      buttonClassName,
      buttonContent,
      buttonContentPlaceholder,
      buttonVariant,
      isTextTruncated,
      ...spreadProps
    },
    ref,
  ) => {
    const buttonClassNames = cn(
      `${selectBaseClass}--button`,
      !buttonVariant && `${selectBaseClass}--button-no-variant`,
      buttonClassName,
    );

    return (
      <XUIButton
        {...spreadProps}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _caretClassName={`${selectBaseClass}--caret`}
        _useCellStyling={_useCellStyling}
        className={buttonClassNames}
        hasCaret
        ref={ref}
        variant={buttonVariant}
      >
        <span
          className={cn(
            `${selectBaseClass}--content`,
            buttonContentPlaceholder && !buttonContent && `${selectBaseClass}--content-placeholder`,
            isTextTruncated && `${selectBaseClass}--content-truncated`,
          )}
        >
          {buttonContent || buttonContentPlaceholder}
        </span>
      </XUIButton>
    );
  },
);

SelectBoxTrigger.propTypes = {
  _useCellStyling: PropTypes.bool,
  buttonClassName: PropTypes.string,
  buttonContent: PropTypes.node,
  buttonContentPlaceholder: PropTypes.string,
  buttonVariant: PropTypes.oneOf(
    Object.keys(textButtonVariants) as Array<keyof typeof textButtonVariants>,
  ),
  isTextTruncated: PropTypes.bool,
};

export default SelectBoxTrigger;
