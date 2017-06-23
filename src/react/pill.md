```
const cn = require ('classnames');

const onDelete = () => console.log('deleted pill');
const baseClass = 'xui-newpill';
const containerClasses = cn('xui-row-flex xui-space-around xui-margin-bottom-small');
const avatarProps = {
	value: 'SJ',
	imageUrl: 'logo.png',
	size: 'small'
};
const pills = (
		<section >
			<h3> Pills </h3>
			<div className={containerClasses}>
			<XUIPill
			className={`${baseClass}-is-deleteable`}
			onDeleteClick = {onDelete}
			value="Deleteable Pill"/>
			<XUIPill
			className={`${baseClass}-is-focussed`}
			value="Focussed Pill"/>
			<XUIPill
			className={`${baseClass}-is-invalid`}
			value="Invalid Pill"/>
			<XUIPill
			className={`${baseClass}-is-layout`}
			href="https://xero.com"
			target = {true}
			value="Target Pill"/>
			<XUIPill
			className={`${baseClass}-is-layout`}
			secondaryText = {'Status'}
			value="SecondaryText Pill"/>
			<XUIPill
			className={`${baseClass}-is-layout`}
			avatarProps={avatarProps}
			value="Avatar Pill"/>
			<XUIPill
			className={`${baseClass}-is-content`}
			value="A really really really really long pill"/>
			</div>

		</section>
);

<div className="xui-page-width-large">
	{pills}
</div>
```
