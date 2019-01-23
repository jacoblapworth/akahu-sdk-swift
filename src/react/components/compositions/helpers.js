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
}) {
	return cn(
		baseCompositionClass,
		!isInfinite && `${baseCompositionClass}-is-finite`,
		hasGridGap && `${baseCompositionClass}-has-grid-gap`,
		hasAutoSpaceAround && `${baseCompositionClass}-has-auto-space-around`,
	);
}

export default baseCompositionClass;
