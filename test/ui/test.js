import 'babel-core/external-helpers.js';

import React from 'react';
import ReactDOM from 'react-dom';
import XUIIcon, { XUIIcons } from '../../../xui-icon/src/XUIIcon.js';

(function() {
	const iconUseTags = Object.keys(XUIIcons).map((iconLabel, i) => {
		const label = XUIIcons[iconLabel];
		return(
			<div key={label} tabIndex={i} className="xui-column-3-of-12-wide xui-column-6-of-12-medium xui-column-12-of-12">
				<h2>{label} <XUIIcon icon={label} className={'xui-icon-inline'} title={'title for ' + label} desc={'Description for ' + label} /></h2>
			</div>
		);
	});

	ReactDOM.render(
		<div>
			<div className="xui-layout">
				{iconUseTags}
			</div>
		</div>, document.getElementById('app')
	);
})();
