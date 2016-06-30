import 'babel-core/external-helpers.js';

import React from 'react';
import ReactDOM from 'react-dom';
import XUIIcon, { XUIIcons } from '../../../xui-icon/src/XUIIcon.js';

(function() {
	const iconUseTags = Object.keys(XUIIcons).map((iconLabel, i) => {
		const label = XUIIcons[iconLabel];
		return(
			<div key={label} className="xui-text-centered" style={{width:'100px'}}>
				<XUIIcon icon={label} title={label} />
				<div>{label}</div>
			</div>
		);
	});

	ReactDOM.render(
		<div>
			<div className="xui-row-flex xui-space-around">
				{iconUseTags}
			</div>
		</div>, document.getElementById('iconShowcase')
	);
})();
