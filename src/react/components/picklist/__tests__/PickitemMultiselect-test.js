import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import PickitemMultiselect from '../private/PickitemMultiselect';
import { v4 as uuidv4 } from 'uuid';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('uuid');
uuidv4.mockImplementation(() => 'testPickitemCheckboxId');

describe('<PickitemMultiselect />', () => {
  it('basic example', () => {
    const basic = renderer.create(<PickitemMultiselect>Item</PickitemMultiselect>);
    expect(basic).toMatchSnapshot();
  });

  it('is selected, adds truncation and custom classes', () => {
    const truncation = renderer.create(
      <PickitemMultiselect shouldTruncate isSelected checkboxClassName="custom-checkbox">
        Item
      </PickitemMultiselect>,
    );
    expect(truncation).toMatchSnapshot();
  });
});
