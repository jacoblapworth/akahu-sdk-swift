
<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-icon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-building-blocks-overview-blocks.html">Overview blocks in the XUI Documentation</a>
</div>

`XUIOverviewBlock` components are used to show a top-level summary of stats and figures. They should contain at least one and no more than six `XUIOverviewSection` components.

`XUIOverviewSection` takes `label`, `value`, and optional `sentiment` props. Sentiments consist of `positive`, `negative`, and `muted`, with a default of none.

```
const XUIOverviewBlock = require('../structural/XUIOverviewBlock').default;
const XUIOverviewSection = require('../structural/XUIOverviewSection').default;

<XUIOverviewBlock>
	<XUIOverviewSection label="Draft" value="$872.93" />
	<XUIOverviewSection label="Paid" value="$2,354.02" sentiment="positive" />
	<XUIOverviewSection label="Past due" value="$96.25" sentiment="negative" />
</XUIOverviewBlock>
```
