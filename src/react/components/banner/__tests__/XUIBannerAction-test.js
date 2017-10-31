import React from 'react';
import renderer from 'react-test-renderer';
import XUIBannerAction from '../XUIBannerAction';

describe('<XUIBannerAction />', () => {
    it('should render a passed qaHook as an auotmation id', () => {
        const automationId = renderer.create(<XUIBannerAction qaHook="banner-action">
                <button>Action</button>
            </XUIBannerAction>);

        expect(automationId).toMatchSnapshot();
    });
});