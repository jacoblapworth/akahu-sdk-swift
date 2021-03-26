import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIStatefulPicklist, { findNextItem, findPreviousItem } from '../XUIStatefulPicklist';
import XUIPickitem from '../XUIPickitem';
import XUIPicklist from '../XUIPicklist';
import div from './helpers/container';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

let wrapper;

describe('<XUIStatefulPicklist /> Accessibility Testing', () => {
  it.skip('should pass accessibility testing', async () => {
    wrapper = mount(
      <XUIStatefulPicklist>
        <XUIPicklist>
          <XUIPickitem id="item1">Example Item 1</XUIPickitem>
          <XUIPickitem id="item2">Example Item 2</XUIPickitem>
          <XUIPickitem id="item3">Example Item 3</XUIPickitem>
          <XUIPickitem id="item4">Example Item 4</XUIPickitem>
        </XUIPicklist>
      </XUIStatefulPicklist>,
    );
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});

describe('</XUIStatefulPicklist /> API Methods', () => {
  describe('Multiple Items', () => {
    beforeEach(() => {
      wrapper = mount(
        <XUIStatefulPicklist>
          <XUIPicklist>
            <XUIPickitem id="item1">Item 1</XUIPickitem>
            <XUIPickitem id="item2">Item 2</XUIPickitem>
            <XUIPickitem id="item3">Item 3</XUIPickitem>
            <XUIPickitem id="item4">Item 4</XUIPickitem>
          </XUIPicklist>
          <XUIPicklist>
            <XUIPickitem id="anotheritem1">Another Item 1</XUIPickitem>
            <XUIPickitem id="anotheritem2">Another Item 2</XUIPickitem>
            <XUIPickitem id="anotheritem3">Another Item 3</XUIPickitem>
            <XUIPickitem id="anotheritem4">Another Item 4</XUIPickitem>
          </XUIPicklist>
        </XUIStatefulPicklist>,
      );
    });

    it('finds an item by id', () => {
      const item3 = wrapper.find(XUIPickitem).at(2);

      expect(item3.props().id).toEqual('item3');
    });

    it('finds the next item in the list', () => {
      const list = wrapper.instance().list.current;
      const item3 = wrapper.instance().findItemById('item3');

      const nextItem = findNextItem(list, item3);

      expect(nextItem.props.id).toEqual('item4');
    });

    it('finds the first item in the list when we are at the bottom of the list to loop', () => {
      const list = wrapper.instance();
      const anotherItem4 = wrapper.instance().findItemById('anotheritem4');

      const nextItem = findNextItem(list, anotherItem4);

      expect(nextItem.props.id).toEqual('item1');
    });

    it('finds the last item in the list when we are at the top of the list to loop', () => {
      const list = wrapper.instance().list.current;
      const item1 = wrapper.instance().findItemById('item1');

      const nextItem = findPreviousItem(list, item1);

      expect(nextItem.props.id).toEqual('anotheritem4');
    });

    it('finds the previous item in the list', () => {
      const list = wrapper.instance().list.current;
      const item3 = wrapper.instance().findItemById('item3');

      const prevItem = findPreviousItem(list, item3);

      expect(prevItem.props.id).toEqual('item2');
    });

    it('changes the state when highlighting the next item', () => {
      const item3 = wrapper.instance().findItemById('item3');

      wrapper.instance().highlightNext(item3);

      expect(wrapper.state().highlightedElement.props.id).toEqual('item4');
    });

    it('changes the state when highlighting the previous item', () => {
      const item3 = wrapper.instance().findItemById('item3');

      wrapper.instance().highlightPrevious(item3);

      expect(wrapper.state().highlightedElement.props.id).toEqual('item2');
    });

    it('changes the state when highlighting the first item', () => {
      const item3 = wrapper.instance().findItemById('item3');

      wrapper.instance().highlightItem(item3);
      wrapper.instance().highlightFirst();

      expect(wrapper.state().highlightedElement.props.id).toEqual('item1');
    });

    it('gets the highlighted item when getHighlighted is called', () => {
      // Arrange
      const item3 = wrapper.instance().findItemById('item3');
      wrapper.instance().highlightItem(item3);

      // Act
      const highlighted = wrapper.instance().getHighlighted();

      // Assert
      expect(highlighted).toEqual(item3);
    });

    it('gets the highlighted item ID when getHighlightedId is called', () => {
      // Arrange
      const item3 = wrapper.instance().findItemById('item3');
      wrapper.instance().highlightItem(item3);

      // Act
      const highlightedId = wrapper.instance().getHighlightedId();

      // Assert
      expect(highlightedId).toEqual('item3');
    });

    it('clears the highlighted item from state when clearHighlightedItem method is called', () => {
      const splWrapper = mount(
        <XUIStatefulPicklist shouldManageInitialHighlight={false}>
          <XUIPicklist>
            <XUIPickitem id="item1">Item 1</XUIPickitem>
            <XUIPickitem id="item2">Item 2</XUIPickitem>
            <XUIPickitem id="item3">Item 3</XUIPickitem>
            <XUIPickitem id="item4">Item 4</XUIPickitem>
          </XUIPicklist>
          <XUIPicklist>
            <XUIPickitem id="anotheritem1">Another Item 1</XUIPickitem>
            <XUIPickitem id="anotheritem2">Another Item 2</XUIPickitem>
            <XUIPickitem id="anotheritem3">Another Item 3</XUIPickitem>
            <XUIPickitem id="anotheritem4">Another Item 4</XUIPickitem>
          </XUIPicklist>
        </XUIStatefulPicklist>,
      );

      const item3 = splWrapper.instance().findItemById('item3');

      splWrapper.instance().highlightItem(item3);
      splWrapper.instance().clearHighlightedItem();

      expect(splWrapper.state().highlightedElement).toEqual(null);
    });
  });
});

describe('</XUIStatefulPicklist /> Interactions', () => {
  let wrapper;
  let onClickHandlerMock;

  beforeEach(() => {
    onClickHandlerMock = jest.fn();
    XUIStatefulPicklist.prototype.onClick = onClickHandlerMock;
    wrapper = mount(
      <XUIStatefulPicklist className="SPL">
        <XUIPicklist>
          <XUIPickitem id="item1" className="item">
            Example Item
          </XUIPickitem>
          <XUIPickitem id="item2" className="item2">
            Example Item 2
          </XUIPickitem>
          <XUIPickitem id="item3" className="item3">
            Example Item 3
          </XUIPickitem>
          <XUIPickitem id="item4" className="item4">
            Example Item 4
          </XUIPickitem>
        </XUIPicklist>
      </XUIStatefulPicklist>,
    );
  });

  it('has an initial hoveredElement state of null', () => {
    expect(wrapper.state('highlightedElement')).toEqual(null);
  });

  it('items have an id', () => {
    const items = div.getElementsByClassName('xui-pickitem');
    [].forEach.call(items, item => expect(item.id).toBeDefined());
  });

  it('highlights an option on mouseover', () => {
    // Arrange
    const item1 = wrapper.instance().findItemById('item1');

    // Act
    item1.props.onMouseOver();

    // Assert
    expect(wrapper.state('highlightedElement')).toBe(item1);
  });

  it('calls the on click handler when an item is clicked on', () => {
    // Arrange
    const item1 = wrapper.instance().findItemById('item1');

    // Act
    item1.props.onClick();

    // Assert
    expect(onClickHandlerMock).toBeCalled();
  });
});
