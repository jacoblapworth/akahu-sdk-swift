import React from 'react';
import renderer from 'react-test-renderer';
import XUIToastActions from '../XUIToastActions';

describe('<XUIToastActions />', () => {
    it('should render a passed qaHook as an auotmation id', () => {
        const automationId = renderer.create(<XUIToastActions qaHook="toast-actions">
                <button>Action 1</button>
                <button>Action 2</button>
            </XUIToastActions>);

        expect(automationId).toMatchSnapshot();
    });
}); 