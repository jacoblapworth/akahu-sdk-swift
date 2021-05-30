import { ns } from '../../helpers/xuiClassNamespace';

const NAME_SPACE = `${ns}-progress`;
const COLORS = [
  'orange',
  'yellow',
  'green',
  'mint',
  'turquoise',
  'blue',
  'violet',
  'grape',
  'pink',
  'grey',
] as const;

const constants = { NAME_SPACE, COLORS };

export { COLORS, constants as default, NAME_SPACE };
