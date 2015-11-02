import React from 'react';
import XUIButton, {XUIButtonGroup} from '../../src/XUIButton.js';
import './styles/test.scss';

(function() {
	var clickHandler = function() {
		alert('I was clicked'); //eslint-disable-line no-alert
	};

	React.render(<div>
			<div className={"testButtonContainer"}>
				<XUIButton
					text={'Default button'}></XUIButton>
			</div>
			<div className={"testButtonContainer"}>
				<XUIButton
						variant={'primary'}
						text={'Primary button'}></XUIButton>
			</div>
			<div className={"testButtonContainer"}>
				<XUIButton
						variant={'create'}
						text={'Create button'}></XUIButton>
			</div>
			<div className={"testButtonContainer"}>
				<XUIButton
					text={'Disabled button'}
					isDisabled={true}></XUIButton>
			</div>
			<div className={"testButtonContainer"}>
				<XUIButtonGroup>
					<XUIButton
						text={'Grouped Button One'}
						isGrouped={true}
						variant={'primary'}></XUIButton>
					<XUIButton
						text={'Grouped Button Two'}
						isGrouped={true}
						variant={'create'}></XUIButton>
					<XUIButton
						text={'Grouped Button Three'}
						isGrouped={true}></XUIButton>
				</XUIButtonGroup>
			</div>
			<div className={"testButtonContainer"}>
				<XUIButton
					text={'Click me for an alert'}
					onClick={clickHandler}></XUIButton>
			</div>
			<div className={"testButtonContainer"}>
				<XUIButton
					text={'Small button'}
					size={'small'}></XUIButton>
			</div>
			<div className={"testButtonContainer"}>
				<XUIButton
					text={'Full width button'}
					size={'full-width'}></XUIButton>
			</div>
			<div className={"testButtonContainer"}>
				<XUIButton
						text={'Simple anchor tag with no href'}
						type={'link'}></XUIButton>
			</div>
			<div className={"testButtonContainer"}>
				<XUIButton
					text={'Simple anchor tag with href'}
					type={'link'}
					href={'http://go.xero.com'}></XUIButton>
			</div>
			<div className={"testButtonContainer"}>
				<XUIButton
						text={'Anchor tag with `_blank` target'}
						type={'link'}
						href={'http://go.xero.com'}
						target={'_blank'}></XUIButton>
			</div>
			<div className={"testButtonContainer"}>
				<XUIButton
					text={'Button with non-XUI modifier class'}
					className={'fun-times'}></XUIButton>
			</div>
			<div className={"testButtonContainer"}>
				<XUIButton
					text={'Button with a QA hook class'}
					qaHook={'buttonQAHook'}></XUIButton>
			</div>
		</div>, document.getElementById('app')
	);
})();