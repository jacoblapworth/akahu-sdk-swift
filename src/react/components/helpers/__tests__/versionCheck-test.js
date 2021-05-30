import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { checkReactVersion } from '../versionCheck';

Enzyme.configure({ adapter: new Adapter() });

describe('checkReactVersion', () => {
  it('should call the logError fn when the actual major version of React does not match the expected version of React', () => {
    const required = '^20.5.9'; // this is an arbitrary value
    const actual = '16.0.0';
    const logErrorFn = jest.fn();

    checkReactVersion(actual, required, logErrorFn);
    expect(logErrorFn).toBeCalled();
  });

  it('should call the logError fn when the actual minor version of React does not match the expected version of React', () => {
    const required = '^20.5.9'; // this is an arbitrary value
    const actual = '20.0.0';
    const logErrorFn = jest.fn();

    checkReactVersion(actual, required, logErrorFn);
    expect(logErrorFn).toBeCalled();
  });

  it('should call the logError fn when the actual patch version of React does not match the expected version of React', () => {
    const required = '^20.5.9'; // this is an arbitrary value
    const actual = '20.5.0';
    const logErrorFn = jest.fn();

    checkReactVersion(actual, required, logErrorFn);
    expect(logErrorFn).toBeCalled();
  });

  it('should not call the logError fn when the actual minor/patch version of React is equal to or greater than the expected version of React', () => {
    const required = '^20.5.9'; // this is an arbitrary value
    const actual1 = '20.5.9';
    const actual2 = '20.5.10';
    const actual3 = '20.6.0';
    const logErrorFn = jest.fn();

    checkReactVersion(actual1, required, logErrorFn);
    checkReactVersion(actual2, required, logErrorFn);
    checkReactVersion(actual3, required, logErrorFn);
    expect(logErrorFn).not.toBeCalled();
  });
});
