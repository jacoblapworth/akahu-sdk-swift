import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import XuiIcon from '../XuiIcon.js';

const TestUtils = React.addons.TestUtils;

let ReactComponent;

describe('not found', () => {

	beforeEach(() => {
		ReactComponent = TestUtils.renderIntoDocument(
			<XuiIcon />
		);
	});

	it('should render', () => {
		expect(ReactComponent).to.exist;
	});

});