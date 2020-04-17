import shallowCompare from '../shallowCompare';

describe('Shallow compare', () => {
  it('returns false if the first object is undefined', () => {
    // Arrange
    const obj1 = undefined;
    const obj2 = {
      test: 'test',
    };

    // Act
    const result = shallowCompare(obj1, obj2);

    // Assert
    expect(result).toBeFalsy();
  });

  it('returns false if the second object is undefined', () => {
    // Arrange
    const obj1 = {
      test: 'test',
    };
    const obj2 = undefined;

    // Act
    const isEqual = shallowCompare(obj1, obj2);

    // Assert
    expect(isEqual).toBeFalsy();
  });

  it('returns false if the length of the objects is different', () => {
    // Arrange
    const obj1 = {
      test: 'test',
    };
    const obj2 = {
      test: 'test',
      test2: 'test2',
    };

    // Act
    const isEqual = shallowCompare(obj1, obj2);

    // Assert
    expect(isEqual).toBeFalsy();
  });

  it('returns false if the objects have different contents', () => {
    // Arrange
    const obj1 = {
      test: 'test',
    };
    const obj2 = {
      test: 'test2',
    };

    // Act
    const isEqual = shallowCompare(obj1, obj2);

    // Assert
    expect(isEqual).toBeFalsy();
  });

  it('returns true if the the objects have the same contents', () => {
    // Arrange
    const obj1 = {
      test: 'test',
    };
    const obj2 = {
      test: 'test',
    };

    // Act
    const isEqual = shallowCompare(obj1, obj2);

    // Assert
    expect(isEqual).toBeTruthy();
  });
});
