import addOffsetToTransform from '../addOffsetToTransform';

describe('addOffsetToTransform', () => {
  describe('dragged row', () => {
    const theories = [
      {
        expectedTransform: 'translate(0px, 0px)',
        providedTransform: 'translate(0px, 0px)',
        title: 'does not have an offset added until it is dragged somewhere',
      },
      {
        expectedTransform: 'translate(0px, -2px)',
        providedTransform: 'translate(0px, -1px)',
        title: 'adds a y-offset of -1px when the row is dragged up',
      },
      {
        expectedTransform: 'translate(0px, -1px)',
        providedTransform: 'translate(0px, 1px)',
        title: 'adds a y-offset of -2px when the row is dragged down',
      },
    ];

    theories.forEach(({ expectedTransform, providedTransform, title }) => {
      it(title, () => {
        expect(addOffsetToTransform(providedTransform, true)).toBe(expectedTransform);
      });
    });
  });

  describe('rearranged row', () => {
    const theories = [
      {
        expectedTransform: 'none',
        providedTransform: 'translate(0px, 0px)',
        title: 'sets the transform to `none` until the row is rearranged',
      },
      {
        expectedTransform: 'translate(0px, -1px)',
        providedTransform: 'translate(0px, -1px)',
        title: 'does not have an offset added when the row is dragged up',
      },
      {
        expectedTransform: 'translate(0px, 2px)',
        providedTransform: 'translate(0px, 1px)',
        title: 'adds a y-offset of 1px when the row is dragged down',
      },
    ];

    theories.forEach(({ expectedTransform, providedTransform, title }) => {
      it(title, () => {
        expect(addOffsetToTransform(providedTransform, false)).toBe(expectedTransform);
      });
    });
  });
});
