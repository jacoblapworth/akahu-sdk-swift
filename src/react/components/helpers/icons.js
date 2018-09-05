import iconData from '@xero/xui-icon/lib/private/iconData';

export const flattenedIconMap = {};
export const flattenedIconList = [];

Object.keys(iconData).forEach(groupKey => {
	Object.keys(iconData[groupKey]).forEach(iconKey => {
		flattenedIconMap[iconKey] = iconData[groupKey][iconKey];
		flattenedIconList.push(iconKey);
	});
});
