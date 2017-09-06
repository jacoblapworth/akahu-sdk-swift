import React from 'react';
import ReactDOM from 'react-dom';
import XUILoader from '../XUILoader';
import { sizeClassNames } from '../private/constants';

ReactDOM.render(
	<div className="xui-page-width-standard">
		<section>
			<h3>Sizes</h3>
			{Object.keys(sizeClassNames).map(size => (
				<div key={size}>
					<h4 className="xui-text-align-center">{size}</h4>
					<XUILoader size={size} />
				</div>
			))}
		</section>
	</div>,
	document.getElementById('app')
);
