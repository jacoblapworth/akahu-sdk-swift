import TextHelpers from '../TextHelpers';

describe('TextHelpers', () => {
  it('return a value when both a placeholder and value are passed', () => {
    const test = TextHelpers.getText('Another Option', 'Placeholder Option');

    expect(test).toEqual('Another Option');
  });

  it('should return a valid value when no placeholder is present', () => {
    const test = TextHelpers.getText('value');

    expect(test).toEqual('value');
  });

  it('should return the palceholder text if the value is null', () => {
    const test = TextHelpers.getText(null, 'Placeholder Option');

    expect(test).toEqual('Placeholder Option');
  });

  it('should return the palceholder text if the value is undefined', () => {
    const test = TextHelpers.getText(undefined, 'Placeholder Option');

    expect(test).toEqual('Placeholder Option');
  });

  it('should return the palceholder text if the value is an empty string', () => {
    const test = TextHelpers.getText('', 'Placeholder Option');

    expect(test).toEqual('Placeholder Option');
  });

  it('should return an empty string if nothing is passed', () => {
    const test = TextHelpers.getText();

    expect(test).toEqual('');
  });

  describe('Array Value', () => {
    it('should concatinate an array of strings and return the value', () => {
      const test = TextHelpers.getText(['First Option', 'Another Option'], 'Placeholder Option');

      expect(test).toEqual('First Option, Another Option');
    });

    it('should return a string of the first value of an array if theres only one item in the array', () => {
      const test = TextHelpers.getText(['Another Option'], 'Placeholder Option');

      expect(test).toEqual('Another Option');
    });

    it('should sort values passed in an array of strings by length, shortest first', () => {
      const test = TextHelpers.getText(['abcd', 'ab', 'a', 'abc'], 'Placeholder Option');

      expect(test).toEqual('a, ab, abc, abcd');
    });

    it('should sort alphabetically two strings of the same length', () => {
      const test = TextHelpers.getText(['cba', 'abc'], 'Placeholder Option');

      expect(test).toEqual('abc, cba');
    });

    it('should return the a string of the same value as the input if an array of two exactly the same things are passed in', () => {
      const test = TextHelpers.getText(['abc', 'abc'], 'Placeholder Option');
      const testNum = TextHelpers.getText([123, 123], 'Placeholder Option');

      expect(test).toEqual('abc, abc');
      expect(testNum).toEqual('123, 123');
    });

    it('should sort values passed in an array of numbers by length, shortest first', () => {
      const test = TextHelpers.getText([1234, 12, 1, 123], 'Placeholder Option');

      expect(test).toEqual('1, 12, 123, 1234');
    });
  });
});
