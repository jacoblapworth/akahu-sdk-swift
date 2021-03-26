const stringReplace = require('@xero/xuishift/transforms/stringReplace');
const remove = () => () => undefined;

module.exports = {
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
  ],
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
  ],
  'editabletablecell-autocompleter': [
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
  'icon-button': [
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
  ],
  'editabletablecell-select-box': [
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
  ],
  range: [
    {
      name: 'XUIRange',
      props: [
        {
          name: 'containerClasses',
          newName: 'containerClassName',
        },
      ],
    },
  ],
  'select-box': [
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
  ],
  'select-box-option': [
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
  'autocompleter-secondary-search': [
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
  ],
  'dropdown-layout': [
    {
      name: 'XUIDropdownLayout',
      props: [
        {
          name: 'fixedWidth',
          newName: 'hasFixedWidth',
        },
      ],
    },
  ],
  'nested-dropdown': [
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
  range: [
    {
      name: 'XUIRange',
      props: [
        {
          name: 'inputClasses',
          newName: 'inputClassName',
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
  ],
  'secondary-button': [
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
  'stateful-picklist': [
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
  'editabletablecell-textinput': [
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
