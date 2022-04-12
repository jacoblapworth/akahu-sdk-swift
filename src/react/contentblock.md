<div class="xui-margin-vertical">
	<a href="../section-components-displayingdata-contentblock.html" isDocLink>Content blocks in the XUI Documentation</a>
</div>

`XUIContentBlock` components are typically used inside a Panel to display a simplified top-level view for a detailed sub page, often containing quick access to actions. If you are not using them inside a `XUIPanel` component, we recommend applying the `xui-panel` class to the `XUIContentBlock`, as per the examples below. Any content should be placed inside a `XUIContentBlockItem` component.

`XUIContentBlockitem` takes several props which enable you to make them as simple or as complex as you like.

#### Simple Content block

```jsx harmony
import { XUIIconButton } from '@xero/xui/react/button';
import { XUIContentBlock, XUIContentBlockItem } from '@xero/xui/react/contentblock';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';
import overflow from '@xero/xui-icon/icons/overflow';

const overflowMenu = (
  <XUIDropdownToggled
    dropdown={
      <XUIDropdown>
        <XUIPicklist>
          <XUIPickitem id="duplicate">Duplicate project</XUIPickitem>
          <XUIPickitem id="delete">Delete</XUIPickitem>
        </XUIPicklist>
      </XUIDropdown>
    }
    trigger={<XUIIconButton ariaLabel="More options" icon={overflow} />}
  />
);

<XUIContentBlock className="xui-panel">
  <XUIContentBlockItem
    hasTopRadius
    href="#bobs-burgers"
    isRowLink
    overflow={overflowMenu}
    primaryHeading="Bob's Burgers"
  />
  <XUIContentBlockItem
    hasBottomRadius
    href="#capital-cabs"
    isRowLink
    overflow={overflowMenu}
    primaryHeading="Capital Cabs"
  />
</XUIContentBlock>;
```

Generally, the content inside a content block is split into left or right content. The props available to be passed on the left are `leftContent`, `primaryHeading`, `secondaryHeading`, `description` and `tags`. On the right, they are `pinnedValue`, `action` and `overflow`.

#### Complex Content block

```jsx harmony
import { XUIContentBlock, XUIContentBlockItem } from '@xero/xui/react/contentblock';
import XUIActions from '@xero/xui/react/actions';
import XUIAvatar from '@xero/xui/react/avatar';
import XUIButton, { XUIIconButton } from '@xero/xui/react/button';
import XUIDropdown, { XUIDropdownToggled } from '@xero/xui/react/dropdown';
import XUIPicklist, { XUIPickitem } from '@xero/xui/react/picklist';
import XUITag from '@xero/xui/react/tag';
import overflow from '@xero/xui-icon/icons/overflow';

const avatar = <XUIAvatar value="Bob's Burgers" />;
const actionButton = <XUIActions secondaryAction={<XUIButton size="small">Edit</XUIButton>} />;

const tag = (
  <XUITag size="small" variant="negative">
    Overdue
  </XUITag>
);

const overflowMenu = (
  <XUIDropdownToggled
    dropdown={
      <XUIDropdown>
        <XUIPicklist>
          <XUIPickitem id="duplicate">Duplicate project</XUIPickitem>
          <XUIPickitem id="delete">Delete</XUIPickitem>
        </XUIPicklist>
      </XUIDropdown>
    }
    trigger={<XUIIconButton ariaLabel="More options" icon={overflow} />}
  />
);

<XUIContentBlock className="xui-panel">
  <XUIContentBlockItem
    action={actionButton}
    description="Deadline 1 Feb 2023 • Estimate 10,000.00"
    leftContent={avatar}
    onClick={() => {
      console.log('onClick');
    }}
    overflow={overflowMenu}
    pinnedValue="1,802.23"
    primaryHeading="Bob's Burgers"
    secondaryHeading="Website design"
    tagPosition="inline"
    tags={tag}
  />
</XUIContentBlock>;
```
