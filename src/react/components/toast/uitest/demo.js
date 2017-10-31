/* eslint-disable no-console */
import React from 'react';
import ReactDOM from 'react-dom';
import XUIToast from '../XUIToast';
import XUIToastAction from '../XUIToastAction';
import XUIToastActions from '../XUIToastActions';
import XUIToastMessage from '../XUIToastMessage';
import XUIToastWrapper from '../XUIToastWrapper';

const rowClasses = 'xui-row-flex xui-u-flex-space-around xui-margin-bottom-small';
const noop = () => {};

const standard = (
	<section>
		<h3> Standard Toasts </h3>
		<div className={rowClasses}>
			<XUIToast qaHook="toast-example">
				<XUIToastMessage qaHook="toast-example--message"> Standard  </XUIToastMessage>
			</XUIToast>
			<XUIToast onCloseClick={noop}>
				<XUIToastMessage> Closable </XUIToastMessage>
			</XUIToast>
		</div>
	</section>
);

const action = (
	<section>
		<h3>Single Action Toasts </h3>
		<div className={rowClasses}>
			<XUIToast qaHook="toast-singleaction">
				<XUIToastMessage qaHook="toast-singleaction--message"> Standard  </XUIToastMessage>
				<XUIToastAction qaHook="toast-singleaction--action"> Action </XUIToastAction>
			</XUIToast>
			<XUIToast onCloseClick={noop}>
				<XUIToastMessage> Closable </XUIToastMessage>
				<XUIToastAction href="https://xero.com"> Action </XUIToastAction>
			</XUIToast>
			<XUIToastWrapper>
				<XUIToast onCloseClick={noop}>
					<XUIToastMessage> Wrapper Toast </XUIToastMessage>
				</XUIToast>
			</XUIToastWrapper>
		</div>
	</section>
)

const actions = (
	<section>
		<h3>Multi Action Toasts </h3>
		<XUIToast qaHook="toast-multiaction">
			<XUIToastMessage qaHook="toast-multiaction--message"> Standard  </XUIToastMessage>
			<XUIToastActions qaHook="toast-multiaction--actions">
				<XUIToastAction qaHook="toast-multiaction-actionone"> Action One  </XUIToastAction>
				<XUIToastAction qaHook="toast-multiaction--actiontwo"> Action Two  </XUIToastAction>
			</XUIToastActions>
		</XUIToast>
		<XUIToast onCloseClick={noop}>
			<XUIToastMessage> Closable  </XUIToastMessage>
			<XUIToastActions>
				<XUIToastAction> Action One  </XUIToastAction>
				<XUIToastAction> Action Two  </XUIToastAction>
			</XUIToastActions>
		</XUIToast>
	</section>
);

ReactDOM.render(
	<div className="xui-page-width-large">
		{standard}
		{action}
		{actions}
	</div>,
	document.getElementById('app')
);
