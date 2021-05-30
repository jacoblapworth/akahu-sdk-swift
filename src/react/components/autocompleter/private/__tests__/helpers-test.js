import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { isVisible, intervalRunner } from '../helpers';

Enzyme.configure({ adapter: new Adapter() });
jest.useFakeTimers();

describe('autocompleter helpers', () => {
  describe('isVisible', () => {
    it('should return true for a visible html element', () => {
      const node = mount(<div id="visibleElement" />);

      expect(isVisible(node.instance())).toBeTruthy();
    });

    it('should return false for an invisible html element', () => {
      const node = mount(<div id="visibleElement" style={{ visibility: 'hidden' }} />);

      expect(isVisible(node.instance())).toBeFalsy();
    });
  });

  describe('intervalRunner', () => {
    // eslint-disable-next-line jest/no-done-callback
    it('should run until the check returns true', done => {
      let count = 0;
      let success = false;
      const check = jest.fn().mockImplementation(() => {
        if (count <= 5) {
          count += 1;
          return false;
        }

        return true;
      });
      const callback = jest.fn().mockImplementation(() => {
        success = true;
        done();
      });

      expect(success).toBeFalsy();

      intervalRunner(check, callback);
      // This function is marked to change to advanceTimersByTime from version 21.3.0
      jest.advanceTimersByTime(1000);

      expect(check.mock.calls.length).toBeGreaterThan(5);
      expect(callback.mock.calls.length).toEqual(1);
      expect(success).toBeTruthy();
    });

    it('should never call the successful callback if the check is never returned true', () => {
      const check = jest.fn().mockImplementation(() => false);
      const callback = jest.fn();
      intervalRunner(check, callback);
      // This function is marked to change to advanceTimersByTime from version 21.3.0
      jest.advanceTimersByTime(1000);

      expect(check.mock.calls.length).toBeGreaterThan(5);
      expect(callback.mock.calls.length).toEqual(0);
    });
  });
});
