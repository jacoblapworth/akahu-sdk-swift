import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { axe, toHaveNoViolations } from 'jest-axe';
import XUIBanner from '../XUIBanner';

Enzyme.configure({ adapter: new Adapter() });
expect.extend(toHaveNoViolations);

const NOOP = () => {};

describe('XUIBanner', () => {
  it('should render without a sentiment modifier if no sentiment is provided', () => {
    const banner = shallow(<XUIBanner />);
    expect(banner.hasClass('xui-banner-negative')).toBeFalsy();
    expect(banner.hasClass('xui-banner-positive')).toBeFalsy();
  });

  it('should render with the negative sentiment modifier (and without positive modifier) when sentiment is set to negative', () => {
    const banner = shallow(<XUIBanner sentiment="negative" />);

    expect(banner.hasClass('xui-banner-negative')).toBeTruthy();
    expect(banner.hasClass('xui-banner-positive')).toBeFalsy();
  });

  it('should render with the positive sentiment modifier (and without negative modifier) when sentiment is set to positive', () => {
    const banner = shallow(<XUIBanner sentiment="positive" />);

    expect(banner.hasClass('xui-banner-negative')).toBeFalsy();
    expect(banner.hasClass('xui-banner-positive')).toBeTruthy();
  });

  it('should render without a close button if no close click function is provided', () => {
    const banner = shallow(<XUIBanner />);
    expect(banner.find('.xui-banner--close')).toHaveLength(0);
  });

  it('should render with a close button if close click function is provided', () => {
    const banner = shallow(<XUIBanner onCloseClick={NOOP} />);
    expect(banner.childAt(0).hasClass('xui-banner--close')).toBeTruthy();
  });

  it('should add the appropriate `role` attribute depending on the sentiment (`alert` for negative; else `status`)', () => {
    const status = shallow(<XUIBanner sentiment="positive" />);
    const alert = shallow(<XUIBanner sentiment="negative" />);
    const statusNeutral = shallow(<XUIBanner />);

    expect(status.props().role).toEqual('status');
    expect(alert.props().role).toEqual('alert');
    expect(statusNeutral.props().role).toEqual('status');
  });

  it('should pass accessibility testing', async () => {
    const wrapper = mount(<XUIBanner />);
    const results = await axe(wrapper.html());
    expect(results).toHaveNoViolations();
  });
});
