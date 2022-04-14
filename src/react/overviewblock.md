<div class="xui-margin-vertical">
	<a href="../section-components-displayingdata-overviewblock.html" isDocLink>Overview blocks in the XUI Documentation</a>
</div>

`XUIOverviewBlock` components are used to show a top-level summary of stats and figures. They should contain at least one and no more than six `XUIOverviewSection` components.

`XUIOverviewSection` takes `label`, `value`, and optional `sentiment` props. Sentiments consist of `positive`, `negative`, and `muted`, with a default of none.

```jsx harmony
import { XUIOverviewBlock, XUIOverviewSection } from '@xero/xui/react/overviewblock';

<XUIOverviewBlock>
  <XUIOverviewSection label="Draft" value="$872.93" />
  <XUIOverviewSection label="Awaiting payment" sentiment="positive" value="$2,354.02" />
  <XUIOverviewSection label="Overdue" sentiment="negative" value="$96.25" />
</XUIOverviewBlock>;
```
