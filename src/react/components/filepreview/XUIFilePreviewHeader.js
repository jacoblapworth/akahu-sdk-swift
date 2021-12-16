import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';
import shouldRender from '../helpers/shouldRender';
import useContainerQuery from '../../helpers/useContainerQuery';

const baseClass = `${ns}-filepreviewheader`;

const XUIFilePreviewHeader = ({
  actions,
  children,
  className,
  headerTag,
  headingLevel,
  navigationButton,
  qaHook,
  secondary,
  title,
  ...spreadProps
}) => {
  const { isWidthAboveBreakpoint, observedElementRef } = useContainerQuery();

  const classes = cn(
    className,
    baseClass,
    isWidthAboveBreakpoint('small') && `${baseClass}-medium-up`,
  );
  const HeaderElem = headerTag;
  const HeadingTag = `h${headingLevel}`;

  const controlContent = shouldRender(navigationButton) && (
    <div className={`${baseClass}--controlcontent`}>{navigationButton}</div>
  );

  const titleTags = (
    <div className={`${baseClass}--titlewrapper`}>
      <HeadingTag
        className={`${baseClass}--title`}
        data-automationid={qaHook && `${qaHook}--title`}
      >
        {title}
      </HeadingTag>
      {shouldRender(secondary) && (
        <div
          className={`${baseClass}--secondarytitle`}
          data-automationid={qaHook && `${qaHook}--secondarytitle`}
        >
          {secondary}
        </div>
      )}
    </div>
  );
  const leftContent = (
    <div className={`${baseClass}--leftcontent`}>
      {controlContent}
      {titleTags}
    </div>
  );
  const rightContent = shouldRender(actions) && (
    <div className={`${baseClass}--rightcontent`}>
      {actions && <div className={`${baseClass}--actions`}>{actions}</div>}
    </div>
  );
  return (
    <HeaderElem
      {...spreadProps}
      className={classes}
      data-automationid={qaHook}
      ref={observedElementRef}
    >
      {leftContent}
      {children}
      {rightContent}
    </HeaderElem>
  );
};
export default XUIFilePreviewHeader;

XUIFilePreviewHeader.propTypes = {
  /**
   * Components or html to be right-aligned in the filepreviewheader
   */
  actions: PropTypes.node,
  /**
   * Content to go in the header. It's unlikely that you will need to use this.
   */
  children: PropTypes.node,
  /**
   * Classes to be applied to the filepreviewheader element
   */
  className: PropTypes.string,
  /**
   * Tag type for the filepreviewheader element. Defaults to 'header'
   */
  headerTag: PropTypes.string,
  /**
   * The level of heading that should be assigned to the title. Defaults to 2.
   */
  headingLevel: PropTypes.number,
  /**
   * Navigation button to appear to the left of the heading. Used to close/minimise the preview.
   */
  navigationButton: PropTypes.node,
  qaHook: PropTypes.string,
  /**
   * Secondary title
   */
  secondary: PropTypes.node,
  /**
   * Title text or node. Required.
   */
  title: PropTypes.node.isRequired,
};

XUIFilePreviewHeader.defaultProps = {
  headerTag: 'header',
  headingLevel: 2,
};
