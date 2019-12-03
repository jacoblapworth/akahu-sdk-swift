<div class="xui-margin-vertical">
    <a href="../section-components-displayingdata-accordion.html" isDocLink>Accordion in the XUI Documentation</a>
</div>

Accordions are used to display a vertically expandable & collapsible list that reveals and hides additional content

The _Accordion_ is broken up into two key components `import XUIAccordion, { XUIAccordionItem } from '@xero/xui/react/accordion';`.

## Basic

The bare minimum _Accordion_ composition can be achieved with a `XUIAccordion` component with `XUIAccordionItem`s as children and `toggleLabel` props.

We also still allow the previous API which the `items` and `createItem` props.

- `items` is an array of objects to pass to `createItem` as props.
- `createItem` takes a single item from `items` and returns a `<XUIAccordionItem>`
- `toggleLabel` is an accessibility label for the accordion trigger.

```jsx harmony
import XUIAccordion, { XUIAccordionItem } from './accordion';

const items = [
  { id: 1, name: 'John Smith', content: 'Accountant' },
  { id: 2, name: 'Barry Allen', content: 'Bookkeeper' },
  { id: 3, name: 'Ernest Hemmingway' }
];

const BasicAccordionDemo = () => (
  <XUIAccordion toggleLabel="Toggle" emptyMessage="Nothing available to show">
    {items.map(({ id, name, content }) => (
      <XUIAccordionItem key={id} primaryHeading={name} toggleLabel="Toggle">
        {content && (
          <div className="xui-padding-horizontal-large xui-padding-vertical-4xlarge">{content}</div>
        )}
      </XUIAccordionItem>
    ))}
  </XUIAccordion>
);

<BasicAccordionDemo />;
```

## Accordion Item

The `<XUIAccordionItem />` can take a variety of props that can inject content into the layout (`primaryHeading`, `secondaryHeading`, `leftContent`, `pinnedValue`, `action`, `overflow`, `custom`).

You can also supply an `onItemClick` prop that returns the entire item from the items array in addition to an `isOpen` boolean representing the items toggled state.

**Note:** if you are adding a `<button />` type element as content remember to [`stopPropagation`](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) so the event does not bubble up and trigger the _Accordion_ _expand_ / _collapse_ toggle accidentally.

```jsx harmony
import XUIAccordion, { XUIAccordionItem } from './accordion';

const itemStyle = {
  background: 'lightgray',
  border: '1px solid darkgray',
  padding: '4px',
  outline: '1px solid gray'
};

<XUIAccordion toggleLabel="Toggle" emptyMessage="Nothing available to show">
  <XUIAccordionItem
    primaryHeading={<div style={itemStyle}>Primary Heading</div>}
    secondaryHeading={<div style={itemStyle}>Secondary Heading</div>}
    description={<span style={itemStyle}>Description</span>}
    leftContent={<div style={itemStyle}>Left Content</div>}
    pinnedValue={<div style={itemStyle}>Pinned Value</div>}
    action={<div style={itemStyle}>Action</div>}
    overflow={<div style={itemStyle}>Overflow</div>}
    custom={<div style={itemStyle}>Custom Content</div>}
  />
</XUIAccordion>;
```

## Empty State

If no `children` content is supplied to a `<XUIAccordionItem />` then the _empty state_ component will be rendered instead.

An `emptyMessage` should be supplied to `<XUIAccordionItem />` to be used when there are no `children` to render.

The default icon for the empty state can be overridden with the `emptyIcon` prop.

You can also replace the entire empty state component by providing your own `emptyStateComponent`.

```jsx harmony
import starIcon from '@xero/xui-icon/icons/star';

import XUIAccordion, { XUIAccordionItem } from './accordion';

<div>
  <XUIAccordion
    className="xui-margin-bottom-large"
    toggleLabel="Toggle"
    emptyMessage="Nothing available to show"
  >
    <XUIAccordionItem primaryHeading="Default empty state" />
  </XUIAccordion>
  <XUIAccordion
    className="xui-margin-bottom-large"
    emptyIcon={starIcon}
    emptyMessage="Custom empty state message"
    toggleLabel="Toggle"
  >
    <XUIAccordionItem primaryHeading="Custom empty state" />
  </XUIAccordion>
  <XUIAccordion
    emptyStateComponent={
      <div
        className="xui-heading xui-textcolor-inverted xui-padding-vertical-large xui-text-align-center"
        style={{ background: 'darkgray' }}
      >
        Replace empty state component
      </div>
    }
    toggleLabel="Toggle"
  >
    <XUIAccordionItem primaryHeading="Replace empty state" />
  </XUIAccordion>
</div>;
```

## Example

You can nest other XUI components inside the `<XUIAccordionItem />` _(such as `<XUIContentBlock />`)_ to create robust compositions.

```jsx harmony
import overflowIcon from '@xero/xui-icon/icons/overflow';

import { XUIContentBlock, XUIContentBlockItem } from './contentblock';
import XUIAccordion, { XUIAccordionItem } from './accordion';
import XUIAvatar from './avatar';
import XUIButton, { XUIIconButton } from './button';
import { isKeyClick } from './helpers/reactKeyHandler';

const items = [
  {
    name: 'John Smith',
    contacts: [
      { contact: 'Peggy Olsen', minutes: '00:20' },
      { contact: 'Pete Campbell', minutes: '15:30' }
    ]
  }
];
const makeInteraction = (event, callback) => {
  if (event.type === 'click' || isKeyClick(event)) {
    callback();
  }
};

const DemoItem = function({ name, contacts, handleOptionsInteraction, handleUpdateInteraction }) {
  return (
    <XUIAccordionItem
      primaryHeading={name}
      leftContent={<XUIAvatar value={name} className="xui-margin-right-small" />}
      overflow={
        <XUIIconButton
          icon={overflowIcon}
          ariaLabel="Overflow menu"
          title="Overflow menu"
          onKeyDown={handleOptionsInteraction}
          onClick={handleOptionsInteraction}
        />
      }
      action={
        <XUIButton
          size="small"
          className="xui-margin-right-small"
          onKeyDown={handleUpdateInteraction}
          onClick={handleUpdateInteraction}
        >
          Update
        </XUIButton>
      }
    >
      <XUIContentBlock>
        {contacts.map(({ contact, minutes }) => (
          <XUIContentBlockItem
            key={contact}
            primaryHeading={contact}
            pinnedValue={minutes}
            href="#"
          />
        ))}
      </XUIContentBlock>
    </XUIAccordionItem>
  );
};

class Demo extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleUpdateInteraction = this.handleUpdateInteraction.bind(this);
    this.handleOptionsInteraction = this.handleOptionsInteraction.bind(this);
  }

  handleUpdateInteraction(event) {
    event.stopPropagation();
    console.log('Clicked update button');
  }

  handleOptionsInteraction(event) {
    event.stopPropagation();
    console.log('Clicked options button');
  }

  render() {
    return (
      <XUIAccordion idKey="name" toggleLabel="Toggle" emptyMessage="Nothing available to show">
        {items.map(item => (
          <DemoItem
            {...item}
            key={item.name}
            handleUpdateInteraction={this.handleUpdateInteraction}
            handleOptionsInteraction={this.handleOptionsInteraction}
          />
        ))}
      </XUIAccordion>
    );
  }
}

<Demo />;
```
