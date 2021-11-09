import React from 'react';
import PropTypes from 'prop-types';
import cx from 'clsx';
import Styled from 'rsg-components/Styled';

const styles = ({ color, fontFamily, fontSize }) => ({
  heading: {
    margin: 0,
    color: color.base,
    fontFamily: fontFamily.base,
    fontWeight: 'bold',
  },
  heading1: {
    fontSize: fontSize.h1,
  },
  heading2: {
    fontSize: fontSize.h2,
  },
  heading3: {
    fontSize: fontSize.h3,
  },
  heading4: {
    fontSize: fontSize.h4,
  },
  heading5: {
    fontSize: fontSize.h5,
  },
  heading6: {
    fontSize: fontSize.h6,
  },
  wrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
  },
});

function HeadingRenderer({ classes, level, children, introduced, ...props }) {
  const Tag = `h${level}`;
  const headingClasses = cx(classes.heading, classes[`heading${level}`]);

  let heading = children;
  let versionIntroduced = introduced;

  if (Array.isArray(children) && typeof children[0] === 'string') {
    [heading, versionIntroduced] = children[0].split(' | ');
  }

  const headingURI = String(heading).trim().toLocaleLowerCase().replace(/\W/g, '-');

  return (
    <div className={classes.wrapper}>
      <Tag {...props} className={headingClasses}>
        {heading}
      </Tag>
      {versionIntroduced && (
        <a
          aria-describedby={`${headingURI}-introduced`}
          className="ds-flag ds-status--version"
          href={`https://github.dev.xero.com/UXE/xui/releases/tag/${versionIntroduced}`}
        >
          {versionIntroduced}+
          <span className="hover-tooltip hover-tooltip-below" id={`${headingURI}-introduced`}>
            Introduced in XUI {versionIntroduced}
          </span>
        </a>
      )}
    </div>
  );
}

HeadingRenderer.propTypes = {
  classes: PropTypes.object.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  children: PropTypes.node,
};

export default Styled(styles)(HeadingRenderer);
