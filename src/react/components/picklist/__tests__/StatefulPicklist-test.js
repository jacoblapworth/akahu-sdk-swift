import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StatefulPicklist, { findNextItem, findPreviousItem } from '../StatefulPicklist';
import Pickitem from '../Pickitem';
import Picklist from '../Picklist';
import div from './helpers/container';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

describe('<StatefulPicklist /> API Methods', () => {
  describe('Multiple Items', () => {
    beforeEach(() => {
      wrapper = mount(
        <StatefulPicklist>
          <Picklist>
            <Pickitem id="item1">Item 1</Pickitem>
            <Pickitem id="item2">Item 2</Pickitem>
            <Pickitem id="item3">Item 3</Pickitem>
            <Pickitem id="item4">Item 4</Pickitem>
          </Picklist>
          <Picklist>
            <Pickitem id="anotheritem1">Another Item 1</Pickitem>
            <Pickitem id="anotheritem2">Another Item 2</Pickitem>
            <Pickitem id="anotheritem3">Another Item 3</Pickitem>
            <Pickitem id="anotheritem4">Another Item 4</Pickitem>
          </Picklist>
        </StatefulPicklist>,
      );
    });

    it('finds an item by id', () => {
      const item3 = wrapper.find(Pickitem).at(2);

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
  });
});

describe('<StatefulPicklist /> Interactions', () => {
  let wrapper;
  let onClickHandlerMock;

  beforeEach(() => {
    onClickHandlerMock = jest.fn();
    StatefulPicklist.prototype.onClick = onClickHandlerMock;
    wrapper = mount(
      <StatefulPicklist className="SPL">
        <Picklist>
          <Pickitem id="item1" className="item">
            Example Item
          </Pickitem>
          <Pickitem id="item2" className="item2">
            Example Item 2
          </Pickitem>
          <Pickitem id="item3" className="item3">
            Example Item 3
          </Pickitem>
          <Pickitem id="item4" className="item4">
            Example Item 4
          </Pickitem>
        </Picklist>
      </StatefulPicklist>,
      { attachTo: div },
    );
  });

  it('has an initial hoveredElement state of null', () => {
    expect(wrapper.state('highlightedElement')).toEqual(null);
  });

  it('items have an id', () => {
    const items = div.getElementsByClassName('xui-pickitem');
    [].forEach.call(items, item => expect(item.id).toBeDefined());
  });

  /*
	So, I've tried to get these working.  It seems the that React test utils doesn't like working with cloned element,
	which is what we do inside the StatefulPicklist's render method.  I also tried manually dispatching events in the
	DOM, but that didn't work.  Therefore, skipping....

	@dev-johnsanders 29 Nov 2016
	 */
  it.skip('highlights an option on mouseover', () => {
    let item = wrapper.find('Pickitem').last();
    item.simulate('mouseOver');

    expect(item.hasClass('xui-pickitem-is-hovered')).toBeTruthy();
    expect(wrapper.state('highlightedElement').type).toEqual(Pickitem);
  });

  it.skip('calls the on click handler when an item is clicked on', () => {
    const item = wrapper.find('Pickitem').last();

    item.simulate('click');

    expect(onClickHandlerMock.calls.length).toBeGreaterThan(0);
  });
});
