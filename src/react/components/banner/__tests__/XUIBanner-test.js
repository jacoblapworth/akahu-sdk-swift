import React from 'react';
import Enzyme, { render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import XUIBanner from '../XUIBanner';
import XUIBannerAction from '../XUIBannerAction';
import XUIBannerActions from '../XUIBannerActions';
import XUIBannerMessage from '../XUIBannerMessage';
import XUIBannerMessageDetail from '../XUIBannerMessageDetail';

Enzyme.configure({ adapter: new Adapter() });

describe('XUIBanner', () => {

	it('should render without a sentiment modifier if no sentiment is provided', function () {
		const component = render(<XUIBanner/>);
		const banner = component.find('.xui-banner');
		expect(banner.hasClass('xui-banner-negative')).toBeFalsy();
		expect(banner.hasClass('xui-banner-positive')).toBeFalsy();
	});

	it('should render with the negative sentiment modifier (and without positive modifier) when sentiment is set to negative', function () {
		const component = mount(<XUIBanner sentiment="negative" />);
		const banner = component.find('.xui-banner-negative');
		const notThisBanner = component.find('.xui-banner-positive');

		expect(banner).toHaveLength(1);
		expect(notThisBanner).toHaveLength(0);
	});

	it('should render with the positive sentiment modifier (and without negative modifier) when sentiment is set to positive', function () {
		const component = mount(<XUIBanner sentiment="positive" />);
		const banner = component.find('.xui-banner-positive');
		const notThisBanner = component.find('.xui-banner-negative');

		expect(banner).toHaveLength(1);
		expect(notThisBanner).toHaveLength(0);
	});

	it('should render all the messages in the messageDetails prop when used on XUIBannerMessageDetail', function () {
		const messageDetails = ['Details about the message', 'e.g. We\'ve got this request'];

		const component = render(
			<XUIBanner>
				<XUIBannerMessage>Banner Message</XUIBannerMessage>
				<XUIBannerMessageDetail messageDetails={messageDetails}/>
			</XUIBanner>
		);

		expect(component.find('.xui-banner--messagedetail').children()).toHaveLength(messageDetails.length);
	});

	it('should pass the `href` prop to the href attribute when XUIBannerLink has a link prop', function () {
		const component = render(
			<XUIBannerActions>
				<XUIBannerAction href='#BannerLink'>Action One</XUIBannerAction>
			</XUIBannerActions>
		);

		expect(component.find('a')[0].attribs.href).toEqual('#BannerLink');
	});

	it('should render without a close button if no close click function is provided', function () {
		const component = render(<XUIBanner />);
		expect(component.find('.xui-banner--close')).toHaveLength(0);
	});

	it('should render with a close button if close click function is provided', function () {
		const component = render(<XUIBanner onCloseClick={function(){}} />);
		expect(component.find('.xui-banner--close')).toHaveLength(1);
	});

	it('should add the appropriate `role` attribute depending on the sentiment (`alert` for negative; else `status`)', function () {
		const component = render(
			<div>
				<XUIBanner sentiment="positive" />
				<XUIBanner sentiment="negative" />
				<XUIBanner />
			</div>
		);

		const banners = component.find('.xui-banner');
		expect(banners[0].attribs.role).toEqual('status');
		expect(banners[1].attribs.role).toEqual('alert');
		expect(banners[2].attribs.role).toEqual('status');
	});
});
