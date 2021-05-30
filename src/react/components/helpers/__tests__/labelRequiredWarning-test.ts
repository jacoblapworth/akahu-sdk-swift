/* eslint-disable no-console */
import labelRequiredWarning from '../labelRequiredWarning';

describe('labelRequiredWarning', () => {
  beforeAll(() => {
    // As this helper is made to provide errors in dev environments,
    // we need to lie and tell it we're developing for these tests.
    process.env.NODE_ENV = 'development';
  });
  beforeEach(() => {
    console.warn = jest.fn();
  });

  it('logs a warning when isLabelProvided only contains false values', () => {
    labelRequiredWarning('XUITestComponent', ['label'], [false]);
    expect(console.warn).toHaveBeenCalledWith(
      'XUITestComponent:  As of XUI 19, one of the the following will be required in order to meet WCAG accessibility guidelines: label',
    );
  });

  it('does not log a warning when isLabelProvided only contains true values', () => {
    labelRequiredWarning('XUITestComponent', ['label'], [true]);
    expect(console.warn).toBeCalledTimes(0);
  });

  it('logs multiple potential props', () => {
    labelRequiredWarning('XUITestComponent', ['label', 'labelId'], [false]);
    expect(console.warn).toHaveBeenCalledWith(
      'XUITestComponent:  As of XUI 19, one of the the following will be required in order to meet WCAG accessibility guidelines: label,labelId',
    );
  });

  it('does not log a warning when a single condition is true', () => {
    labelRequiredWarning('XUITestComponent', ['label'], [false, false, true, false]);
    expect(console.warn).toBeCalledTimes(0);
  });

  it('correctly casts props to booleans', () => {
    const aValue = 'yo';
    labelRequiredWarning('XUITestComponent', ['label', 'labelId'], [false, aValue]);
    expect(console.warn).toBeCalledTimes(0);
  });

  afterAll(() => {
    process.env.NODE_ENV = 'test';
  });
});
