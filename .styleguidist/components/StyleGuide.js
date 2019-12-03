import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Logo from 'rsg-components/Logo';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Markdown from 'rsg-components/Markdown';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Styled from 'rsg-components/Styled';
import cx from 'classnames';

import '../styles.scss';
import '../../src/sass/xui.scss';

const styles = ({ color, fontFamily, fontSize, mq, space, maxWidth }) => ({
  root: {
    color: color.base,
    backgroundColor: color.baseBackground,
    fontFamily: fontFamily.base,
  },
  hasSidebar: {
    paddingLeft: '17rem',
    [mq.small]: {
      paddingLeft: 0,
    },
  },
  content: {
    maxWidth,
    padding: [[space[2], space[4]]],
    margin: [[0, 'auto']],
    [mq.small]: {
      padding: space[2],
    },
    display: 'block',
  },
  sidebar: {
    backgroundColor: color.sidebarBackground,
    border: [[color.border, 'solid']],
    borderWidth: [[0, 1, 0, 0]],
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    width: '17rem',
    overflow: 'auto',
    [mq.small]: {
      position: 'static',
      width: 'auto',
      borderWidth: [[1, 0, 0, 0]],
      paddingBottom: space[0],
    },
  },
  logo: {
    padding: space[4],
    textAlign: 'center',
    borderBottom: [[1, color.border, 'solid']],
  },
  footer: {
    display: 'block',
    color: color.light,
    fontFamily: fontFamily.base,
    fontSize: fontSize.small,
  },
});

export function StyleGuideRenderer({ classes, title, homepageUrl, children, toc, hasSidebar }) {
  return (
    <div className={cx(classes.root, hasSidebar && classes.hasSidebar, 'xui-container')}>
      <main className={classes.content}>
        {children}
        <footer className={classes.footer}>
          <Markdown text={`Generated with [React Styleguidist](${homepageUrl})`} />
        </footer>
      </main>
      {hasSidebar && (
        <div className={classes.sidebar}>
          <div className={classes.logo}>
            <Logo>
              <svg width="65px" height="43px" viewBox="0 0 65 43" version="1.1">
                <title>{title}</title>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <path
                    d="M15.7501766,27 L23.4001766,16.8 C24.3942891,15.4745166 24.12566,13.5941125 22.8001766,12.6 C21.4746932,11.6058875 19.5942891,11.8745166 18.6001766,13.2 L12.0001766,22 L5.40017656,13.2 C4.40606401,11.8745166 2.52565995,11.6058875 1.20017656,12.6 C-0.125306844,13.5941125 -0.393935994,15.4745166 0.600176555,16.8 L8.25017656,27 L0.600176555,37.2 C-0.393935994,38.5254834 -0.125306844,40.4058875 1.20017656,41.4 C2.52565995,42.3941125 4.40606401,42.1254834 5.40017656,40.8 L12.0001766,32 L18.6001766,40.8 C19.5942891,42.1254834 21.4746932,42.3941125 22.8001766,41.4 C24.12566,40.4058875 24.3942891,38.5254834 23.4001766,37.2 L15.7501766,27 Z M58.0001766,15 C58.0001766,13.3431458 59.3433223,12 61.0001766,12 C62.6570308,12 64.0001766,13.3431458 64.0001766,15 L64.0001766,39 C64.0001766,40.6568542 62.6570308,42 61.0001766,42 C59.3433223,42 58.0001766,40.6568542 58.0001766,39 L58.0001766,15 Z M28.0001766,15 C28.0001766,13.3431458 29.3433223,12 31.0001766,12 C32.6570308,12 34.0001766,13.3431458 34.0001766,15 L34.0001766,28 C34.0001766,33.7505612 35.7792252,36.5 40.0001766,36.5 C44.2211279,36.5 46.0001766,33.7505612 46.0001766,28 L46.0001766,15 C46.0001766,13.3431458 47.3433223,12 49.0001766,12 C50.6570308,12 52.0001766,13.3431458 52.0001766,15 L52.0001766,28 C52.0001766,36.6585297 48.2204017,42.5 40.0001766,42.5 C31.7799514,42.5 28.0001766,36.6585297 28.0001766,28 L28.0001766,15 Z M58.1717494,6.82842712 C56.6096523,5.26632996 56.6096523,2.73367004 58.1717494,1.17157288 C59.7338466,-0.390524292 62.2665065,-0.390524292 63.8286037,1.17157288 C65.3907008,2.73367004 65.3907008,5.26632996 63.8286037,6.82842712 C62.2665065,8.39052429 59.7338466,8.39052429 58.1717494,6.82842712 Z"
                    id="Combined-Shape"
                    fill="#188FDB"
                    fillRule="nonzero"
                  ></path>
                </g>
              </svg>
            </Logo>
          </div>
          {toc}
        </div>
      )}
    </div>
  );
}

StyleGuideRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  homepageUrl: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  toc: PropTypes.node.isRequired,
  hasSidebar: PropTypes.bool,
};

export default Styled(styles)(StyleGuideRenderer);
