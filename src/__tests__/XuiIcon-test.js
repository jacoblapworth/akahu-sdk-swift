import { assert } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import XuiIcon from '../XuiIcon.js';

const TestUtils = React.addons.TestUtils;

let ReactComponent;

describe('not found', () => {

	beforeEach(() => {
		ReactComponent = TestUtils.renderIntoDocument(
			<div>
				<XuiIcon icon="edit" className="abcd" />
			</div>
		);
	});

	it('should render', () => {
		assert.isOk(ReactComponent);
	});

	it('should accept class names via the className prop', () => {
		assert.isTrue(ReactDOM.findDOMNode(ReactComponent).children[0].classList.contains('abcd'));
	});

});