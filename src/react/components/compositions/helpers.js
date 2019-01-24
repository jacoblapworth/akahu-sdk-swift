import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';

const baseCompositionClass = `${ns}-composition`;

export const retainValues = {
	medium: 'medium',
	small: 'small',
};

export function buildGlobalCompositionClasses({
	isInfinite,
	hasGridGap,
	hasAutoSpaceAround,
	hasAutoColumnWidths,
}) {
	return cn(
		baseCompositionClass,
		!isInfinite && `${baseCompositionClass}-is-finite`,
		hasGridGap && `${baseCompositionClass}-has-grid-gap`,
		hasAutoSpaceAround && `${baseCompositionClass}-has-auto-space-around`,
		hasAutoColumnWidths && `${baseCompositionClass}-has-auto-widths`,
	);
}

export function buildLayoutClass({ retainWidth, compositionName }) {
	return (
		retainWidth
		&& retainValues[retainWidth]
		&& `${baseCompositionClass}-${compositionName}-retain-${retainWidth}`
	) || `${baseCompositionClass}-auto-template`;
}

export default baseCompositionClass;
