import conditionallyRequiredValidator from '../conditionallyRequiredValidator';

describe('conditionallyRequiredValidator', () => {
  it('returns null if the prop is not required and is the correct type', () => {
    expect(
      conditionallyRequiredValidator(
        { testProp: 10 },
        'testProp',
        'TestComponent',
        false,
        'a non-required prop',
        'number',
      ),
    ).toBeNull();
  });

  it('throws an error when the prop is required but not provided', () => {
    expect(
      conditionallyRequiredValidator(
        {},
        'testProp',
        'TestComponent',
        true,
        'a required prop',
        'number',
      ),
    ).toEqual(
      new Error(
        'The prop `testProp` is required by `TestComponent` when using `a required prop`, but its value is `undefined`.',
      ),
    );
  });

  it('throws an error when the prop is not the correct type', () => {
    expect(
      conditionallyRequiredValidator(
        { testProp: '10' },
        'testProp',
        'TestComponent',
        true,
        'a required prop',
        'number',
      ),
    ).toEqual(
      new Error(
        'Invalid prop `testProp` of type `string` supplied to `TestComponent`, expected `number`.',
      ),
    );
  });

  it('returns null if the prop is required and is the correct type', () => {
    expect(
      conditionallyRequiredValidator(
        { testProp: 10 },
        'testProp',
        'TestComponent',
        true,
        'a required prop',
        'number',
      ),
    ).toBeNull();
  });
});
