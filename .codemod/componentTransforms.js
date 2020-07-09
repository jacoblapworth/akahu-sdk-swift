const stringReplace = require('@xero/xuishift/transforms/stringReplace');

module.exports = {
  button: [
    {
      name: 'XUIButton',
      props: [
        {
          name: 'variant',
          valueTransform: stringReplace({
            // prettier-ignore
            'link': 'borderless-primary'
          }),
        },
        {
          name: 'loadingLabel',
          newName: 'loadingAriaLabel',
        },
      ],
    },
    {
      name: 'XUIButtonCaret',
      newName: 'ButtonCaret_MOVE_TO_PROP_ON_BUTTON',
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
            // prettier-ignore
            'link': 'standard'
          }),
        },
        {
          name: 'loadingLabel',
          newName: 'loadingAriaLabel',
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
            // prettier-ignore
            'link': 'standard'
          }),
        },
      ],
    },
  ],
  dropdown: [
    {
      name: 'DropDown',
      newName: 'XUIDropdown',
    },
    {
      name: 'DropDownHeader',
      newName: 'XUIDropdownHeader',
      props: [
        {
          name: 'backButtonLabel',
          newName: 'backButtonAriaLabel',
        },
      ],
    },
    {
      name: 'DropDownFooter',
      newName: 'XUIDropdownFooter',
    },
    {
      name: 'DropDownPanel',
      newName: 'XUIDropdownPanel',
    },
    {
      name: 'DropDownToggled',
      newName: 'XUIDropdownToggled',
    },
    {
      name: 'NestedDropDown',
      newName: 'XUINestedDropdown',
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
  barchart: [
    {
      name: 'XUIBarChart',
      props: [
        {
          name: 'loadingLabel',
          newName: 'loadingAriaLabel',
        },
      ],
    },
  ],
  datepicker: [
    {
      name: 'XUIDatePicker',
      props: [
        {
          name: 'nextButtonLabel',
          newName: 'nextButtonAriaLabel',
        },
        {
          name: 'prevButtonLabel',
          newName: 'prevButtonAriaLabel',
        },
      ],
    },
  ],
  picklist: [
    {
      name: 'NestedPicklist',
      newName: 'XUINestedPicklist',
    },
    {
      name: 'NestedPicklistContainer',
      newName: 'XUINestedPicklistContainer',
    },
    {
      name: 'NestedPicklistTrigger',
      newName: 'XUINestedPicklistTrigger',
    },
    {
      name: 'Pickitem',
      newName: 'XUIPickitem',
    },
    {
      name: 'Picklist',
      newName: 'XUIPicklist',
    },
    {
      name: 'PicklistDivider',
      newName: 'XUIPicklistDivider',
    },
    {
      name: 'PicklistHeader',
      newName: 'XUIPicklistHeader',
    },
    {
      name: 'StatefulPicklist',
      newName: 'XUIStatefulPicklist',
    },
  ],
  selectbox: [
    {
      name: 'SelectBox',
      newName: 'XUISelectBox',
    },
    {
      name: 'SelectBoxOption',
      newName: 'XUISelectBoxOption',
    },
  ],
  table: [
    {
      name: 'XUITable',
      props: [
        {
          name: 'loaderLabel',
          newName: 'loaderAriaLabel',
        },
        {
          name: 'checkOneRowLabel',
          newName: 'checkOneRowAriaLabel',
        },
        {
          name: 'checkAllRowsLabel',
          newName: 'checkAllRowsAriaLabel',
        },
      ],
    },
  ],
};
