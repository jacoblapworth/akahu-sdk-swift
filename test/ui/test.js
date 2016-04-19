import 'babel-core/external-helpers.js';

import React from 'react';
import ReactDOM from 'react-dom';
import icons from '../../../xui-icon/src/iconData.js';
import XuiIcon, {XuiIconBlob} from '../../../xui-icon/src/XuiIcon.js';

(function() {
	let iconUseTags = [];
	for (var label in icons) {
		iconUseTags.push(
			<div key={label} className="xui-layout-column-3-of-12">
				<h2>{label}<XuiIcon icon={label} /></h2>
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
