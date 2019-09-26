// global process
import React from 'react';
import versions from './versions';

// This is only exported so it can be tested
// eslint-disable-next-line import/prefer-default-export
export function checkReactVersion(actualVersion, requiredVersion, logError) {
  const reactVersionSegments = requiredVersion.split('.');
  if (typeof React.version === 'string' && reactVersionSegments[0].indexOf('^') === 0) {
    const supportedReactMajorVersion = parseInt(reactVersionSegments[0].substring(1));
    const minimumSupportedReactMinorVersion = parseInt(reactVersionSegments[1]);
    const minimumSupportedReactPatchVersion = parseInt(reactVersionSegments[2]);

    const actualReactVersionSegments = actualVersion.split('.');
    const actualReactMajorVersion = parseInt(actualReactVersionSegments[0]);
    const actualReactMinorVersion = parseInt(actualReactVersionSegments[1]);
    const actualReactPatchVersion = parseInt(actualReactVersionSegments[2]);

    if (
      actualReactMajorVersion !== supportedReactMajorVersion ||
      actualReactMinorVersion < minimumSupportedReactMinorVersion ||
      (actualReactMinorVersion === minimumSupportedReactMinorVersion &&
        actualReactPatchVersion < minimumSupportedReactPatchVersion)
    ) {
      logError(
        `XUI error: The version of React used (${actualVersion}) is incompatible with this version of XUI which requires ${requiredVersion}`,
      );
    }
  }
}

if (process.env.NODE_ENV === 'development') {
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
        logWarning(
          "XUI warning: The XUI CSS is not being served via HTTPS. Please check the XUI <link> tag's protocol",
        );
      }

      if (linkVersion !== versions.xui) {
        logWarning(
          `XUI warning: The XUI CSS version (${linkVersion}) is different to that of the components your JS is consuming (${versions.xui}). Please check the version used in the <link> tag on this page.`,
        );
      }

      if (foundXUI) {
        logWarning(
          'XUI warning: This page contains multiple XUI CSS files. Please ensure there is only one version of XUI on the page.',
        );
      }

      foundXUI = true;
    });

    checkReactVersion(React.version, versions.react, logError);
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
