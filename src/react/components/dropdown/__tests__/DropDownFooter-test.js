import React from 'react';
import renderer from 'react-test-renderer';
import DropDownFooter from '../DropDownFooter.js';

describe('<DropDownFooter />', () => {
    it ('shoudl render an auotmation id when a qaHook is passed', () => {
        const automationId = renderer.create(
            <DropDownFooter qaHook="dropdownfooter-example">content</DropDownFooter>
        );

        expect(automationId).toMatchSnapshot();
    })
})