import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { v4 as uuidv4 } from 'uuid';

import DragDropProvider from '../private/DragAndDrop/DragDropProvider';
import EditableTableOverflow from '../private/EditableTableOverflow';
import EditableTableWrapper from '../private/EditableTableWrapper';

import NOOP from '../../helpers/noop';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('uuid');
uuidv4.mockImplementation(() => '123');

describe('EditableTableWrapper', () => {
  it('renders correctly', () => {
    expect(
      toJson(mount(<EditableTableWrapper onDragEnd={NOOP} tableRef={{}} />)),
    ).toMatchSnapshot();
  });

  describe('onDragEnd', () => {
    const onReorderRowMock = jest.fn();
    const wrapper = mount(<EditableTableWrapper onReorderRow={onReorderRowMock} tableRef={{}} />);
    const provider = wrapper.find(DragDropProvider);

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('calls `onReorderRow` correctly when a row is dropped in another location', () => {
      const result = {
        source: {
          index: 1,
        },
        destination: {
          index: 2,
        },
      };

      provider.prop('onDragEnd')(result);

      expect(onReorderRowMock).toHaveBeenCalledWith(result.source.index, result.destination.index);
    });
    it('calls `onReorderRow` correctly when a row is dropped on itself', () => {
      const result = {
        source: {
          index: 1,
        },
        destination: {
          index: 1,
        },
      };

      provider.prop('onDragEnd')(result);

      expect(onReorderRowMock).toHaveBeenCalledWith(result.source.index, result.destination.index);
    });
    it('does not call `onReorderRow` when a row is dropped incorrectly', () => {
      const result = {
        source: {
          index: 1,
        },
      };

      provider.prop('onDragEnd')(result);

      expect(onReorderRowMock).toHaveBeenCalledTimes(0);
    });
  });

  describe('wrapperStyle', () => {
    it('passes the correct size props to <EditableTableOverflow />', () => {
      const style = {
        maxWidth: '1000',
        minWidth: '300',
      };
      const wrapper = mount(
        <EditableTableWrapper maxWidth={style.maxWidth} minWidth={style.minWidth} tableRef={{}} />,
      );
      const actual = wrapper.find(EditableTableOverflow).prop('style');

      expect(actual).toEqual(style);
    });
  });
});
