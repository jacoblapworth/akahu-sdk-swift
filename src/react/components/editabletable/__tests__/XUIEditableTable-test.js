import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import XUIEditableTable from '../XUIEditableTable';

Enzyme.configure({ adapter: new Adapter() });

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

  it('render with the caption', () => {
    const wrapper = shallow(<XUIEditableTable caption="An editable table" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  describe('validation message', () => {
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
