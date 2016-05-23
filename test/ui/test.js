import 'babel-core/external-helpers.js';

import React from 'react';
import ReactDOM from 'react-dom';
import icons from '../../../xui-icon/src/iconData.js';
import XUIIcon from '../../../xui-icon/src/XUIIcon.js';

(function() {
	const iconUseTags = Object.keys(icons).map((label, i) => {
		var iconName = 'xui-icon-' + label;
		const shortName = iconName.split('-').slice(-1)[0];
		return(
			<div key={label} tabIndex={i} className="xui-column-3-of-12-wide xui-column-6-of-12-medium xui-column-12-of-12">
				<h2>{iconName} <XUIIcon icon={iconName} className={'xui-icon-inline'} title={'title for ' + shortName} desc={'Description for ' + shortName} /></h2>
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
