const stringReplace = require('@xero/xuishift/transforms/stringReplace');

module.exports = {
  button: [
    {
      name: 'XUIButton',
      props: [
        {
          name: 'variant',
          valueTransform: stringReplace({
            'link': 'borderless-primary',
          }),
        },
      ],
    },
    {
      name: 'XUISecondaryButton',
      props: [
        {
          name: 'variant',
          valueTransform: stringReplace({
            'borderless-create': 'create',
            'borderless-inverted': 'primary',
            'borderless-muted': 'standard',
            'borderless-negative': 'negative',
            'borderless-primary': 'primary',
            'borderless-standard': 'standard',
            'link': 'standard',
          }),
        },
      ],
    },
    {
      name: 'XUISplitButtonGroup',
      props: [
        {
          name: 'variant',
          valueTransform: stringReplace({
            'borderless-create': 'create',
            'borderless-inverted': 'primary',
            'borderless-muted': 'standard',
            'borderless-negative': 'negative',
            'borderless-primary': 'primary',
            'borderless-standard': 'standard',
            'link': 'standard',
          }),
        },
      ],
    },
  ],
  dropdown: [
    {
      name: 'NestedDropDown',
      props: [
        {
          name: 'currentPanel',
          newName: 'currentPanelId',
        },
      ],
    },
  ],
  autocompleter: [
    {
      name: 'XUIAutocompleter',
      props: [
        {
          name: 'loadingLabel',
          newName: 'loadingAriaLabel',
        },
      ],
    },
  ],
};
