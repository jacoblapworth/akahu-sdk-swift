import React from 'react';
import renderer from 'react-test-renderer';
import DropDownHeader from '../DropDownHeader.js';

describe('<DropDownHeader />', () => {
    it ('shoudl render an auotmation id when a qaHook is passed', () => {
        const automationId = renderer.create(
            <DropDownHeader qaHook="dropdownheader-example" title="test header">content</DropDownHeader>
        );

        expect(automationId).toMatchSnapshot();
    });
})