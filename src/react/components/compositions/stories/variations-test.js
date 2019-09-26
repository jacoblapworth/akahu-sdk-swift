import { variations } from './variations';

it('Composition variations are generated correctly', () => {
  expect(variations).toMatchSnapshot();
});
