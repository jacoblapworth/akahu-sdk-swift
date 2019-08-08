<div class="xui-margin-vertical">
	<a href="../section-compounds-displayingdata-contentblock.html" isDocLink>Content blocks in the XUI Documentation</a>
</div>

`XUIContentBlock` components are typically used inside a Panel to display a simplified top-level view for a detailed sub page, often containing quick access to actions. If you are not using them inside a `XUIPanel` component, we recommend applying the `xui-panel` class to the `XUIContentBlock`, as per the examples below. Any content should be placed inside a `XUIContentBlockItem` component.

`XUIContentBlockitem` takes several props which enable you to make them as simple or as complex as you like.

#### Simple Content block

```jsx harmony
import { XUIContentBlock, XUIContentBlockItem } from '../../structural';
import { XUIIconButton } from '../../button';
import XUIIcon from '../../icon';
import overflow from '@xero/xui-icon/icons/overflow';

const overflowButton = <XUIIconButton icon={overflow} ariaLabel="More options" />;

<XUIContentBlock className="xui-panel">
  <XUIContentBlockItem
    isRowLink
    hasTopRadius
    primaryHeading="Primary"
    href="#"
    overflow={overflowButton}
  />
  <XUIContentBlockItem
    isRowLink
    hasBottomRadius
    primaryHeading="Primary"
    href="#"
    overflow={overflowButton}
  />
</XUIContentBlock>;
```

Generally, the content inside a content block is split into left or right content. The props available to be passed on the left are `leftContent`, `primaryHeading`, `secondaryHeading`, `description` and `tags`. On the right, they are `pinnedValue`, `action` and `overflow`.

#### Complex Content block

```jsx harmony
import { XUIContentBlock, XUIContentBlockItem, XUIActions } from '../../structural';
import XUIButton, { XUIIconButton } from '../../button';
import XUIAvatar from '../../avatar';
import XUITag from '../../tag';
import XUIIcon from '../../icon';
import overflow from '@xero/xui-icon/icons/overflow';

const description =
  'Quinoa sustainable celiac deep v polaroid four loko disrupt. Keytar cloud bread pinterest freegan, artisan hot chicken air plant ethical. Tbh selvage synth marfa affogato tacos +1, beard food truck sriracha tousled readymade. Pour-over distillery tilde venmo. Shoreditch vinyl tbh selvage, vexillologist iPhone flannel hoodie. Live-edge gluten-free brooklyn, gastropub lo-fi schlitz vinyl.';
const overflowButton = <XUIIconButton icon={overflow} ariaLabel="More options" />;
const avatar = <XUIAvatar value="Tim Redmond" />;
const actionButton = <XUIActions secondaryAction={<XUIButton size="small">Action</XUIButton>} />;
const tag = (
  <XUITag className="xui-margin-left-small" variant="positive">
    Positive tag
  </XUITag>
);
const callback = () => {
  alert('clicked');
};

<XUIContentBlock className="xui-panel">
  <XUIContentBlockItem
    primaryHeading="Primary"
    secondaryHeading="Secondary"
    description={description}
    overflow={overflowButton}
    leftContent={avatar}
    pinnedValue="0.00"
    action={actionButton}
    tags={tag}
    tagPosition="inline"
    onClick={callback}
  />
</XUIContentBlock>;
```
