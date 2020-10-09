import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { v4 as uuidv4 } from 'uuid';

import XUIEditableTable from '../XUIEditableTable';
import { tableName } from '../private/constants';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('uuid');
const mockedUuid = 'testGeneratedId';
uuidv4.mockImplementation(() => mockedUuid);

describe('<XUIEditableTable />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTable>
        <div>XUIEditableTable</div>
      </XUIEditableTable>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className and passed an id correctly', () => {
    const wrapper = shallow(<XUIEditableTable className="test-classname" id="test-id" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders the ariaLabel correctly', () => {
    const wrapper = shallow(<XUIEditableTable ariaLabel="An editable table" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders a style element, when hiddenColumns are passed', () => {
    const wrapper = mount(<XUIEditableTable hiddenColumns={[1]} />);
    expect(wrapper.find('style')).toHaveLength(1);
  });

  it('renders rules to hide the proper columns, when hiddenColumns are passed', () => {
    const wrapper = mount(<XUIEditableTable hiddenColumns={[1, 2]} />);
    expect(wrapper.text()).toContain(
      `#${tableName}-${mockedUuid} .xui-editabletablerow > *:nth-child(2) { display: none; }`,
    );
    expect(wrapper.text()).toContain(
      `#${tableName}-${mockedUuid} .xui-editabletablerow > *:nth-child(3) { display: none; }`,
    );
  });

  describe('validation message', () => {
    it('renders correctly when the table is invalid and there is a validation message', () => {
      const wrapper = shallow(<XUIEditableTable isInvalid validationMessage="Error message" />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('renders when the table is invalid and there is a validation message', () => {
      const wrapper = mount(<XUIEditableTable isInvalid validationMessage="Error message" />);

      expect(wrapper.text()).toContain('Error message');
    });

    it('does not render if there is no validation message', () => {
      const wrapper = mount(<XUIEditableTable isInvalid />);

      expect(wrapper.find('.xui-editabletable--validation')).toHaveLength(0);
    });

    it('does not mount if the table is valid', () => {
      const wrapper = mount(<XUIEditableTable validationMessage="Error message" />);

      expect(wrapper.text()).not.toContain('Error message');
    });
  });
});
