/* eslint-disable no-console */
import labelRequiredError from '../labelRequiredError';

describe('labelRequiredError', () => {
  beforeAll(() => {
    // As this helper is made to provide errors in dev environments,
    // we need to lie and tell it we're developing for these tests.
    process.env.NODE_ENV = 'development';
  });
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('logs an error when isLabelProvided only contains false values', () => {
    labelRequiredError('XUITestComponent', ['label'], [false]);
    expect(console.error).toHaveBeenCalledWith(
      'XUITestComponent:  One of the following is required in order to meet WCAG accessibility guidelines: label',
    );
  });

  it('does not log an error when isLabelProvided only contains true values', () => {
    labelRequiredError('XUITestComponent', ['label'], [true]);
    expect(console.error).toBeCalledTimes(0);
  });

  it('logs multiple potential props', () => {
    labelRequiredError('XUITestComponent', ['label', 'labelId'], [false]);
    expect(console.error).toHaveBeenCalledWith(
      'XUITestComponent:  One of the following is required in order to meet WCAG accessibility guidelines: label,labelId',
    );
  });

  it('does not log an error when a single condition is true', () => {
    labelRequiredError('XUITestComponent', ['label'], [false, false, true, false]);
    expect(console.error).toBeCalledTimes(0);
  });

  it('correctly casts props to booleans', () => {
    const aValue = 'yo';
    labelRequiredError('XUITestComponent', ['label', 'labelId'], [false, aValue]);
    expect(console.error).toBeCalledTimes(0);
  });

  afterAll(() => {
    process.env.NODE_ENV = 'test';
  });
});
