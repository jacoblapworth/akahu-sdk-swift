import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import arrow from '@xero/xui-icon/icons/arrow-small';
import XUIIcon from '../icon/XUIIcon';
import XUIButton from '../button/XUIButton';
import { ns } from '../helpers/xuiClassNamespace';
import { userBreakpoints } from '../helpers/breakpoints';
import WidthContext from '../../contexts/WidthContext';
import XUIPicklist, { XUIPickitem } from '../../picklist';
import XUIDropdown, { XUIDropdownToggled } from '../../dropdown';

const baseClass = `${ns}-breadcrumb`;

const compactTrigger = (
  <XUIButton className={`${baseClass}--link ${baseClass}--dropdowntrigger`} variant="unstyled">
    ...
  </XUIButton>
);

const qualifiesForCompact = ({ swapAtBreakpoint, headerSizeState, crumbLength }) => {
  if (!swapAtBreakpoint || !headerSizeState || crumbLength < 3) {
    return false;
  }
  return !headerSizeState[swapAtBreakpoint];
};

// Builds the dropdown along with final, uncondensed breadcrumbitem.
const buildCompactBreadcrumbs = breadcrumbs => {
  // Build the set of pickitems that will go in the dropdown.
  const bcPickitems = breadcrumbs.slice(0, -1).map((crumb, index) => {
    const unique = `breadcrumb-${index}`;
    return (
      <XUIPickitem href={crumb.href} id={unique} key={unique}>
        {crumb.label || crumb}
      </XUIPickitem>
    );
  });

  // Build the list of new breadcrumb objects, including the dropdown with trigger.
  const compactItems = [];
  compactItems.push(
    <XUIDropdownToggled
      dropdown={
        <XUIDropdown>
          <XUIPicklist>{bcPickitems}</XUIPicklist>
        </XUIDropdown>
      }
      trigger={compactTrigger}
    />,
  );

  // Add the final breadcrumb from the original set.
  compactItems.push(breadcrumbs.slice(-1)[0]);
  return compactItems;
};

const getCrumbLabel = crumb => {
  if (crumb.type) {
    // HTML nodes and React components have a type property. Objects do not.
    return React.cloneElement(crumb, {
      // Don't tack the link class onto a ddt.
      className: cn(
        crumb.props.className,
        crumb.type !== XUIDropdownToggled && `${baseClass}--link`,
      ),
    });
  }
  if (!crumb.href) {
    return crumb.label;
  }
  return (
    <a className={`${baseClass}--link`} href={crumb.href}>
      {crumb.label}
    </a>
  );
};

const buildCrumbsWithCarets = crumbItemsToUse => {
  const crumbsWithCarets = [];

  /* eslint-disable react/no-array-index-key */
  crumbItemsToUse.forEach((crumb, itemIndex) => {
    const crumbContent = getCrumbLabel(crumb);
    const crumbClasses = cn(baseClass, typeof crumbContent === 'string' && `${baseClass}-no-link`);
    crumbsWithCarets.push(
      <li className={crumbClasses} key={itemIndex}>
        {crumbContent}
      </li>,
    );
    // Add a trailing caret, except for the last item.
    if (itemIndex !== crumbItemsToUse.length - 1) {
      crumbsWithCarets.push(
        <li className={`${baseClass}-arrow`} key={`arrow-${itemIndex}`}>
          <XUIIcon className={`${baseClass}--icon`} icon={arrow} isBoxed rotation={270} />
        </li>,
      );
    }
  });
  return crumbsWithCarets;
};

const XUIBreadcrumbTrail = ({ breadcrumbs, className, qaHook, swapAtBreakpoint }) => {
  return (
    <WidthContext.Consumer>
      {headerSizeState => {
        const listClasses = cn(className, `${baseClass}trail`);
        // Choose either the full set or the compact set, depending on context and props.
        let crumbItemsToUse;
        if (
          qualifiesForCompact({
            crumbLength: breadcrumbs.length,
            swapAtBreakpoint,
            headerSizeState,
          })
        ) {
          // Build the picklist, if props and item count call for it.
          crumbItemsToUse = buildCompactBreadcrumbs(breadcrumbs);
        } else {
          crumbItemsToUse = breadcrumbs;
        }

        return (
          <ol className={listClasses} data-automationid={qaHook}>
            {buildCrumbsWithCarets(crumbItemsToUse)}
          </ol>
        );
      }}
    </WidthContext.Consumer>
  );
};

export default XUIBreadcrumbTrail;

XUIBreadcrumbTrail.propTypes = {
  className: PropTypes.string,
  qaHook: PropTypes.string,
  /**
   * Array of objects or nodes from which to build breadcrumbs.
   */
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string,
      }),
    ]),
  ),
  /**
   * If a breadcrumb trail is more than two items long, items other than the last
   * will be condensed into a dropdown below this breakpoint. Functionality relies
   * on breadcrumbs appearing in PageHeader or another WidthContext provider.
   */
  swapAtBreakpoint: PropTypes.oneOf(Object.keys(userBreakpoints)),
};

XUIBreadcrumbTrail.defaultProps = {};
