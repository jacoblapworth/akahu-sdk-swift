
<div class="xui-margin-vertical">
	<svg focusable="false" class="xui-icon xui-icon-inline xui-blobicon xui-blobicon-large xui-icon-color-blue">
		<use xlink:href="#xui-icon-bookmark" role="presentation"/>
	</svg>
	<a href="../section-fundamentals-layout.html#fundamentals-layout-2-2">Columns in the XUI Documentation</a>
</div>

`XUIColumn` components are placed inside rows and accept props to determine their width within a 12-column grid.
The `gridColumns` prop may be a number 1 through 12 or `full`, `half`, `third`, or `quarter` as shorthand. By default, columns will be the full width of the row.

`XUIColumn` also accepts media-query-based widths to set different grid column counts at different viewport widths. `gridColumnsMedium` sets a number of columns for viewports 940-1160px wide, while `gridColumnsWide` is for viewports > 1160px.

```
const XUIRow = require('../structural/XUIRow').default;
const XUIColumn = require('../structural/XUIColumn').default;

const rowStyle = {backgroundColor: "#028DDE"};
const colStyle = {backgroundColor: "RGBA(255,255,255,0.5)"};

<div>
	<XUIRow variant={"grid"} style={rowStyle} className="xui-padding-small xui-margin-bottom-large">
		<XUIColumn gridColumns={"quarter"} gridColumnsMedium={"full"} className="xui-padding-small" style={colStyle}>
			This column will change at narrower viewports.
		</XUIColumn>
		<XUIColumn gridColumns={"quarter"} gridColumnsMedium={"full"} className="xui-padding-small" style={colStyle}>
			Responsive column width.
		</XUIColumn>
		<XUIColumn gridColumns={"half"} gridColumnsMedium={"full"} className="xui-padding-small" style={colStyle}>
			This column will change at narrower viewports.
		</XUIColumn>
	</XUIRow>
	<XUIRow variant={"flex"} style={rowStyle} className="xui-padding-small">
		<XUIColumn gridColumns={2} className="xui-padding-small" style={colStyle}>
			2 out of 12 columns wide.<br />
			More text.
		</XUIColumn>
		<XUIColumn gridColumns={3} className="xui-padding-small" style={colStyle}>
			3 out of 12 columns wide.
		</XUIColumn>
		<XUIColumn gridColumns={2} className="xui-padding-small" style={colStyle}>
			2 out of 12 columns wide.<br />
			More text.
		</XUIColumn>
		<XUIColumn gridColumns={5} className="xui-padding-small" style={colStyle}>
			5 out of 12 columns wide.
		</XUIColumn>
	</XUIRow>
</div>
```
