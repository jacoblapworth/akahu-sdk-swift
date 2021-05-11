import cn from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import baseClass from './constants';

interface Props {
  className?: string;
  headerTitle: React.ReactNode;
}

const IntroBannerHeader = ({ className, headerTitle }: Props) => {
  const classes = cn(`${baseClass}--header`, className);

  return <header className={classes}>{headerTitle}</header>;
};

IntroBannerHeader.propTypes = {
  className: PropTypes.string,
  headerTitle: PropTypes.node.isRequired,
};

export { IntroBannerHeader as default };
