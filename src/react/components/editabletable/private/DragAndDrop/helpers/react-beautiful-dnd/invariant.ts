/* eslint-disable @typescript-eslint/no-explicit-any */
// This file is a TS version of
// https://github.com/atlassian/react-beautiful-dnd/blob/v13.1.0/src/invariant.js

/* eslint-disable no-restricted-syntax */
const isProduction = process.env.NODE_ENV === 'production';
const prefix = 'Invariant failed';

// Want to use this:
// export class RbdInvariant extends Error { }
// But it causes babel to bring in a lot of code

export function RbdInvariant(this: any, message: string) {
  this.message = message;
}
// $FlowFixMe
RbdInvariant.prototype.toString = function toString() {
  return this.message;
};

// A copy-paste of tiny-invariant but with a custom error type
// Throw an error if the condition fails
export function invariant(condition?: boolean, message?: string) {
  if (condition) {
    return;
  }

  if (isProduction) {
    // In production we strip the message but still throw
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    throw new RbdInvariant(prefix);
  } else {
    // When not in production we allow the message to pass through
    // *This block will be removed in production builds*
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    throw new RbdInvariant(`${prefix}: ${message || ''}`);
  }
}
