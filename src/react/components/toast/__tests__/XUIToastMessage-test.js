import React from 'react';
import renderer from 'react-test-renderer';
import XUIToastMessage from '../XUIToastMessage';

describe('<XUIToastMessage />', () => {
    it('should render a passed qaHook as an auotmation id', () => {
        const automationId = renderer.create(<XUIToastMessage qaHook="toast-actions">
                <span>Message Content</span>
            </XUIToastMessage>);

        expect(automationId).toMatchSnapshot();
    });
}); 