import { ns } from '../../helpers/xuiClassNamespace';

const sizes = ['xsmall', 'small', 'medium'] as const;

const widths = ['always', 'small-down', 'never'] as const;

const selectBaseClass = `${ns}-select` as const;

export { selectBaseClass, sizes, widths };
