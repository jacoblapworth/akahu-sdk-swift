import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ns } from '../helpers/xuiClassNamespace';
import XUIPickitem from './XUIPickitem';
import { getPropsFromFirstChildOrList } from './private/helpers';

const XUINestedPicklist = (props, context) => {
  const { children, className, qaHook, secondaryProps, shouldTruncate } = props;
  const listLevelProps = getPropsFromFirstChildOrList(children, props);

  const newChildren = React.Children.map(children, child =>
    child.type === XUIPickitem
      ? React.cloneElement(child, {
          ariaRole: 'treeitem',
          isMultiselect: listLevelProps.listMultiselect,
          // This is ok to be set at either the item level or the list level.
          shouldTruncate:
            child.props.shouldTruncate === undefined ? shouldTruncate : child.props.shouldTruncate,
        })
      : child,
  );
  return (
    <ul
      {...secondaryProps}
      className={cn(className, `${ns}-submenu ${ns}-submenu-layout`)}
      data-automationid={qaHook}
      id={context.id}
    >
      {newChildren}
    </ul>
  );
};

export default XUINestedPicklist;

XUINestedPicklist.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  /** When true checkboxes will be added to the layout of the child components. */
  isMultiselect: PropTypes.bool,
  qaHook: PropTypes.string,
  secondaryProps: PropTypes.object,
  /** Whether to truncate text instead of wrapping. */
  shouldTruncate: PropTypes.bool,
};

XUINestedPicklist.defaultProps = {
  /*
	 DO NOT REMOVE
	 This property is needed so that the StatefulPicklist will properly recognize this
	 component as the root node for a nested list when traversing the children tree.
	 */
  _isGroup: true, // eslint-disable-line
  secondaryProps: {
    role: 'group',
  },
};

XUINestedPicklist.contextTypes = {
  id: PropTypes.string,
};
