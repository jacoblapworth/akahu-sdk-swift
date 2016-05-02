import 'babel-core/external-helpers.js';

import React from 'react';
import ReactDOM from 'react-dom';
import icons from '../../../xui-icon/src/iconData.js';
import XuiIcon, {XuiIconBlob} from '../../../xui-icon/src/XuiIcon.js';

(function() {
	let iconUseTags = [];
	for (var label in icons) {
		var iconName = 'xui-icon-' + label;
		iconUseTags.push(
			<div key={label} className="xui-column-3-of-12-wide xui-column-6-of-12-medium xui-column-12-of-12">
				<h2>{iconName} <XuiIcon icon={iconName} /></h2>
			</div>
		);
	}
	ReactDOM.render(
		<div>
			<XuiIconBlob/>
			<div className="xui-layout">
				{iconUseTags}
			</div>
		</div>, document.getElementById('app')
	);
})();
