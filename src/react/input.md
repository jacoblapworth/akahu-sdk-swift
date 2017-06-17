```
const search = require ('@xero/xui-icon/icons/search').default;
const linkedin = require ('@xero/xui-icon/icons/social-linkedin').default;
const facebook = require ('@xero/xui-icon/icons/social-facebook').default;
const twitter = require ('@xero/xui-icon/icons/social-twitter').default;

const onChange = event => console.log(`oh I made a change, value: ${event.target.value}`); // eslint-disable-line no-console

<div className="xui-page-width-standard">
		<section>
			<h3>Inputs</h3>
			<XUIInput
				onChange={onChange}
				qaHook="test-ui"
				inputAttributes={{ defaultValue: 'This one has a default value' }}
				containerClassName="xui-margin-small"
			/>
			<XUIInput
				onChange={onChange}
				inputAttributes={{ placeholder: 'Number', type: 'number' }}
				containerClassName="xui-margin-small"
			/>
			<XUIInput
				inputAttributes={{
					placeholder: "Now it's empty",
					defaultValue: 'This one also has a default value and is readonly',
					readOnly: true
				}}
				containerClassName="xui-margin-small"
			/>
			<XUIInput
				onChange={onChange}
				inputAttributes={{ type: 'url', placeholder: 'http://www.xero.com', required: true }}
				containerClassName="xui-margin-small"
			/>
			<XUIInput
				onChange={onChange}
				qaHook="test-ui2"
				containerClassName="xui-margin-small"
			/>
		</section>
		<section>
			<h4>With icons</h4>
			<XUIInput
				onChange={onChange}
				iconAttributes={{ path: search, position: 'left' }}
				inputAttributes={{ placeholder: 'This is a search box', type: 'search' }}
				containerClassName="xui-margin-small"
			/>
			<XUIInput
				onChange={onChange}
				iconAttributes={{ path: search, position: 'right' }}
				inputAttributes={{ placeholder: 'This is a search box on the right', type: 'search' }}
				containerClassName="xui-margin-small"
			/>
			<XUIInput
				iconAttributes={{ path: search, position: 'right' }}
				inputAttributes={{ placeholder: 'The read only', readOnly: true }}
				containerClassName="xui-margin-small"
			/>
			<XUIInput
				iconAttributes={{ path: search, position: 'right' }}
				inputAttributes={{ placeholder: 'Disabled',  disabled: true }}
				containerClassName="xui-margin-small"
			/>
		</section>
		<section>
			<h4>With icon wrappers</h4>
			<XUIInput
				onChange={onChange}
				iconAttributes={{ path: linkedin, position: 'right', color: 'white', wrapperColor: 'linkedin' }}
				inputAttributes={{ placeholder: 'LinkedIn' }}
				containerClassName="xui-margin-small"
			/>
			<XUIInput
				onChange={onChange}
				iconAttributes={{ path: facebook, position: 'right', color: 'white', wrapperColor: 'facebook' }}
				inputAttributes={{ placeholder: 'Facebook url' }}
				containerClassName="xui-margin-small"
			/>
			<XUIInput
				onChange={onChange}
				iconAttributes={{ path: twitter, color: 'white', wrapperColor: 'twitter', position: 'left' }}
				inputAttributes={{ placeholder: '@username' }}
				containerClassName="xui-margin-small"
			/>
		</section>
	</div>
```
