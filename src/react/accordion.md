<div class="xui-margin-vertical">
    <a href="../section-components-displayingdata-accordion.html" isDocLink>Accordion in the XUI Documentation</a>
</div>

Accordions are used to display a vertically expandable & collapsible list that reveals and hides additional content

The _Accordion_ is broken up into two key components `import XUIAccordion, { XUIAccordionItem } from '@xero/xui/react/accordion';`.

## Basic

The bare minimum _Accordion_ composition can be achieved with a `XUIAccordion` component with `XUIAccordionItem`s as children and `toggleLabel` prop (an accessibility label for the accordion trigger).

```jsx harmony
import XUIAccordion, { XUIAccordionItem } from '@xero/xui/react/accordion';

<XUIAccordion toggleLabel="Toggle">
  <XUIAccordionItem
    key="cash-predictions"
    primaryHeading="How do cash predictions work in short-term cash flow?"
  >
    <div className="xui-padding-2xlarge">
      Xero analyses past reconciled spend and receive money transactions, looking for patterns and
      averages to create a cash prediction. Click on a prediction to learn more about the
      transactions that contributed to it. Xero looks at individual line items to make predictions,
      not just the full amount of a transaction.
    </div>
  </XUIAccordionItem>
</XUIAccordion>;
```

## Accordion Item

The `<XUIAccordionItem />` can take a variety of props that can inject content into the layout (`primaryHeading`, `secondaryHeading`, `leftContent`, `pinnedValue`, `action`, `overflow`).

You can also supply an `onClick` prop that returns the entire item from the items array in addition to an `isOpen` boolean representing the items toggled state.

**Note:** if you are adding a `<button />` type element as content remember to [`stopPropagation`](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation) so the event does not bubble up and trigger the _Accordion_ _expand_ / _collapse_ toggle accidentally.

```jsx harmony
import XUIAccordion, { XUIAccordionItem } from '@xero/xui/react/accordion';
import XUIAvatar from '@xero/xui/react/avatar';
import XUIButton, { XUIIconButton } from '@xero/xui/react/button';
import { XUIContentBlock, XUIContentBlockItem } from '@xero/xui/react/contentblock';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';
import overflow from '@xero/xui-icon/icons/overflow';

const handleActionClick = event => {
  event.stopPropagation();
  console.log('onClick');
};

const overflowMenu = (
  <XUIDropdownToggled
    dropdown={
      <XUIDropdown>
        <XUIPicklist>
          <XUIPickitem id="add">Add time entry</XUIPickitem>
          <XUIPickitem id="delete">Delete time entry</XUIPickitem>
        </XUIPicklist>
      </XUIDropdown>
    }
    trigger={<XUIIconButton ariaLabel="More options" icon={overflow} />}
  />
);

<XUIAccordion toggleLabel="Toggle">
  <XUIAccordionItem
    action={
      <XUIButton onClick={handleActionClick} size="small">
        View details
      </XUIButton>
    }
    description="1 project • 100% chargeable"
    leftContent={<XUIAvatar className="xui-margin-right-small" value="Rita James" />}
    overflow={overflowMenu}
    pinnedValue="30:15"
    primaryHeading="Rita James"
  >
    <XUIContentBlock>
      <XUIContentBlockItem
        href="#rite-agency"
        key="RiteAgency"
        leftContent={<XUIAvatar value="Rite Agency" variant="business" />}
        pinnedValue="30:15"
        primaryHeading="RITE Agency"
        secondaryHeading="Brand Launch Event"
        description="30:15 chargeable (100%)"
      />
    </XUIContentBlock>
  </XUIAccordionItem>
</XUIAccordion>;
```

## Empty State

If no `children` content is supplied to a `<XUIAccordionItem />` then the _empty state_ component will be rendered instead.

An `emptyMessage` should be supplied to `<XUIAccordionItem />` to be used when there are no `children` to render.

The default icon for the empty state can be overridden with the `emptyIcon` prop.

You can also replace the entire empty state component by providing your own `emptyStateComponent`.

```jsx harmony
import chart from '@xero/xui-icon/icons/chart';
import list from '@xero/xui-icon/icons/list';

import XUIAccordion, { XUIAccordionItem } from '@xero/xui/react/accordion';
import XUIAvatar from '@xero/xui/react/avatar';
import XUIButton from '@xero/xui/react/button';
import XUIIcon from '@xero/xui/react/icon';

const handleClick = event => {
  event.stopPropagation();
  console.log('onClick');
};

<div>
  <XUIAccordion
    className="xui-margin-bottom-large"
    emptyMessage="Nothing available to show"
    toggleLabel="Toggle"
  >
    <XUIAccordionItem
      action={
        <XUIButton onClick={handleClick} size="small">
          Edit details
        </XUIButton>
      }
      leftContent={<XUIAvatar className="xui-margin-right-small" value="Anne Fisher" />}
      primaryHeading="Anne Fisher"
      secondaryHeading="0 projects"
    />
  </XUIAccordion>
  <XUIAccordion
    className="xui-margin-bottom-large"
    emptyIcon={chart}
    emptyMessage="Nothing available to show"
    toggleLabel="Toggle"
  >
    <XUIAccordionItem
      action={
        <XUIButton onClick={handleClick} size="small">
          Edit details
        </XUIButton>
      }
      leftContent={<XUIAvatar className="xui-margin-right-small" value="Cathy Jones" />}
      primaryHeading="Cathy Jones"
      secondaryHeading="0 projects"
    />
  </XUIAccordion>
  <XUIAccordion
    emptyStateComponent={
      <div className="xui-accordion--emptystate">
        <XUIIcon icon={list} />
        <p>Nothing available to show</p>
      </div>
    }
    toggleLabel="Toggle"
  >
    <XUIAccordionItem
      action={
        <XUIButton onClick={handleClick} size="small">
          Edit details
        </XUIButton>
      }
      leftContent={<XUIAvatar className="xui-margin-right-small" value="Emilia Jane" />}
      primaryHeading="Emilia Jane"
      secondaryHeading="0 projects"
    />
  </XUIAccordion>
</div>;
```

## Example

You can nest other XUI components inside the `<XUIAccordionItem />` _(such as `<XUIContentBlock />`)_ to create robust compositions.

```jsx harmony
import XUIAccordion, { XUIAccordionItem } from '@xero/xui/react/accordion';
import XUIAvatar from '@xero/xui/react/avatar';
import XUIButton from '@xero/xui/react/button';
import { XUIContentBlock, XUIContentBlockItem } from '@xero/xui/react/contentblock';

const items = [
  {
    name: 'John Smith',
    contacts: [
      { contact: 'Pidgeon Publishing', project: 'Content review', minutes: '00:30' },
      { contact: 'Pete Campbell', project: 'Book illustration', minutes: '20:00' }
    ]
  }
];

const AccordionItem = ({ contacts, handleEditAction, name }) => {
  return (
    <XUIAccordionItem
      action={
        <XUIButton onClick={handleEditAction} onKeyDown={handleEditAction} size="small">
          Edit details
        </XUIButton>
      }
      leftContent={<XUIAvatar value={name} className="xui-margin-right-small" />}
      primaryHeading={name}
      secondaryHeading="2 projects"
    >
      <XUIContentBlock>
        {contacts.map(({ contact, project, minutes }) => (
          <XUIContentBlockItem
            href={`#${contact}`}
            key={contact}
            leftContent={<XUIAvatar value={contact} variant="business" />}
            pinnedValue={minutes}
            primaryHeading={contact}
            secondaryHeading={project}
          />
        ))}
      </XUIContentBlock>
    </XUIAccordionItem>
  );
};

const AccordionExample = () => {
  const handleEditAction = event => {
    event.stopPropagation();
    console.log('onClick/onKeyDown - edit action');
  };

  return (
    <XUIAccordion toggleLabel="Toggle">
      {items.map(item => (
        <AccordionItem {...item} key={item.name} handleEditAction={handleEditAction} />
      ))}
    </XUIAccordion>
  );
};

<AccordionExample />;
```
