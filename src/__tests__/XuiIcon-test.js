import { assert } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import XUIIcon from '../XUIIcon.js';
import Classes from 'xui-css-classes';

const TestUtils = React.addons.TestUtils;

let ReactComponent;

describe('XUIIcon', () => {
	it('Should render with any additional classes provided through the className prop', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIIcon icon="xui-icon-search" className={'classyMcClassFace'} />
			</div>
		);

		// const domNode = TestUtils.findRenderedDOMComponentWithClass(component, 'xui-banner');
		const domNode = ReactDOM.findDOMNode(component).children[0];
		expect(domNode.getAttribute("class")).to.contain('classyMcClassFace');
	});

	it('Should render with the correct size classes when modifiers are provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIIcon icon="xui-icon-search" />
				<XUIIcon icon="xui-icon-search" size="large" />
				<XUIIcon icon="xui-icon-search" size="xlarge" />
			</div>
		);

		// const domNode = TestUtils.findRenderedDOMComponentWithClass(component, 'xui-banner');
		const domNode = ReactDOM.findDOMNode(component).children[0];
		expect(domNode.getAttribute("class")).to.not.contain(Classes.Icon.LARGE);
		expect(domNode.getAttribute("class")).to.not.contain(Classes.Icon.XLARGE);

		const domNode1 = ReactDOM.findDOMNode(component).children[1];
		expect(domNode1.getAttribute("class")).to.contain(Classes.Icon.LARGE);

		const domNode2 = ReactDOM.findDOMNode(component).children[2];
		expect(domNode2.getAttribute("class")).to.contain(Classes.Icon.XLARGE);
	});

	it('Should render with the correct rotation classes when rotations are provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIIcon icon="xui-icon-search" />
				<XUIIcon icon="xui-icon-search" rotation={90} />
				<XUIIcon icon="xui-icon-search" rotation={180} />
				<XUIIcon icon="xui-icon-search" rotation={270} />
			</div>
		);

		// const domNode = TestUtils.findRenderedDOMComponentWithClass(component, 'xui-banner');
		const domNode = ReactDOM.findDOMNode(component).children[0];
		expect(domNode.getAttribute("class")).to.not.contain(Classes.Icon.ROTATE['90']);
		expect(domNode.getAttribute("class")).to.not.contain(Classes.Icon.ROTATE['180']);
		expect(domNode.getAttribute("class")).to.not.contain(Classes.Icon.ROTATE['270']);

		const domNode1 = ReactDOM.findDOMNode(component).children[1];
		expect(domNode.getAttribute("class")).to.not.contain(Classes.Icon.ROTATE['90']);

		const domNode2 = ReactDOM.findDOMNode(component).children[2];
		expect(domNode.getAttribute("class")).to.not.contain(Classes.Icon.ROTATE['180']);

		const domNode3 = ReactDOM.findDOMNode(component).children[3];
		expect(domNode.getAttribute("class")).to.not.contain(Classes.Icon.ROTATE['270']);
	});

	it('Should render title and desc elements within the SVG element based on the props provided', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIIcon 
					icon="xui-icon-search" 
					title="Happy poop title 💩"
					desc="Happy poop desc 💩" />
			</div>
		);

		const domNode = ReactDOM.findDOMNode(component).children[0];
		const runningInPhantom = navigator.userAgent.indexOf("PhantomJS") > -1;

		//Phantom doesn't allow looking at SVG child elements in the same way that other browsers do...
		if (!runningInPhantom){
			expect(domNode.getElementsByTagName("title")[0].innerHTML).to.equal("Happy poop title 💩");
			expect(domNode.getElementsByTagName("desc")[0].innerHTML).to.equal("Happy poop desc 💩");
		} else {
			let titleNode, descNode;
			for (let i=0; i < domNode.childNodes.length; i++) {
				if (domNode.childNodes[i].tagName === "title"){
					titleNode = domNode.childNodes[i];
				}

				if (domNode.childNodes[i].tagName === "desc"){
					descNode = domNode.childNodes[i];
				}
			}
			expect(titleNode.textContent).to.equal("Happy poop title 💩");
			expect(descNode.textContent).to.equal("Happy poop desc 💩");
		}
	});

	it('Should render with role="presentation" on the use element by default', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIIcon icon="xui-icon-search" />
			</div>
		);
		const domNode = ReactDOM.findDOMNode(component).children[0];
		expect(domNode.getElementsByTagName("use")[0].getAttribute("role")).to.equal("presentation");
	});

	it('Should render with the given role applied to the use element', function () {
		const component = TestUtils.renderIntoDocument(
			<div>
				<XUIIcon icon="xui-icon-search" role="img" />
			</div>
		);
		const domNode = ReactDOM.findDOMNode(component).children[0];
		expect(domNode.getElementsByTagName("use")[0].getAttribute("role")).to.equal("img");
	});
});