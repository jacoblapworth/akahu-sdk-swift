import React from 'react';
import renderer from 'react-test-renderer';
import XUIBannerMessage from '../XUIBannerMessage';

describe('<XUIBannerMessage />', () => {
    it('should render a passed qaHook as an auotmation id', () => {
        const automationId = renderer.create(<XUIBannerMessage qaHook="banner-action">
               <span>message contents</span>
            </XUIBannerMessage>);

        expect(automationId).toMatchSnapshot();
    });
});