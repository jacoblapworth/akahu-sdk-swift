import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import EditableTableWrapper from '../private/EditableTableWrapper';
import NOOP from '../../helpers/noop';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('uuid/v4', () => jest.fn(() => '123'));

describe('EditableTableWrapper', () => {
  it('renders correctly', () => {
    expect(
      toJson(mount(<EditableTableWrapper onDragEnd={NOOP} tableRef={{}} />)),
    ).toMatchSnapshot();
  });
});
