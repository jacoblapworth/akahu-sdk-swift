import React from 'react';
import shouldRender from '../shouldRender';

describe('shouldRender', () => {
  it('should return true when an element is passed', () => {
    const result = shouldRender(<div>test</div>);

    expect(result).toBe(true);
  });

  it('should return false when `undefined` is passed', () => {
    const result = shouldRender(undefined);

    expect(result).toBe(false);
  });

  it('should return false when `null` is passed', () => {
    const result = shouldRender(null);

    expect(result).toBe(false);
  });

  it('should return true when a numeral 0 is passed', () => {
    const result = shouldRender(0);

    expect(result).toBe(true);
  });

  it('should return false when an empty string is passed', () => {
    const result = shouldRender('');

    expect(result).toBe(false);
  });
});
