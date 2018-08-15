import { ns } from '../../helpers/xuiClassNamespace';

export const baseClass = `${ns}-toast`;
export const sentimentMap = {
	positive: {
		class: `${baseClass}-positive`,
		role: 'alert',
	},
	negative: {
		class: `${baseClass}-negative`,
		role: 'alert',
	},
};
