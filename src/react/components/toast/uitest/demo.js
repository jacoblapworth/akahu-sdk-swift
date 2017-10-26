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
			<XUIToast>
				<XUIToastMessage> Standard  </XUIToastMessage>
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
			<XUIToast>
				<XUIToastMessage> Standard  </XUIToastMessage>
				<XUIToastAction> Action </XUIToastAction>
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
		<XUIToast>
			<XUIToastMessage> Standard  </XUIToastMessage>
			<XUIToastActions>
				<XUIToastAction> Action One  </XUIToastAction>
				<XUIToastAction> Action Two  </XUIToastAction>
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
