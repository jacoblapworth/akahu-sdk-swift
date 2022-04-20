const stringReplace = require('@xero/xuishift/transforms/stringReplace');

const remove = () => () => undefined;

module.exports = {
  editabletable: [
    {
      name: 'XUIEditableTableFootAction',
      props: [
        {
          name: 'addButtonContent',
          newName: 'buttonContent',
        },
        {
          name: 'onAdd',
          newName: 'onClick',
        },
      ],
    },
    {
      name: 'EditableTableUtilityBar',
      newName: 'XUIEditableTableUtilityBar',
    },
    {
      name: 'XUIEditableTableCellSelectBox',
      props: [
        {
          name: 'useNewFocusBehaviour',
          valueTransform: remove(),
        },
        {
          name: 'restrictFocus',
          valueTransform: remove(),
        },
      ],
    },
    {
      name: 'XUIEditableTableCellAutocompleter',
      props: [
        {
          name: 'useNewFocusBehaviour',
          valueTransform: remove(),
        },
        {
          name: 'closeOnTab',
          valueTransform: remove(),
        },
      ],
    },
    {
      name: 'XUIEditableTableCellAutocompleterSecondarySearch',
      props: [
        {
          name: 'useNewFocusBehaviour',
          valueTransform: remove(),
        },
        {
          name: 'closeOnTab',
          valueTransform: remove(),
        },
        {
          name: 'restrictFocus',
          valueTransform: remove(),
        },
      ],
    },
  ],
  dropdown: [
    {
      name: 'XUIDropdown',
      props: [
        {
          name: 'restrictFocus',
          valueTransform: remove(),
        },
      ],
    },
    {
      name: 'XUIDropdownToggled',
      props: [
        {
          name: 'useNewFocusBehaviour',
          valueTransform: remove(),
        },
        {
          name: 'closeOnTab',
          valueTransform: remove(),
        },
      ],
    },
  ],
  selectbox: [
    {
      name: 'XUISelectBox',
      props: [
        {
          name: 'useNewFocusBehaviour',
          valueTransform: remove(),
        },
        {
          name: 'restrictFocus',
          valueTransform: remove(),
        },
      ],
    },
  ],
  autocompleter: [
    {
      name: 'XUIAutocompleter',
      props: [
        {
          name: 'useNewFocusBehaviour',
          valueTransform: remove(),
        },
        {
          name: 'closeOnTab',
          valueTransform: remove(),
        },
      ],
    },
    {
      name: 'XUIAutocompleterSecondarySearch',
      props: [
        {
          name: 'useNewFocusBehaviour',
          valueTransform: remove(),
        },
        {
          name: 'closeOnTab',
          valueTransform: remove(),
        },
      ],
    },
  ],
  // Example usage to copy
  // button: [
  //   {
  //     name: 'XUIButton',
  //     props: [
  //       {
  //         name: 'variant',
  //         valueTransform: stringReplace({
  //           // prettier-ignore
  //           'link': 'borderless-primary'
  //         }),
  //       },
  //       {
  //         name: 'loadingLabel',
  //         newName: 'loadingAriaLabel',
  //       },
  //     ],
  //   },
  // ],
  // progressindicator: [
  //   {
  //     name: 'XUIProgressCircular',
  //     props: [
  //       {
  //         name: 'completedIcon',
  //         valueTransform: remove(),
  //       },
  //     ],
  //   },
  // ],
  // 'select-box': [
  //   {
  //     name: 'SelectBox',
  //     newName: 'XUISelectBox',
  //     newImportPath: 'selectbox',
  //   },
  // ],
};
