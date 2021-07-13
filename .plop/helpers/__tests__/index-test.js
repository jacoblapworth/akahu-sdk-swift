import { pathCase, xuiCase } from '../index';

describe('[helpers]', () => {
  describe('pathCase', () => {
    it('passes through a string correctly', () => {
      const displayName = 'hello';

      expect(pathCase(displayName)).toEqual('hello');
    });

    it('smashes case correctly', () => {
      const displayName = 'HeLlOwOrLd';

      expect(pathCase(displayName)).toEqual('helloworld');
    });

    it('converts a space-separated string correctly', () => {
      const displayName = 'Hello world';

      expect(pathCase(displayName)).toEqual('helloworld');
    });

    it('converts a hyphen-separated string correctly', () => {
      const displayName = 'Hello-world';

      expect(pathCase(displayName)).toEqual('helloworld');
    });
  });

  describe('xuiCase', () => {
    it('passes through a string correctly', () => {
      const displayName = 'hello';

      expect(xuiCase(displayName)).toEqual('XUIHello');
    });

    it('smashes case correctly', () => {
      const displayName = 'HeLlOwOrLd';

      expect(xuiCase(displayName)).toEqual('XUIHelloworld');
    });

    it('converts a space-separated string correctly', () => {
      const displayName = 'Hello world';

      expect(xuiCase(displayName)).toEqual('XUIHelloWorld');
    });

    it('converts a hyphen-separated string correctly', () => {
      const displayName = 'Hello-world';

      expect(xuiCase(displayName)).toEqual('XUIHelloWorld');
    });
  });
});
