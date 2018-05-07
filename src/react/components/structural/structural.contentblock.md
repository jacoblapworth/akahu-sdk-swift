
<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-building-blocks-controls-button.html#building-blocks-controls-button-12">Content blocks in the XUI Documentation</a>
</div>

`XUIContentBlock` components are typically used inside a Panel to display a simplified top-level view for a detailed sub page, often containing quick access to actions. If you are not using them inside a `XUIPanel` component, we recommend applying the `xui-panel` class to the `XUIContentBlock`, as per the examples below. Any content should be placed inside a `XUIContentBlockItem` component. 

`XUIContentBlockitem` takes several props which enable you to make them as simple or as complex as you like.


#### Simple Content block
```
const XUIContentBlock = require('../structural/XUIContentBlock').default;
const XUIContentBlockItem = require('../structural/XUIContentBlockItem').default;
const XUIButton = require('../button/XUIButton').default;
const overflow = require('@xero/xui-icon/icons/overflow').default;

const overflowButton = <XUIButton className="xui-button-icon-large" variant="icon"><XUIIcon path={overflow}/></XUIButton>;

<XUIContentBlock className="xui-panel">
	<XUIContentBlockItem primaryHeading="Primary" overflow={overflowButton}/>
</XUIContentBlock>
```

Generally, the content inside a content block is split into left or right content. the props available to be passed on the left are `leftContent`, `primaryHeading`, `secondaryHeading` and `tag`. On the right, they are `pinnedValue`, `action` and `overflow`.

#### Complex Content block
```
const XUIContentBlock = require('../structural/XUIContentBlock').default;
const XUIContentBlockItem = require('../structural/XUIContentBlockItem').default;
const XUIActions = require('./XUIActions').default;
const XUIButton = require('../button/XUIButton').default;
const overflow = require('@xero/xui-icon/icons/overflow').default;

const overflowButton = <XUIButton className="xui-button-icon-large" variant="icon"><XUIIcon path={overflow}/></XUIButton>;
const avatar = <abbr className="xui-avatar xui-avatar-color-2" role="presentation">P</abbr>;
const actionButton = <XUIActions secondaryAction={<XUIButton size="small">Action</XUIButton>}/>;
const tag = <span className="xui-tag xui-tag-positive xui-margin-left-small">Positive</span>;

<XUIContentBlock className="xui-panel">
	<XUIContentBlockItem primaryHeading="Primary" secondaryHeading="Secondary" overflow={overflowButton} leftContent={avatar} pinnedValue="0.00" action={actionButton} tag={tag}/>
</XUIContentBlock>

```

