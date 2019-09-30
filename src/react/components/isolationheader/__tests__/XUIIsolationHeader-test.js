import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import XUIIsolationHeader from '../XUIIsolationHeader';
import XUIIsolationHeaderActions from '../XUIIsolationHeaderActions';
import XUIIsolationHeaderNavigation from '../XUIIsolationHeaderNavigation';
import XUIIsolationHeaderTitle from '../XUIIsolationHeaderTitle';
import XUIIsolationHeaderSecondaryTitle from '../XUIIsolationHeaderSecondaryTitle';

Enzyme.configure({ adapter: new Adapter() });

describe('<XUIIsolationHeader>', () => {
  describe('Standard', () => {
    it('should render an automation id when a qaHook is passed in', () => {
      const qaHook = 'qahook';

      const wrapper = renderer.create(
        <XUIIsolationHeader isInverted qaHook={qaHook}>
          <XUIIsolationHeaderNavigation>
            <XUIIsolationHeaderTitle title="Tooltip">My title</XUIIsolationHeaderTitle>
            <XUIIsolationHeaderSecondaryTitle title="Tooltip">
              My secondary title
            </XUIIsolationHeaderSecondaryTitle>
          </XUIIsolationHeaderNavigation>
          <XUIIsolationHeaderActions>Tools</XUIIsolationHeaderActions>
        </XUIIsolationHeader>,
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render with the given className if provided', () => {
      const className = 'klass';

      const wrapper = renderer.create(
        <XUIIsolationHeader isInverted className={className}>
          <XUIIsolationHeaderNavigation>
            <XUIIsolationHeaderTitle>My title</XUIIsolationHeaderTitle>
            <XUIIsolationHeaderSecondaryTitle>My secondary title</XUIIsolationHeaderSecondaryTitle>
          </XUIIsolationHeaderNavigation>
          <XUIIsolationHeaderActions>Tools</XUIIsolationHeaderActions>
        </XUIIsolationHeader>,
      );

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Inverted', () => {
    it('should render an automation id when a qaHook is passed in', () => {
      const qaHook = 'qahook';

      const wrapper = renderer.create(
        <XUIIsolationHeader isInverted qaHook={qaHook}>
          <XUIIsolationHeaderNavigation>
            <XUIIsolationHeaderTitle>My title</XUIIsolationHeaderTitle>
            <XUIIsolationHeaderSecondaryTitle>My secondary title</XUIIsolationHeaderSecondaryTitle>
          </XUIIsolationHeaderNavigation>
          <XUIIsolationHeaderActions>Tools</XUIIsolationHeaderActions>
        </XUIIsolationHeader>,
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should render with the given className if provided', () => {
      const className = 'klass';

      const wrapper = renderer.create(
        <XUIIsolationHeader isInverted className={className}>
          <XUIIsolationHeaderNavigation>
            <XUIIsolationHeaderTitle>My title</XUIIsolationHeaderTitle>
            <XUIIsolationHeaderSecondaryTitle>My secondary title</XUIIsolationHeaderSecondaryTitle>
          </XUIIsolationHeaderNavigation>
          <XUIIsolationHeaderActions>Tools</XUIIsolationHeaderActions>
        </XUIIsolationHeader>,
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
