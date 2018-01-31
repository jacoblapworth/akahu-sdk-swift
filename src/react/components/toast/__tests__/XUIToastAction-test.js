import React from 'react';
import renderer from 'react-test-renderer';
import XUIToastAction from '../XUIToastAction';

describe('<XUIToastAction />', () => {
    it('should render a passed qaHook as an auotmation id', () => {
        const automationId = renderer.create(<XUIToastAction qaHook="toast-action">
                <button>Action 1</button>
            </XUIToastAction>);

        expect(automationId).toMatchSnapshot();
    });
}); 