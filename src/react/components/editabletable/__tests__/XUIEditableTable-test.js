import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import uuid from 'uuid/v4';

import XUIEditableTable from '../XUIEditableTable';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('uuid/v4');
uuid.mockImplementation(() => 'testGeneratedId');

describe('<XUIEditableTable />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <XUIEditableTable>
        <div>XUIEditableTable</div>
      </XUIEditableTable>,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(<XUIEditableTable className="test-classname" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders the ariaLabel correctly', () => {
    const wrapper = shallow(<XUIEditableTable ariaLabel="An editable table" />);
    expect(toJson(wrapper)).toMatchSnapshot();
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
