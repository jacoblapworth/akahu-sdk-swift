import React from 'react';
import ReactDOM from 'react-dom';
import XUIToggle, {XUIToggleOption} from '../../index.js';


const shared = {
	name: 'toggle-checkbox',
	onChange: () => {alert('Hello, World!')},
	type: 'checkbox'
};

(function() {
	ReactDOM.render(
		<div>
			<div className="xui-text-panelheading xui-margin-bottom">Checkbox toggle (inverted, fullwidth)</div>
			<div className="xui-panel xui-margin xui-padding xui-text-inverted">
				<XUIToggle color="inverted" layout="fullwidth">
					<XUIToggleOption {...Object.assign({}, shared, {isChecked: true})}>
						Checkbox<br/>Checkbox<br/>Checkbox<br/>
					</XUIToggleOption>
					<XUIToggleOption {...shared}>
						Pajamas
					</XUIToggleOption>
					<XUIToggleOption {...Object.assign({}, shared, {isDisabled: true})}>
						<svg className="xui-icon">
							<use xlinkHref="#xui-icon-desktop" role="presentation"></use>
						</svg>
						Disabled
					</XUIToggleOption>
					<XUIToggleOption {...Object.assign({}, shared, {isChecked: true, isDisabled: true})}>
						<svg className="xui-icon">
							<use xlinkHref="#xui-icon-desktop" role="presentation"></use>
						</svg>
						Checked and disabled
					</XUIToggleOption>
				</XUIToggle>
			</div>
		</div>,
		document.getElementById('app')
	);
})();


// const shared1 = {type: 'checkbox'};
// const shared2 = {isDisabled: true, name: 'toggle-radio-1'};
// const shared3 = {name: 'toggle-radio-2'};
// const shared4 = {name: 'toggle-checkbox',	onChange: () => {alert('Hello, World!')},	type: 'checkbox'};
// const shared5 = {isRequired: true, name: 'options'};


// function toggleForm() {
// 	alert('You selected: ' + document.getElementById('toggle-form').options.value);
// }


// (function() {
// 	ReactDOM.render(
// 		<div>

// 			<div className="xui-text-panelheading xui-margin-bottom">Checkbox toggle (standard, fullwidth)</div>
// 			<div className="xui-panel xui-margin xui-padding">
// 				<XUIToggle layout="fullwidth">
// 					<XUIToggleOption {...Object.assign({}, shared1, {isChecked: true})}>
// 						Checkbox<br/>Checkbox<br/>Checkbox<br/>
// 					</XUIToggleOption>
// 					<XUIToggleOption {...shared1}>
// 						Pajamas
// 					</XUIToggleOption>
// 					<XUIToggleOption {...Object.assign({}, shared1, {isDisabled: true})}>
// 						<svg className="xui-icon">
// 							<use xlinkHref="#xui-icon-desktop" role="presentation"></use>
// 						</svg>
// 						Disabled
// 					</XUIToggleOption>
// 					<XUIToggleOption {...Object.assign({}, shared1, {isChecked: true, isDisabled: true})}>
// 						<svg className="xui-icon">
// 							<use xlinkHref="#xui-icon-desktop" role="presentation"></use>
// 						</svg>
// 						Checked and disabled
// 					</XUIToggleOption>
// 				</XUIToggle>
// 			</div>

// 			<div className="xui-text-panelheading xui-margin-bottom">Radio toggle (inverted, disabled and fullwidth)</div>
// 			<div className="xui-panel xui-margin xui-padding xui-text-inverted">
// 				<XUIToggle color="inverted" layout="fullwidth">
// 					<XUIToggleOption {...shared2}>
// 						Radio<br/>Radio<br/>Radio<br/>
// 					</XUIToggleOption>
// 					<XUIToggleOption {...shared2}>
// 						Pajamas
// 					</XUIToggleOption>
// 					<XUIToggleOption {...shared2}>
// 						<svg className="xui-icon">
// 							<use xlinkHref="#xui-icon-desktop" role="presentation"></use>
// 						</svg>
// 						Disabled
// 					</XUIToggleOption>
// 					<XUIToggleOption {...Object.assign({}, shared2, {isChecked: true})}>
// 						<svg className="xui-icon">
// 							<use xlinkHref="#xui-icon-desktop" role="presentation"></use>
// 						</svg>
// 						Checked and disabled
// 					</XUIToggleOption>
// 				</XUIToggle>
// 			</div>

// 			<div className="xui-text-panelheading xui-margin-bottom">Checkbox toggle (standard, icon)</div>
// 			<div className="xui-panel xui-margin xui-padding">
// 				<XUIToggle layout="icon">
// 					<XUIToggleOption {...shared1}>
// 						<svg className="xui-icon">
// 							<use xlinkHref="#xui-icon-bold" role="presentation"></use>
// 						</svg>
// 					</XUIToggleOption>
// 					<XUIToggleOption {...shared1}>
// 						<svg className="xui-icon">
// 							<use xlinkHref="#xui-icon-italic" role="presentation"></use>
// 						</svg>
// 					</XUIToggleOption>
// 					<XUIToggleOption {...shared1}>
// 						<svg className="xui-icon">
// 							<use xlinkHref="#xui-icon-underline" role="presentation"></use>
// 						</svg>
// 					</XUIToggleOption>
// 				</XUIToggle>
// 			</div>

// 			<div className="xui-text-panelheading xui-margin-bottom">Radio toggle (inverted, icon)</div>
// 			<div className="xui-panel xui-margin xui-padding xui-text-inverted">
// 				<XUIToggle color="inverted" layout="icon">
// 					<XUIToggleOption {...shared3}>
// 						<svg className="xui-icon">
// 							<use xlinkHref="#xui-icon-desktop" role="presentation"></use>
// 						</svg>
// 					</XUIToggleOption>
// 					<XUIToggleOption {...shared3}>
// 						<svg className="xui-icon">
// 							<use xlinkHref="#xui-icon-mobile" role="presentation"></use>
// 						</svg>
// 					</XUIToggleOption>
// 					<XUIToggleOption {...shared3}>
// 						<svg className="xui-icon">
// 							<use xlinkHref="#xui-icon-print" role="presentation"></use>
// 						</svg>
// 					</XUIToggleOption>
// 				</XUIToggle>
// 			</div>

// 			<div className="xui-text-panelheading xui-margin-bottom">Checkbox toggle (standard, fullwidth, onChange, padding)</div>
// 			<div className="xui-panel xui-margin xui-padding">
// 				<XUIToggle layout="fullwidth">
// 					<XUIToggleOption {...shared4} value="One"><span className="xui-padding-vertical">One</span></XUIToggleOption>
// 					<XUIToggleOption {...shared4} value="Two">Two</XUIToggleOption>
// 					<XUIToggleOption {...shared4} value="Three">Three</XUIToggleOption>
// 					<XUIToggleOption {...shared4} value="Four">Four</XUIToggleOption>
// 					<XUIToggleOption {...shared4} value="Five">Five</XUIToggleOption>
// 				</XUIToggle>
// 			</div>

// 			<div className="xui-text-panelheading xui-margin-bottom">Radio toggle form</div>
// 			<div className="xui-panel xui-margin xui-padding">
// 				<form id="toggle-form" onSubmit={() => {toggleForm()}}>
// 					<XUIToggle layout="icon">
// 						<XUIToggleOption {...shared5} value="Person">
// 							<svg className="xui-icon">
// 								<use xlinkHref="#xui-icon-contact" role="presentation"></use>
// 							</svg>
// 						</XUIToggleOption>
// 						<XUIToggleOption {...shared5} value="Truck">
// 							<svg className="xui-icon">
// 								<use xlinkHref="#xui-icon-shipping" role="presentation"></use>
// 							</svg>
// 						</XUIToggleOption>
// 						<XUIToggleOption {...shared5} value="World">
// 							<svg className="xui-icon">
// 								<use xlinkHref="#xui-icon-url" role="presentation"></use>
// 							</svg>
// 						</XUIToggleOption>
// 					</XUIToggle>
// 					<div className="xui-actions">
// 						<button type="submit" className="xui-button xui-button-main xui-actions--primary">Submit</button>
// 					</div>
// 				</form>
// 			</div>

// 		</div>,
// 		document.getElementById('app')
// 	);
// })();
