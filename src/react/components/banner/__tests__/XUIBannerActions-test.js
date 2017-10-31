import React from 'react';
import renderer from 'react-test-renderer';
import XUIBannerActions from '../XUIBannerActions';

describe('<XUIBannerAction />', () => {
    it('should render a passed qaHook as an auotmation id', () => {
        const automationId = renderer.create(<XUIBannerActions qaHook="banner-action">
                <button>Action 1</button>
                <button>Action 2</button>
            </XUIBannerActions>);

        expect(automationId).toMatchSnapshot();
    });
});