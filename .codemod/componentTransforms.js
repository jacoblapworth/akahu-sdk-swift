module.exports = {
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
  checkbox: [
    {
      name: 'XUICheckbox',
      props: [
        {
          name: 'htmlClassName',
          newName: 'checkboxElementClassName',
        },
        {
          name: 'svgClassName',
          newName: 'checkboxElementClassName',
        },
      ],
    },
  ],
  radio: [
    {
      name: 'XUIRadio',
      props: [
        {
          name: 'htmlClassName',
          newName: 'radioElementClassName',
        },
        {
          name: 'svgClassName',
          newName: 'radioElementClassName',
        },
      ],
    },
  ],
  structural: [
    {
      name: 'XUIRow',
      props: [
        {
          name: 'variant',
          valueTransform: stringReplace(
            {
              // prettier-ignore
              'standard': 'float',
            },
            'float',
          ),
        },
      ],
    },
  ],
};
