import React from 'react';
import ReactDOM from 'react-dom';
import iconData from '@xero/xui-icon/lib/private/iconData';
import XUIIcon from '../XUIIcon';

(function() {
	const iconUseTags = Object.keys(iconData).map(name => {
		return (
			<div key={name} className="xui-text-align-center xui-padding-vertical-small" style={{ width:'100px' }}>
				<XUIIcon path={iconData[name]} title={name} />
				<div>{name}</div>
			</div>
		);
	});

	ReactDOM.render(
		<div className="xui-page-width-standard">
			<p><strong>Note:</strong> The following icons have been deprecated:</p>
			<ul>
				<li>download - use import instead</li>
				<li>pdf - use file-pdf instead</li>
				<li>zip - use file-zip instead</li>
			</ul>
			<div className="xui-row-flex">
				{iconUseTags}
			</div>
		</div>,
		document.getElementById('app')
	);
})();
