import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import XUIEditableTableFootAction from '../XUIEditableTableFootAction';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIEditableTableFootAction />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<XUIEditableTableFootAction addButtonContent="test button" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('composes the className correctly', () => {
    const wrapper = shallow(
      <XUIEditableTableFootAction addButtonContent="test button" className="test-classname" />,
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should call the onAdd callback when the add button is clicked', () => {
    const onAddMock = jest.fn();
    const wrapper = mount(
      <table>
        <tfoot>
          <XUIEditableTableFootAction
            addButtonContent="test button"
            qaHook="test-footaction"
            onAdd={onAddMock}
          />
        </tfoot>
      </table>,
    );

    wrapper.find('[data-automationid="test-footaction--addbutton"]').simulate('click');
    expect(onAddMock).toBeCalled();
  });
});
