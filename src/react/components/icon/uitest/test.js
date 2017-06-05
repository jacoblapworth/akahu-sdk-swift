import React from 'react';
import ReactDOM from 'react-dom';
import menu from '@xero/xui-icon/icons/menu';
import iconData from '@xero/xui-icon/lib/private/iconData.js';
import XUIIcon from '../XUIIcon';

(function() {
	const iconUseTags = Object.keys(iconData).map(name => {
		return (
			<div key={name} className="xui-text-centered xui-padding-vertical-small" style={{ width:'100px' }}>
				<XUIIcon path={iconData[name]} title={name} />
				<div>{name}</div>
			</div>
		);
	});

	ReactDOM.render(
		<div>
			<div className="xui-row-flex">
				{iconUseTags}
			</div>
			<p><strong>Note:</strong> The following icons have been deprecated:
				<ul>
					<li>download - use import instead</li>
					<li>pdf - use file-pdf instead</li>
					<li>zip - use file-zip instead</li>
				</ul>
			</p>
		</div>, document.getElementById('iconShowcase')
	);

	document.body.appendChild(svg);
})();
