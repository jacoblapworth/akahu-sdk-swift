import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import renderer from 'react-test-renderer';
import { nanoid } from 'nanoid';
import PickitemMultiselect from '../private/PickitemMultiselect';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

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

  it.skip('should pass accessibility testing', async () => {
    const wrapper = mount(<PickitemMultiselect>Item</PickitemMultiselect>);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
