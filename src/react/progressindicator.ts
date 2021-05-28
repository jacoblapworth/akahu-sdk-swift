import XUIProgressCircular from './components/progressindicator/XUIProgressCircular';
import XUIProgressLinear from './components/progressindicator/XUIProgressLinear';

// Explicitly declaring the type here because of TS bug
const progressTypes: {
  XUIProgressCircular: typeof XUIProgressCircular;
  XUIProgressLinear: typeof XUIProgressLinear;
} = { XUIProgressLinear, XUIProgressCircular };

export { progressTypes as default, progressTypes, XUIProgressCircular, XUIProgressLinear };
