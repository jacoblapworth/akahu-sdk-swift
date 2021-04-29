import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../../helpers/xuiClassNamespace';

const CharacterCounterElement = ({
  characterCounter: {
    currentCharCount,
    forceShowCharacterCounter,
    maxCharCount,
    minCharCountToShowCounter,
  },
  qaHook,
}) => {
  const charCountClasses = cn(`${ns}-charactercounter`, `${ns}-charactercounter-layout`);
  const currentCharCountClass =
    currentCharCount > maxCharCount ? `${ns}-charactercounter-alert` : null;

  /** This variable specifies the minimum threshold to show the character counter */
  const defaultMinCharCountToShowCounter = maxCharCount * 0.9 - 5;

  const charCountEL = (forceShowCharacterCounter ||
    currentCharCount >= (minCharCountToShowCounter || defaultMinCharCountToShowCounter)) && (
    <div className={charCountClasses} data-automationid={qaHook && `${qaHook}--character-counter`}>
      <div className={currentCharCountClass}>{currentCharCount || 0}</div>
      <div>/</div>
      <div>{maxCharCount}</div>
    </div>
  );

  return charCountEL || null;
};

CharacterCounterElement.propTypes = {
  /** Character counter props */
  characterCounter: PropTypes.shape({
    /** Current character count of user input */
    currentCharCount: PropTypes.number,
    /** Whether to always show the character counter if `maxCharCount` is provided */
    forceShowCharacterCounter: PropTypes.bool,
    /** The character limit of the input value to convey to the user. This is a soft-limit. */
    maxCharCount: PropTypes.number.isRequired,
    /** The minimum character count when the character counter will show. Defaults to `maxCharCount * 0.9 - 5`. */
    minCharCountToShowCounter: PropTypes.number,
    /** Validation message to show when the user input length passes the maxCharCount
     * Recommended English value: "Username can't be longer than {character limit #} characters" */
    validationMessage: PropTypes.string.isRequired,
  }),

  qaHook: PropTypes.string,
};

export default CharacterCounterElement;
