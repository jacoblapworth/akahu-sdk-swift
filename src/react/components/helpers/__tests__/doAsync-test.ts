import doAsync from '../doAsync';

describe('doAsync', () => {
  const oldFavouriteNumber = 6;
  const newFavouriteNumber = 8;

  it('does not call the callback immediately', async () => {
    // Arrange
    let favouriteNumber = oldFavouriteNumber;

    // Act
    doAsync(() => {
      favouriteNumber = newFavouriteNumber;
    });

    // Assert
    expect(favouriteNumber).toBe(oldFavouriteNumber);
  });

  it('returns a promise that is resolved once the callback has been called', async () => {
    // Arrange
    let favouriteNumber = oldFavouriteNumber;

    // Act
    await doAsync(() => {
      favouriteNumber = newFavouriteNumber;
    });

    // Assert
    expect(favouriteNumber).toBe(newFavouriteNumber);
  });

  it('returns a promise that resolves to the result of the callback', async () => {
    // Arrange
    const expectedResult = oldFavouriteNumber;

    // Act
    const result = await doAsync(() => expectedResult);

    // Assert
    expect(result).toBe(expectedResult);
  });
});
