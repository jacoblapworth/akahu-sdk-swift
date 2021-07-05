interface CharacterCounterProps {
  /** Current character count of user input */
  currentCharCount?: number;
  /** Whether to always show the character counter if `maxCharCount` is provided */
  forceShowCharacterCounter?: boolean;
  /** The character limit of the input value to convey to the user. This is a soft-limit. */
  maxCharCount: number;
  /** The minimum character count when the character counter will show. Defaults to `maxCharCount * 0.9 - 5`. */
  minCharCountToShowCounter?: number;
  /** Validation message to show when the user input length passes the maxCharCount
   * Recommended English value: "Username can't be longer than {character limit #} characters" */
  validationMessage: React.ReactNode;
}

export default CharacterCounterProps;
