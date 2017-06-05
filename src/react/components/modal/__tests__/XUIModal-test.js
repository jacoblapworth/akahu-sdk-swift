import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import XUIModal from '../XUIModal';
import XUIModalBody from '../XUIModalBody';
import XUIModalFooter from '../XUIModalFooter';
import XUIModalHeader from '../XUIModalHeader';

// NOTE: The esc key functionality has not been tested here as event listeners don't work very well in React testing
describe('XUIModal', () => {
	it('Should render with any additional classes provided through the className, maskClassName and closeClassName props', function () {
		const component = mount(
			<XUIModal
				isUsingPortal={false}
				id="test-modal"
				className="classyMcClassFace"
				maskClassName="maskClassyMcClassFace"
				onClose={function(){}}
				closeClassName="closeClassyMcClassFace"
			>
			</XUIModal>
		);

		const domNode = component.find('.xui-modal');
		const maskNode = component.find('.xui-mask');

		expect(domNode.hasClass('classyMcClassFace')).to.be.true;
		expect(maskNode.hasClass('maskClassyMcClassFace')).to.be.true;
		expect(domNode.find('button').hasClass('closeClassyMcClassFace')).to.be.true;
	});


	it('Should render with the appropriate size modifier', function () {
		const component = mount(
			<div>
				<XUIModal isUsingPortal={false} id="test-modal-small" size="small"></XUIModal>
				<XUIModal isUsingPortal={false} id="test-modal-medium" size="medium"></XUIModal>
				<XUIModal isUsingPortal={false} id="test-modal-large" size="large"></XUIModal>
			</div>
		);

		const modal1 = component.find('#test-modal-small').childAt(0);
		const modal2 = component.find('#test-modal-medium').childAt(0);
		const modal3 = component.find('#test-modal-large').childAt(0);

		expect(modal1.hasClass('xui-modal-width-medium'), 'medium width class not expected').to.be.false;
		expect(modal1.hasClass('xui-modal-width-large'), 'large width class not expected').to.be.false;

		expect(modal2.hasClass('xui-modal-width-medium'), 'medium width class expected').to.be.true;
		expect(modal2.hasClass('xui-modal-width-large'), 'large width class not expected').to.be.false;

		expect(modal3.hasClass('xui-modal-width-large'), 'large width class expected').to.be.true;
		expect(modal3.hasClass('xui-modal-width-medium'), 'medium width class not expected').to.be.false;
	});

	it('Should correctly pass close handlers to close button and mask', function () {
		let clicked = false;
		const demoFunction = ()=>{clicked = true;};

		const component = mount(
			<XUIModal isUsingPortal={false} onClose={demoFunction} isHidden={false} hideOnOverlayClick={true}>
			</XUIModal>
		);
		const maskNode = component.find('.xui-mask');
		maskNode.simulate('click');
		expect(clicked).to.equal(true);

		clicked=false;

		const closeButtonNode = maskNode.find('.xui-button');
		closeButtonNode.simulate('click');
		expect(clicked).to.equal(true);
	});

	it('Should not fire onClose on mask click if hideOnOverlayClick is set to false', function () {
		let maskClicked = false;
		const demoFunction = ()=>{maskClicked = true;};

		const component = mount(
			<XUIModal
				isUsingPortal={false}
				id='test-modal-overlayClick'
				onClose={demoFunction}
				isHidden={false}
				hideOnOverlayClick={false}
			>
			</XUIModal>
		);
		const maskNode = component.find('#test-modal-overlayClick')
		maskNode.simulate('click');
		expect(maskClicked).to.equal(false);
	});

	it('Should only add default layout classes if defaultLayout isn\'t set to false', function () {
		const component = mount(
			<div>
				<XUIModal isUsingPortal={false} id="test-modal-nolayout" defaultLayout={false}>
				</XUIModal>
				<XUIModal isUsingPortal={false} id="test-modal-layout">
				</XUIModal>
			</div>
		);
		const firstModal = component.find('#test-modal-nolayout').childAt(0);
		const secondModal = component.find('#test-modal-layout').childAt(0);

		expect(firstModal.hasClass('xui-modal-layout')).to.be.false;
		expect(secondModal.hasClass('xui-modal-layout')).to.be.true;
	});

	it('Should not add margin or padding classes to subcomponents if defaultLayout is set to false', function () {
		const component = mount(
			<XUIModal isUsingPortal={false} defaultLayout={false} id="test-modal-layoutSecond">
				<XUIModalHeader defaultLayout={false}/>
				<XUIModalBody defaultLayout={false}/>
				<XUIModalFooter defaultLayout={false}/>
			</XUIModal>
		);
		const modal = component.find('#test-modal-layoutSecond').childAt(0);

		for (let i=0; i < modal.children.length; i++) {
			expect(modal.childAt(i).hasClass('xui-margin'), `${i} should have a margin class`).to.be.false;
			expect(modal.childAt(i).hasClass('xui-padding'), `${i} should have a padding class`).to.be.false;
			expect(modal.childAt(i).hasClass('xui-modal-layout'), `${i} shouldn't have a layout class`).to.be.false;
		}
	});

	it('Should render as a form when isForm is true', function () {
		const component = mount(
			<XUIModal isUsingPortal={false} isForm={true} id="test-modal">
				<XUIModalHeader/>
				<XUIModalBody/>
				<XUIModalFooter/>
			</XUIModal>
		);

		const domNode = component.find('.xui-modal');
		expect(domNode.is('form')).to.be.true;
	});

});
