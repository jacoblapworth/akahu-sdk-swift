import React from 'react';
import XUICheckbox from '../XUICheckbox';
import XUICheckboxGroup from '../XUICheckboxGroup';

export const addVariations = (variations, storiesWithVariations) => {
  variations.forEach(variation => {
    storiesWithVariations.add(variation.storyTitle, () => {
      const { isGroup, isReversed, isSeries, groupProps } = variation;
      const label = typeof variation.labelText === 'string' ? variation.labelText : 'Test radio';

      // Remove story-specific properties
      const checkboxProps = {
        ...variation,
        storyKind: undefined,
        storyTitle: undefined,
        isGroup: undefined,
        label: undefined,
      };

      if (isGroup) {
        return (
          <div style={{ maxWidth: '600px' }}>
            <XUICheckboxGroup {...groupProps}>
              <XUICheckbox isDefaultChecked isReversed={isReversed}>
                Kakapo
              </XUICheckbox>
              <XUICheckbox isReversed={isReversed}>Weka</XUICheckbox>
              <XUICheckbox isDisabled isReversed={isReversed}>
                Kea
              </XUICheckbox>
              <XUICheckbox isReversed={isReversed}>
                Yet another option, but this one is a good deal longer and may potentially wrap to a
                new line
              </XUICheckbox>
            </XUICheckboxGroup>
          </div>
        );
      }

      if (isSeries) {
        return (
          <div>
            <XUICheckbox isReversed={isReversed}>Kakapo</XUICheckbox>
            <XUICheckbox isDefaultChecked isReversed={isReversed}>
              Kea
            </XUICheckbox>
            <XUICheckbox isReversed={isReversed}>
              Yet another option, but this one is a good deal longer and may potentially wrap to a
              new line
            </XUICheckbox>
          </div>
        );
      }

      return <XUICheckbox {...checkboxProps}>{label}</XUICheckbox>;
    });
  });
};
