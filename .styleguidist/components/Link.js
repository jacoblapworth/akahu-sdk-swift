import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Styled from 'rsg-components/Styled';
import XUIIcon from '../../src/react/icon';
import bookmark from '@xero/xui-icon/icons/bookmark';

export const styles = ({ color }) => ({
  link: {
    '&, &:link, &:visited': {
      color: color.link,
      cursor: 'pointer',
      lineHeight: 1.5,
      textDecoration: 'underline',
    },
    '&:hover': {
      color: color.linkHover,
      isolate: false,
    },
  },
});

const toggleChildren = () => {};

export function LinkRenderer({ classes, children, isDocLink, ...props }) {
  return (
    <a
      {...props}
      className={isDocLink ? undefined : cx(classes.link, props.className)}
      onClick={toggleChildren}
    >
      {isDocLink && (
        <XUIIcon className="xui-margin-right-xsmall" color="blue" icon={bookmark} size="large" />
      )}
      {children}
    </a>
  );
}

LinkRenderer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  isDocLink: PropTypes.bool,
};

export default Styled(styles)(LinkRenderer);
