import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';
import PickitemMultiselect from '../private/PickitemMultiselect';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('nanoid');
nanoid.mockImplementation(() => 'testPickitemCheckboxId');

describe('<PickitemMultiselect />', () => {
  it('basic example', () => {
    const basic = renderer.create(<PickitemMultiselect>Item</PickitemMultiselect>);
    expect(basic).toMatchSnapshot();
  });

  it('is selected, adds truncation and custom classes', () => {
    const truncation = renderer.create(
      <PickitemMultiselect checkboxClassName="custom-checkbox" isSelected shouldTruncate>
        Item
      </PickitemMultiselect>,
    );
    expect(truncation).toMatchSnapshot();
  });
});
