import { getAvatarColorClass, abbreviateAvatar } from '../utils';

describe('XUIAvatar Private Functions', () => {
  describe('Abbreviating Avatar Names', () => {
    it('should throw an error if we pass nothing', () => {
      function a() {
        return abbreviateAvatar();
      }
      expect(a).toThrowError('Please provide a name');
    });

    it('should return A for strings like "Alpha" and one expect', () => {
      expect(abbreviateAvatar('Alpha', 1)).toBe('A');
    });

    it('should return A for strings like "Alpha" and 2 expects', () => {
      expect(abbreviateAvatar('Alpha', 2)).toBe('A');
    });

    it('should return AB for strings like "Alpha Bravo"', () => {
      expect(abbreviateAvatar('Alpha Bravo', 2)).toBe('AB');
    });

    it('should return AB for strings like "Alpha Bravo" and 3 expects', () => {
      expect(abbreviateAvatar('Alpha Bravo', 3)).toBe('AB');
    });

    it('should return ABC for strings like "Alpha Bravo Charlie" and 3 expects', () => {
      expect(abbreviateAvatar('Alpha Bravo Charlie', 3)).toBe('ABC');
    });

    it('should return correct abbreviations for strings with beginning with non-whitespace characters', () => {
      expect(abbreviateAvatar(' \t\nDonald Duck Trump', 2)).toBe('DD');
    });

    it('should return values starting with a unicode astral symbol correctly', () => {
      expect(abbreviateAvatar('💩 Pile of Poo', 2)).toBe('💩P');
    });

    it('should abbreviate to non-spaces, non-brace characters with values containing leading spaces or words surrounded in braces of various kinds', () => {
      expect(abbreviateAvatar('  [This] (Long) {Company} Name', 3)).toBe('TLC');
    });

    it('should preserve non-western alpha characters', () => {
      expect(abbreviateAvatar('中国铁路总公司', 3)).toBe('中');
    });

    it('should ignore certain punctuation', () => {
      expect(abbreviateAvatar('Jimmy\' + Friend & "<Sons> . _Home', 7)).toBe('JFSH');
    });

    it('should uppercase all letters provided', () => {
      expect(abbreviateAvatar('uppercased names', 2)).toBe('UN');
    });
  });

  describe('Getting colour class names', () => {
    it('should throw an error if we pass nothing', () => {
      function a() {
        return getAvatarColorClass();
      }
      expect(a).toThrowError('Please provide a string of length greater than 0');
    });

    it('should throw an error if we pass something other than a string', () => {
      function a() {
        return getAvatarColorClass([]);
      }
      expect(a).toThrowError('Please provide a string of length greater than 0');
    });

    it('should return a class if we pass in a string', () => {
      expect(getAvatarColorClass('test')).toBe('xui-avatar-color-6');
    });
  });
});
