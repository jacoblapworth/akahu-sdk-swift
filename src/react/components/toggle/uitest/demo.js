import React from 'react';
import ReactDOM from 'react-dom';
import contact from '@xero/xui-icon/icons/contact';
import notification from '@xero/xui-icon/icons/notification';
import photo from '@xero/xui-icon/icons/photo';
import XUIIcon from '../../icon/XUIIcon';
import XUIToggle from '../XUIToggle';
import XUIToggleOption from '../XUIToggleOption';
import { colorMap } from '../private/constants';

const toggleForm = {
	name: 'toggle-checkbox',
	onChange: () => {},
	type: 'checkbox'
};

const toggleIcon = {
	name: 'toggle-checkbox-icon',
	onChange: () => {},
	type: 'checkbox'
};

ReactDOM.render(
	<div>
		{Object.keys(colorMap).map(color => (
			<div key={color}>
				<h2>Color: {color}</h2>
				<h3>Layout: Form</h3>
				<div className={`xui-panel xui-margin xui-padding xui-text-${color}`}>
					<XUIToggle color={color} layout='form'>
						<XUIToggleOption {...toggleForm}>
							Toy Story
						</XUIToggleOption>
						<XUIToggleOption {...toggleForm}>
							The Lion King
						</XUIToggleOption>
						<XUIToggleOption {...toggleForm}>
							Finding Nemo
						</XUIToggleOption>
						<XUIToggleOption {...toggleForm}>
							Monsters, Inc.
						</XUIToggleOption>
					</XUIToggle>
				</div>

				<h3>Layout: Standard</h3>
				<div className={`xui-panel xui-margin xui-padding xui-text-${color}`}>
					<XUIToggle color={color}>
						<XUIToggleOption {...toggleIcon}>
							<XUIIcon path={photo} />
						</XUIToggleOption>
						<XUIToggleOption {...toggleIcon}>
							<XUIIcon path={notification} />
						</XUIToggleOption>
						<XUIToggleOption {...toggleIcon}>
							<XUIIcon path={contact} />
						</XUIToggleOption>
					</XUIToggle>
				</div>
				<h3>Disabled</h3>
				<div className={`xui-panel xui-margin xui-padding xui-text-${color}`}>
					<XUIToggle color={color}>
						<XUIToggleOption {...toggleIcon} isDisabled>
							<XUIIcon path={photo} />
						</XUIToggleOption>
						<XUIToggleOption {...toggleIcon} isDisabled>
							<XUIIcon path={notification} />
						</XUIToggleOption>
						<XUIToggleOption {...toggleIcon} isDisabled>
							<XUIIcon path={contact} />
						</XUIToggleOption>
					</XUIToggle>
				</div>
			</div>
		))}
	</div>,
	document.getElementById('app')
);
