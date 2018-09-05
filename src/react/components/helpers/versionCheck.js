/* global process */
import React from 'react';
import versions from './versions';

if (process.env.NODE_ENV === 'development') {
	const reactVersionSegments = versions.react.split('.');
	const supportedReactMajorVersion = parseInt(reactVersionSegments[0].substring(1));
	const minimumSupportedReactMinorVersion = parseInt(reactVersionSegments[1]);

	// eslint-disable-next-line no-console
	const logWarning = message => console.warn(message);
	// eslint-disable-next-line no-console
	const logError = message => console.error(message);

	const checkXUI = () => {
		const stylesheets = [...document.styleSheets];
		let foundXUI = false;

		stylesheets.forEach(({ href }) => {
			if (href == null || href.indexOf('xui') === -1) {
				return;
			}

			const xuiRegex = /^(https?:)?\/\/edge\.xero\.com\/style\/xui\/([^/]*)\/xui(\.min)?\.css$/;
			const results = xuiRegex.exec(href);

			if (!results) {
				return;
			}

			const [, protocol, linkVersion] = results;

			if (protocol === 'http:') {
				// eslint-disable-next-line max-len
				logWarning('XUI warning: The XUI CSS is not being served via HTTPS. Please check the XUI <link> tag\'s protocol');
			}

			if (linkVersion !== versions.xui) {
				// eslint-disable-next-line max-len
				logWarning(`XUI warning: The XUI CSS version (${linkVersion}) is different to that of the components your JS is consuming (${versions.xui}). Please check the version used in the <link> tag on this page.`);
			}

			if (foundXUI) {
				// eslint-disable-next-line max-len
				logWarning('XUI warning: This page contains multiple XUI CSS files. Please ensure there is only one version of XUI on the page.');
			}

			foundXUI = true;
		});

		if (typeof React.version === 'string') {
			const actualReactVersionSegments = React.version.split('.');
			if (
				parseInt(actualReactVersionSegments[0]) !== supportedReactMajorVersion
				|| parseInt(actualReactVersionSegments[1]) < minimumSupportedReactMinorVersion
			) {
				// eslint-disable-next-line max-len
				logError(`XUI error: The version of React used (${React.version}) is incompatible with this version of XUI which requires >= 16.2.0`);
			}
		}
	};

	if (typeof document !== 'undefined') {
		if (document.readyState === 'complete') {
			checkXUI();
		} else {
			const onLoad = () => {
				window.removeEventListener('load', onLoad);
				checkXUI();
			};

			window.addEventListener('load', onLoad);
		}
	}
}
