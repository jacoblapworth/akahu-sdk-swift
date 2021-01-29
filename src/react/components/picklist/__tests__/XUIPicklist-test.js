import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { nanoid } from 'nanoid';
import XUIPicklist from '../XUIPicklist';
import XUIPickitem from '../XUIPickitem';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testPickitemCheckboxId');

const setup = (props = {}, itemProps = {}) => {
  const expected = renderer.create(
    <XUIPicklist {...props}>
      <XUIPickitem primaryElement="Item content" id="pi1" {...itemProps} />
    </XUIPicklist>,
  );

  return expected;
};

describe('< Picklist />', () => {
  it('renders most basic example', () => {
    const basic = setup();
    expect(basic).toMatchSnapshot();
  });

  it('example with most compatible options', () => {
    const settings = {
      className: 'custom-picklist-class',
      id: 'picklistId',
      isHorizontal: true,
      defaultLayout: false,
      shouldTruncate: true,
      secondaryProps: { role: 'presentation' },
      qaHook: 'picklist-example',
    };
    const mostOptions = setup(settings);
    expect(mostOptions).toMatchSnapshot();
  });

  it('example of list settings overriding item-level settings', () => {
    const settings = {
      isMultiselect: false,
      shouldTruncate: true,
    };
    const itemProps = {
      isMultiselect: true,
    };
    const overrides = setup(settings, itemProps);
    expect(overrides).toMatchSnapshot();
  });

  it('example taking settings from first child and giving to all', () => {
    const fromItems = renderer.create(
      <XUIPicklist>
        <XUIPickitem primaryElement="Item content" id="pi1" isMultiselect={true} />
        <XUIPickitem primaryElement="Item two" id="pi2" />
      </XUIPicklist>,
    );
    expect(fromItems).toMatchSnapshot();
  });
});
