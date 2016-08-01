import 'babel-core/external-helpers.js';

import React from 'react';
import ReactDOM from 'react-dom';
import XUIIcon, { XUIIcons } from '../../src/XUIIcon';
import menu from '../../icons/menu';
import createSVGElement from '../../src/createSVGElement';

(function() {
	const iconUseTags = Object.keys(XUIIcons).map((iconLabel, i) => {
		const label = XUIIcons[iconLabel];
		return(
			<div key={label} className="xui-text-centered xui-padding-vertical-small" style={{width:'100px'}}>
				<XUIIcon icon={label} title={label} />
				<div>{label}</div>
			</div>
		);
	});

	ReactDOM.render(
		<div>
			<div className="xui-row-flex">
				{iconUseTags}
			</div>
			<p className="xui-text-centered"><strong>Note:</strong> The download icon has been deprecated and will be removed in the next major version. Use import instead.</p>
		</div>, document.getElementById('iconShowcase')
	);

	const svg = createSVGElement({
		path: menu
	});

	document.body.appendChild(svg);
})();
