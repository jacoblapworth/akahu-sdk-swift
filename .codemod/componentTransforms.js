const invert = require('@xero/xuishift/transforms/invert');
const stringReplace = require('@xero/xuishift/transforms/stringReplace');

const labelTextToLabel = {
  name: 'labelText',
  newName: 'label',
};

module.exports = {
  '@xero/xui/react/pill': [
    {
      isDefault: true,
      props: [
        {
          name: 'isMaxContentWidth',
          newName: 'isLimitedWidth',
          valueTransform: invert(true),
        },
      ],
    },
  ],
  '@xero/xui/react/tag': [
    {
      isDefault: true,
      props: [
        {
          name: 'size',
          valueTransform: stringReplace({}, 'small'),
        },
      ],
    },
  ],
  '@xero/xui/react/select-box': [
    {
      isDefault: true,
      props: [
        {
          name: 'islabelHidden',
          newName: 'isLabelHidden',
        },
        labelTextToLabel,
        {
          name: 'fullWidth',
          valueTransform: (node, j, path) => {
            const buttonVariantIsSet = path.value.openingElement.attributes.some(
              attribute => attribute.name !== null && attribute.name.name === 'buttonVariant',
            );

            if (buttonVariantIsSet) {
              return j.literal('never');
            }

            return node && node.value;
          },
        },
      ],
    },
  ],
  '@xero/xui/react/autocompleter': [
    {
      isDefault: true,
      props: [
        {
          name: 'inputLabelText',
          newName: 'inputLabel',
        },
        {
          name: 'searchThrottleInterval',
          newName: 'searchDebounceTimeout',
        },
        {
          name: 'dropdownSize',
          valueTransform: stringReplace({
            small: 'xsmall',
            medium: 'small',
            large: 'medium',
            xlarge: 'large',
          }),
        },
      ],
    },
    {
      name: 'XUIAutocompleterSecondarySearch',
      props: [
        {
          name: 'inputLabelText',
          newName: 'inputLabel',
        },
        {
          name: 'dropdownSize',
          valueTransform: stringReplace({
            small: 'xsmall',
            medium: 'small',
            large: 'medium',
            xlarge: 'large',
          }),
        },
      ],
    },
  ],
  '@xero/xui/react/checkbox': [
    {
      name: 'XUICheckboxGroup',
      props: [labelTextToLabel],
    },
  ],
  '@xero/xui/react/radio': [
    {
      name: 'XUIRadioGroup',
      props: [labelTextToLabel],
    },
  ],
  '@xero/xui/react/rollovercheckbox': [
    {
      isDefault: true,
      props: [labelTextToLabel],
    },
  ],
  '@xero/xui/react/textinput': [
    {
      isDefault: true,
      props: [
        labelTextToLabel,
        {
          name: 'size',
          valueTransform: stringReplace({
            standard: 'medium',
          }),
        },
      ],
    },
  ],
  '@xero/xui/react/toggle': [
    {
      isDefault: true,
      props: [
        labelTextToLabel,
        {
          name: 'variant',
          newName: 'size',
        },
      ],
    },
  ],
  '@xero/xui/react/structural': [
    {
      name: 'XUIContentBlockItem',
      props: [
        {
          name: 'tag',
          newName: 'tags',
        },
        {
          name: 'secondaryHeading',
          newName: 'description',
        },
      ],
    },
  ],
  '@xero/xui/react/loader': [
    {
      isDefault: true,
      props: [
        {
          name: 'size',
          valueTransform: stringReplace(
            {
              small: 'xsmall',
              standard: 'small',
              large: 'medium',
            },
            'small',
          ),
        },
      ],
    },
  ],
  '@xero/xui/react/button': [
    {
      isDefault: true,
      props: [
        {
          name: 'fullWidth',
          valueTransform: (node, j, path) => {
            const sizeAttribute = path.value.openingElement.attributes.find(
              attribute => attribute.name && attribute.name.name === 'size',
            );

            const size = sizeAttribute && sizeAttribute.value && sizeAttribute.value.value;

            if (size === 'full-width') {
              return j.literal('always');
            }

            if (size === 'full-width-mobile') {
              return j.literal('small-down');
            }

            return node && node.value;
          },
        },
        {
          name: 'size', // If `icon` or `icon-inverted` variant, set size='small'
          valueTransform: (node, j, path) => {
            const sizeAttribute = path.value.openingElement.attributes.find(
              attribute => attribute.name && attribute.name.name === 'size',
            );
            const variantAttribute = path.value.openingElement.attributes.find(
              attribute => attribute.name && attribute.name.name === 'variant',
            );

            const variant =
              variantAttribute && variantAttribute.value && variantAttribute.value.value;
            const size = sizeAttribute && sizeAttribute.value && sizeAttribute.value.value;

            if (size === 'full-width' || size === 'full-width-mobile') {
              return;
            }

            if (variant === 'icon' || variant === 'icon-inverted') {
              return j.literal('small');
            }
            if (variant === 'icon-large' || variant === 'icon-inverted-large') {
              return j.literal('medium');
            }

            return node && node.value;
          },
        },
        {
          name: 'variant', // If `icon-large` or `icon-inverted-large` variant, set to non-sized variant
          valueTransform: (node, j, path) => {
            const variantAttribute = path.value.openingElement.attributes.find(
              attribute => attribute.name && attribute.name.name === 'variant',
            );

            const variant =
              variantAttribute && variantAttribute.value && variantAttribute.value.value;

            if (variant === 'icon-large') {
              return j.literal('icon');
            }
            if (variant === 'icon-inverted-large') {
              return j.literal('icon-inverted');
            }

            return node && node.value;
          },
        },
      ],
    },
  ],
  '@xero/xui/react/structural': [
    {
      name: 'XUIColumn',
      props: [
        {
          name: 'gridColumnsMedium',
          newName: 'gridColumnsSmallUp',
        },
        {
          name: 'gridColumnsWide',
          newName: 'gridColumnsLargeUp',
        },
      ],
    },
  ],
  '@xero/xui/react/dropdown': [
    {
      isDefault: true,
      props: [
        {
          name: 'size',
          valueTransform: stringReplace({
            small: 'xsmall',
            medium: 'small',
            large: 'medium',
            xlarge: 'large',
          }),
        },
      ],
    },
    {
      name: 'NestedDropDown',
      props: [
        {
          name: 'size',
          valueTransform: stringReplace({
            small: 'xsmall',
            medium: 'small',
            large: 'medium',
            xlarge: 'large',
          }),
        },
      ],
    },
  ],
};
