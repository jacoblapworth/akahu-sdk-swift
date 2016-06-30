import React from 'react';
import ReactDOMServer from 'react-dom/server';
import iconNames from '../src/iconData';

export default function() {
	const iconUseTags = Object.keys(iconNames).map(iconName => {
		return(
			<div key={iconName} className="xui-text-centered" style={{width:'100px'}}>
				<svg className="xui-icon">
					<use xlinkHref={'#xui-icon-' + iconName }/>
				</svg>
				<div>{iconName}</div>
			</div>
		);
	});

	return ReactDOMServer.renderToString(
		<div className="xui-row-flex xui-space-around">
			{iconUseTags}
		</div>
	);
};
