```
const contact = require('@xero/xui-icon/icons/contact').default
const notification = require('@xero/xui-icon/icons/notification').default
const photo = require('@xero/xui-icon/icons/photo').default;
const { colorMap } = require('./components/toggle/private/constants');
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


<div>
	{Object.keys(colorMap).map(color => (
		<div key={color}>
			<h2>Color: {color}</h2>
			<h3>Layout: Form</h3>
			<div className={`xui-panel xui-margin xui-padding xui-text-${color}`}>
				<XUIToggle color={color} layout='form'>
					<XUIToggleOption {...Object.assign({},
						toggleForm
					)}>
						Toy Story
					</XUIToggleOption>
					<XUIToggleOption {...Object.assign({},
						toggleForm
					)}>
						The Lion King
					</XUIToggleOption>
					<XUIToggleOption {...Object.assign({},
						toggleForm
					)}>
						Finding Nemo
					</XUIToggleOption>
					<XUIToggleOption {...Object.assign({},
						toggleForm
					)}>
						Monsters, Inc.
					</XUIToggleOption>
				</XUIToggle>
			</div>

			<h3>Layout: Standard</h3>
			<div className={`xui-panel xui-margin xui-padding xui-text-${color}`}>
				<XUIToggle color={color}>
					<XUIToggleOption {...Object.assign({},
						toggleIcon
					)}>
						<XUIIcon path={photo} />
					</XUIToggleOption>
					<XUIToggleOption {...Object.assign({},
						toggleIcon
					)}>
						<XUIIcon path={notification} />
					</XUIToggleOption>
					<XUIToggleOption {...Object.assign({},
						toggleIcon
					)}>
						<XUIIcon path={contact} />
					</XUIToggleOption>
				</XUIToggle>
			</div>
			<h3>Disabled</h3>
			<div className={`xui-panel xui-margin xui-padding xui-text-${color}`}>
				<XUIToggle color={color}>
					<XUIToggleOption {...Object.assign({},
						toggleIcon,
						{ isDisabled: true }
					)}>
						<XUIIcon path={photo} />
					</XUIToggleOption>
					<XUIToggleOption {...Object.assign({},
						toggleIcon,
						{ isDisabled: true }
					)}>
						<XUIIcon path={notification} />
					</XUIToggleOption>
					<XUIToggleOption {...Object.assign({},
						toggleIcon,
						{ isDisabled: true }
					)}>
						<XUIIcon path={contact} />
					</XUIToggleOption>
				</XUIToggle>
			</div>
		</div>
	))}
</div>
```
