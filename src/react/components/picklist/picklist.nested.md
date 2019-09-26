Nested Picklists are similar to a collapsable menu inside of the main list. To construct one, define your `NestedPicklist`(s) inside of a `NestedPicklistContainer`. The container acts as a wrapper for the lists and should also contain the `NestedPicklistTrigger`. This renders a button in either a nested or split style. Please see the basic example below of how to piece these components together.

For more information about the functionality of the lists such as keyboard handling, selected and highlighted state management please see the [`StatefulPicklist` section above](#stateful-picklist).

```jsx harmony
import Picklist, {
  StatefulPicklist,
  Pickitem,
  NestedPicklist,
  NestedPicklistContainer,
  NestedPicklistTrigger
} from '../../picklist';

class StatefulMultiselectPicklist extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedItems: {
        2: true
      }
    };

    this.onOptionSelect = this.onOptionSelect.bind(this);
    this.trigger = React.createRef();
  }

  onOptionSelect(value, item) {
    const smp = this;

    smp.setState(prevState => {
      return {
        selectedItems: {
          ...prevState.selectedItems,
          [item.props.id]: !prevState.selectedItems[item.props.id]
        }
      };
    });
  }

  render() {
    const smp = this;

    return (
      <StatefulPicklist onSelect={this.onOptionSelect} canFocus>
        <Picklist>
          <NestedPicklistContainer id="nested">
            <NestedPicklistTrigger id="nestedTrigger" ref={smp.trigger}>
              Nested List
            </NestedPicklistTrigger>
            <NestedPicklist>
              <Pickitem ariaRole="treeitem" id="a" isSelected={smp.state.selectedItems.a}>
                A
              </Pickitem>
              <Pickitem ariaRole="treeitem" id="b" isSelected={smp.state.selectedItems.b}>
                B
              </Pickitem>
              <Pickitem ariaRole="treeitem" id="c" isSelected={smp.state.selectedItems.c}>
                C
              </Pickitem>
              <Pickitem ariaRole="treeitem" id="d" isSelected={smp.state.selectedItems.d}>
                D
              </Pickitem>
            </NestedPicklist>
          </NestedPicklistContainer>
          <NestedPicklistContainer id="splitPicklistContainer">
            <Pickitem id="splitTrigger" isSplit isSelected={smp.state.selectedItems.splitTrigger}>
              Split Trigger Item
            </Pickitem>
            <NestedPicklistTrigger id="nestedSplit" />
            <NestedPicklist>
              <Pickitem ariaRole="treeitem" id="aa" isSelected={smp.state.selectedItems.aa}>
                aa
              </Pickitem>
              <Pickitem ariaRole="treeitem" id="bb" isSelected={smp.state.selectedItems.bb}>
                bb
              </Pickitem>
              <Pickitem ariaRole="treeitem" id="cc" isSelected={smp.state.selectedItems.cc}>
                cc
              </Pickitem>
              <Pickitem ariaRole="treeitem" id="dd" isSelected={smp.state.selectedItems.dd}>
                dd
              </Pickitem>
            </NestedPicklist>
          </NestedPicklistContainer>
        </Picklist>
      </StatefulPicklist>
    );
  }
}
<StatefulMultiselectPicklist />;
```
