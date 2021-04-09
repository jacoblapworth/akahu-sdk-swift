const stringReplace = require('@xero/xuishift/transforms/stringReplace');
const remove = () => () => undefined;

module.exports = {
  autocompleter: [
    {
      name: 'XUIAutocompleter',
      props: [
        {
          name: 'loading',
          newName: 'isLoading',
        },
        {
          name: 'dropdownFixedWidth',
          newName: 'dropdownHasFixedWidth',
        },
      ],
    },
    {
      name: 'XUIAutocompleterSecondarySearch',
      props: [
        {
          name: 'dropdownFixedWidth',
          newName: 'dropdownHasFixedWidth',
        },
      ],
    },
  ],
  banner: [
    {
      name: 'XUIBanner',
      props: [
        {
          name: 'defaultLayout',
          newName: 'hasDefaultLayout',
        },
      ],
    },
  ],
  button: [
    {
      name: 'XUIButton',
      props: [
        {
          name: 'minLoaderWidth',
          newName: 'hasMinLoaderWidth',
        },
      ],
    },
    {
      name: 'XUIIconButton',
      props: [
        {
          name: 'desc',
          newName: 'description',
        },
        {
          name: 'minLoaderWidth',
          newName: 'hasMinLoaderWidth',
        },
      ],
    },
    {
      name: 'XUISecondaryButton',
      props: [
        {
          name: 'minLoaderWidth',
          newName: 'hasMinLoaderWidth',
        },
      ],
    },
  ],
  dropdown: [
    {
      name: 'XUIDropdown',
      props: [
        {
          name: 'fixedWidth',
          newName: 'hasFixedWidth',
        },
      ],
    },
    {
      name: 'XUIDropdownLayout',
      props: [
        {
          name: 'fixedWidth',
          newName: 'hasFixedWidth',
        },
      ],
    },
    {
      name: 'XUINestedDropdown',
      props: [
        {
          name: 'fixedWidth',
          newName: 'hasFixedWidth',
        },
      ],
    },
  ],
  editabletable: [
    {
      name: 'XUIEditableTable',
      props: [
        {
          name: 'dndInstructions',
          valueTransform: (_, j) =>
            j.literal(
              'Press Space bar or Enter to start a drag. When dragging you can use the arrow keys to move the item around and escape to cancel. Ensure your screen reader is in focus mode or to use your pass through key.',
            ),
        },
      ],
    },
    {
      name: 'XUIEditableTableCellAutocompleter',
      props: [
        {
          name: 'loading',
          newName: 'isLoading',
        },
        {
          name: 'dropdownFixedWidth',
          newName: 'dropdownHasFixedWidth',
        },
      ],
    },
    {
      name: 'XUIEditableTableCellSelectBox',
      props: [
        {
          name: 'desc',
          newName: 'description',
        },
        {
          name: 'dropDownClasses',
          newName: 'dropdownClassName',
        },
        {
          name: 'buttonClasses',
          newName: 'buttonClassName',
        },
        {
          name: 'inputGroupClasses',
          newName: 'inputGroupClassName',
        },
        {
          name: 'defaultLayout',
          newName: 'hasDefaultLayout',
        },
      ],
    },
    {
      name: 'XUIEditableTableCellTextInput',
      props: [
        {
          name: 'focusByDefault',
          newName: 'focusOnMount',
        },
      ],
    },
  ],
  icon: [
    {
      name: 'XUIIcon',
      props: [
        {
          name: 'desc',
          newName: 'description',
        },
      ],
    },
  ],
  loader: [
    {
      name: 'XUILoader',
      props: [
        {
          name: 'defaultLayout',
          newName: 'hasDefaultLayout',
        },
      ],
    },
  ],
  modal: [
    {
      name: 'XUIModal',
      props: [
        {
          name: 'defaultLayout',
          newName: 'hasDefaultLayout',
        },
      ],
    },
  ],
  picklist: [
    {
      name: 'XUIPicklist',
      props: [
        {
          name: 'onMouseDown',
          newName: 'onClick',
        },
        {
          name: 'defaultLayout',
          newName: 'hasDefaultLayout',
        },
      ],
    },
    {
      name: 'XUIStatefulPicklist',
      props: [
        {
          name: 'canFocus',
          newName: 'isFocusable',
        },
      ],
    },
  ],
  range: [
    {
      name: 'XUIRange',
      props: [
        {
          name: 'containerClasses',
          newName: 'containerClassName',
        },
        {
          name: 'inputClasses',
          newName: 'inputClassName',
        },
      ],
    },
  ],
  selectbox: [
    {
      name: 'XUISelectBox',
      props: [
        {
          name: 'containerClasses',
          newName: 'containerClassName',
        },
        {
          name: 'dropDownClasses',
          newName: 'dropdownClassName',
        },
        {
          name: 'buttonClasses',
          newName: 'buttonClassName',
        },
        {
          name: 'inputGroupClasses',
          newName: 'inputGroupClassName',
        },
        {
          name: 'defaultLayout',
          newName: 'hasDefaultLayout',
        },
      ],
    },
    {
      name: 'XUISelectBoxOption',
      props: [
        {
          name: 'optionClasses',
          newName: 'optionClassName',
        },
        {
          name: 'truncatedText',
          newName: 'truncateText',
        },
      ],
    },
  ],
  textinput: [
    {
      name: 'XUITextInput',
      props: [
        {
          name: 'focusByDefault',
          newName: 'focusOnMount',
        },
      ],
    },
  ],
  toast: [
    {
      name: 'XUIToast',
      props: [
        {
          name: 'defaultLayout',
          newName: 'hasDefaultLayout',
        },
      ],
    },
  ],
  tooltip: [
    {
      name: 'XUITooltip',
      props: [
        {
          name: 'limitWidth',
          newName: 'hasLimitedWidth',
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
