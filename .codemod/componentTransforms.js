const stringReplace = require('@xero/xuishift/transforms/stringReplace');
const remove = () => () => undefined;

module.exports = {
  picklist: [
    {
      name: 'XUIPicklist',
      props: [
        {
          name: 'onMouseDown',
          newName: 'onClick',
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
