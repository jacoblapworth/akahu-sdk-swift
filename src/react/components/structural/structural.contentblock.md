
<div class="xui-margin-vertical">
	<a href="../section-building-blocks-controls-button.html#building-blocks-controls-button-12" isDocLink>Content blocks in the XUI Documentation</a>
</div>

`XUIContentBlock` components are typically used inside a Panel to display a simplified top-level view for a detailed sub page, often containing quick access to actions. If you are not using them inside a `XUIPanel` component, we recommend applying the `xui-panel` class to the `XUIContentBlock`, as per the examples below. Any content should be placed inside a `XUIContentBlockItem` component.

`XUIContentBlockitem` takes several props which enable you to make them as simple or as complex as you like.


#### Simple Content block
```js
const XUIContentBlock = require('../structural/XUIContentBlock').default;
const XUIContentBlockItem = require('../structural/XUIContentBlockItem').default;
const XUIButton = require('../button/XUIButton').default;
const XUIIcon = require('../icon/XUIIcon').default;
const overflow = require('@xero/xui-icon/icons/overflow').default;

const overflowButton = <XUIButton className="xui-button-icon-large" variant="icon" aria-label="More options"><XUIIcon icon={overflow}/></XUIButton>;

<XUIContentBlock className="xui-panel">
	<XUIContentBlockItem isRowLink hasTopRadius primaryHeading="Primary" href="#" overflow={overflowButton}/>
	<XUIContentBlockItem isRowLink hasBottomRadius primaryHeading="Primary" href="#" overflow={overflowButton}/>
</XUIContentBlock>
```

Generally, the content inside a content block is split into left or right content. the props available to be passed on the left are `leftContent`, `primaryHeading`, `secondaryHeading` and `tag`. On the right, they are `pinnedValue`, `action` and `overflow`.

#### Complex Content block
```js
const XUIContentBlock = require('../structural/XUIContentBlock').default;
const XUIContentBlockItem = require('../structural/XUIContentBlockItem').default;
const XUIActions = require('./XUIActions').default;
const XUIButton = require('../button/XUIButton').default;
const XUIAvatar = require('../avatar/XUIAvatar').default;
const XUITag = require('../tag/XUITag').default;
const XUIIcon = require('../icon/XUIIcon').default;
const overflow = require('@xero/xui-icon/icons/overflow').default;

const overflowButton = <XUIButton className="xui-button-icon-large" variant="icon" aria-label="More options"><XUIIcon icon={overflow}/></XUIButton>;
const avatar = <XUIAvatar value="Tim Redmond" />;
const actionButton = <XUIActions secondaryAction={<XUIButton size="small">Action</XUIButton>}/>;
const tag = <XUITag className="xui-margin-left-small" variant="positive">Positive tag</XUITag>;

<XUIContentBlock className="xui-panel">
	<XUIContentBlockItem primaryHeading="Primary" secondaryHeading="Secondary" overflow={overflowButton} leftContent={avatar} pinnedValue="0.00" action={actionButton} tag={tag}/>
</XUIContentBlock>

```

