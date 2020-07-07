Nested picklists are similar to a collapsable menu inside of the main list. To construct one, define your `XUINestedPicklist`(s) inside of a `XUINestedPicklistContainer`. The container acts as a wrapper for the lists and should also contain the `XUINestedPicklistTrigger`. This renders a button in either a nested or split style. Please see the basic example below of how to piece these components together.

##### Uncontrolled

By default, if you do not specify an `isOpen` prop in `XUINestedPicklistContainer`, the component will be initialised as a fully uncontrolled component. If you need to pass a default open value, please pass this as a `isDefaultOpen` prop.

```jsx harmony
import XUIPicklist, {
  XUIStatefulPicklist,
  XUIPickitem,
  XUINestedPicklist,
  XUINestedPicklistContainer,
  XUINestedPicklistTrigger
} from '@xero/xui/react/picklist';

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
      <XUIStatefulPicklist onSelect={this.onOptionSelect} canFocus>
        <XUIPicklist>
          <XUINestedPicklistContainer id="nested">
            <XUINestedPicklistTrigger
              ariaLabel="Toggle submenu"
              id="nestedTrigger"
              ref={smp.trigger}
            >
              Nested List
            </XUINestedPicklistTrigger>
            <XUINestedPicklist>
              <XUIPickitem ariaRole="treeitem" id="a" isSelected={smp.state.selectedItems.a}>
                A
              </XUIPickitem>
              <XUIPickitem ariaRole="treeitem" id="b" isSelected={smp.state.selectedItems.b}>
                B
              </XUIPickitem>
              <XUIPickitem ariaRole="treeitem" id="c" isSelected={smp.state.selectedItems.c}>
                C
              </XUIPickitem>
              <XUIPickitem ariaRole="treeitem" id="d" isSelected={smp.state.selectedItems.d}>
                D
              </XUIPickitem>
            </XUINestedPicklist>
          </XUINestedPicklistContainer>
          <XUINestedPicklistContainer id="splitPicklistContainer">
            <XUIPickitem
              id="splitTrigger"
              isSplit
              isSelected={smp.state.selectedItems.splitTrigger}
            >
              Split Trigger Item
            </XUIPickitem>
            <XUINestedPicklistTrigger ariaLabel="Toggle submenu" id="nestedSplit" />
            <XUINestedPicklist>
              <XUIPickitem ariaRole="treeitem" id="aa" isSelected={smp.state.selectedItems.aa}>
                aa
              </XUIPickitem>
              <XUIPickitem ariaRole="treeitem" id="bb" isSelected={smp.state.selectedItems.bb}>
                bb
              </XUIPickitem>
              <XUIPickitem ariaRole="treeitem" id="cc" isSelected={smp.state.selectedItems.cc}>
                cc
              </XUIPickitem>
              <XUIPickitem ariaRole="treeitem" id="dd" isSelected={smp.state.selectedItems.dd}>
                dd
              </XUIPickitem>
            </XUINestedPicklist>
          </XUINestedPicklistContainer>
        </XUIPicklist>
      </XUIStatefulPicklist>
    );
  }
}
<StatefulMultiselectPicklist />;
```

##### Controlled

To use the `XUINestedPicklistContainer` as a fully controlled component you can do so by providing and manipulating the `isOpen` prop.

If you pass in an `isOpen` prop and use this as a controlled component, be aware that the `XUINestedPicklistContainer`'s native events will be disabled. To control the native events you should implement `onOpen` and `onClose` callbacks.

```jsx harmony
import XUIPicklist, {
  XUIStatefulPicklist,
  XUIPickitem,
  XUINestedPicklist,
  XUINestedPicklistContainer,
  XUINestedPicklistTrigger
} from '@xero/xui/react/picklist';
import XUIButton from '@xero/xui/react/button';

class StatefulMultiselectPicklist extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      selectedItems: {
        2: true
      },
      picklistOpen: true
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
      <div>
        <XUIButton onClick={() => this.setState({ picklistOpen: !this.state.picklistOpen })}>
          Toggle picklist
        </XUIButton>
        <XUIStatefulPicklist onSelect={this.onOptionSelect} canFocus>
          <XUIPicklist>
            <XUINestedPicklistContainer
              id="nested2"
              isOpen={this.state.picklistOpen}
              onOpen={() => this.setState({ picklistOpen: true })}
              onClose={() => this.setState({ picklistOpen: false })}
            >
              <XUINestedPicklistTrigger
                ariaLabel="Toggle submenu"
                id="nestedTrigger"
                ref={smp.trigger}
              >
                Nested List
              </XUINestedPicklistTrigger>
              <XUINestedPicklist>
                <XUIPickitem ariaRole="treeitem" id="a" isSelected={smp.state.selectedItems.a}>
                  A
                </XUIPickitem>
                <XUIPickitem ariaRole="treeitem" id="b" isSelected={smp.state.selectedItems.b}>
                  B
                </XUIPickitem>
                <XUIPickitem ariaRole="treeitem" id="c" isSelected={smp.state.selectedItems.c}>
                  C
                </XUIPickitem>
                <XUIPickitem ariaRole="treeitem" id="d" isSelected={smp.state.selectedItems.d}>
                  D
                </XUIPickitem>
              </XUINestedPicklist>
            </XUINestedPicklistContainer>
          </XUIPicklist>
        </XUIStatefulPicklist>
      </div>
    );
  }
}
<StatefulMultiselectPicklist />;
```

For more information about the functionality of the lists such as keyboard handling, selected and highlighted state management please see the [stateful picklist section above](#stateful-picklist).
