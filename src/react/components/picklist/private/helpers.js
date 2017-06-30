import React, { Children } from 'react';

/**
 * Accepts one or more functions and curries a function that will call each passed function with the arguments passed
 * to the curried function.
 *
 * @public
 * @param {Function} fns
 * @returns {Function}
 */
export function compose(...fns) {
	return function () {
		fns.forEach(fn => {
			if (typeof fn === 'function') {
				fn.apply(this, arguments);
			}
		});
	}
}

/**
 * Get the actual React component for a given element in the Children tree.  Useful for getting state off of a
 * Component.
 *
 * @public
 * @param {Object} idCache
 * @param {Component} component
 * @returns {Component}
 */
export function getInstanceForChild(idCache, component) {
	return idCache[getId(component)];
}

/**
 * Safely get the ID of a child node.
 *
 * @public
 * @param {Component} node
 * @returns {string|undefined}
 */
export const getId = node => node && node.props && node.props.id;

/**
 * @private
 * Test for a react component.
 *
 * @param {Component} node
 * @returns {boolean}
 */
const isComponent = node => node && node.props;

/**
 * @private
 * Test to see if a node is a NestedGroupContainer
 *
 * @param {Component} node
 * @returns {boolean}
 */
const isNestedListContainer = node => isComponent(node) && node.props._isGroupContainer;

/**
 * @private
 * Test to see if a given node is a collapsed NestedGroupContainer.
 *
 * @param {Component} node
 * @param {Object} idCache
 * @returns {boolean}
 */
const isCollapsedNestedListContainer =
	(node, idCache) => !!(isNestedListContainer(node) && idCache && !getInstanceForChild(idCache, node).isOpen());

/**
 * @public
 * Test to see if a given node is the trigger that will open/close a nested group.
 *
 * @param {Component} node
 * @returns {boolean}
 */
export const isNestedListTrigger = node => isComponent(node) && node.props._isGroupTrigger;

/**
 * @private
 * Test to see if a given node is a nested group.
 *
 * @param {Component} node
 * @returns {boolean}
 */
const isNestedList = node => isComponent(node) && node.props._isGroup;

/**
 * @public
 * Generic walk method over dropdown children
 *
 * @param {Component} node
 * @param {Function} test
 * @param {{[idCache]: Object, [inCollapsedGroup]: boolean}} [opts]
 *
 * @returns {boolean}
 */
export function walk(node, test, opts={}) {
	const { inCollapsedGroup, idCache } = opts;
	if (test(node, inCollapsedGroup) === true) {
		return true;
	}
	if (isComponent(node)) {
		if (Array.isArray(node.props.children)) {
			const iterator = child => {
				const childOpts = {
					inCollapsedGroup: inCollapsedGroup || (isNestedList(child) && isCollapsedNestedListContainer(node, idCache)),
					idCache
				};
				return walk(child, test, childOpts);
			};
			if (node.props.children.some(iterator)) {
				return true;
			}
		} else if (node.props.children != null) {
			return walk(node.props.children, test, opts);
		}
	}
}

/**
 * Determine if the given parent node contains the target node.
 *
 * @private
 * @param {Component} parent
 * @param {Component} target
 * @returns {boolean}
 */
function contains(parent, target) {
	let found = false;
	const find = node => {
		if (matches(node, target)) {
			found = true;
			return true;
		}
	};
	walk(parent, find);
	return found;
}

/**
 * @public
 * Test for a menu item on a node.
 *
 * @param {Component} node
 * @returns {boolean}
 */
export const isMenuItem = node => isComponent(node) && node.props._isMenuItem;

/**
 * @public
 * Test to see if a given node is a split menu item.
 *
 * @param {Component} node
 * @returns {boolean}
 */
export const isSplitMenuItem = node => isComponent(node) && node.props.isSplit;

/**
 * @private
 * Test to see if a node is a selected menu item.
 *
 * @param {Component} node
 * @returns {boolean}
 */
const isSelectedMenuItem = node => isMenuItem(node) && node.props.isSelected;

/**
 * @private
 * Compared against their IDs to find the matching element.
 *
 * @param {Component} node
 * @param {Component} el
 * @returns {boolean}
 */
const matches = (node, el) => getId(node) === getId(el);

/**
 * @private
 * Tests if the node is a react component and if the component is disabled.
 *
 * @param {Component} node
 * @returns {boolean}
 */
const isEnabledMenuItem = node  => isMenuItem(node) && !node.props.isDisabled;

/**
 * @private
 * Returns the very last item in the dropdown even if this is in a nested group.
 *
 * @param {Component} node
 * @param {Object} idCache
 * @return {Component|null} Last Menu Item in the dropdown
 */
function findLastMenuItem(node, idCache) {
	let lastItem = null;
	const findLast = (node, inCollapsedGroup) => {
		if (!inCollapsedGroup && isEnabledMenuItem(node)) {
			lastItem = node;
		}
	};
	walk(node, findLast, {idCache});
	return lastItem;
}


/**
 * Find the item the precedes the current highlighted item, even if this is in the
 * previous group or from the top of the list to the very end.
 *
 * @public
 * @param {Component} node - That contains children in the list, could be a single element or an array of nodes.
 * @param {Component} el - element to find
 * @param {Object} idCache
 *
 * @return (Component|null) nextItem that should be highlighted.
 */
export function findPreviousItem(node, el, idCache) {
	if (!el) {
		return findLastMenuItem(node, idCache);
	}

	let previousItem = null;

	const findPrevious = (node, inCollapsedGroup) => {
		if (matches(node, el)) {
			return true;
		}
		if (!inCollapsedGroup && isEnabledMenuItem(node)) {
			previousItem = node;
		}
	};

	walk(node, findPrevious, {idCache});
	if (previousItem == null) {
		return findLastMenuItem(node, idCache);
	}
	return previousItem;
}

/**
 * Returns the very first menu item in the dropdown.
 *
 * @public
 * @param {Component} node
 * @return {Component} First item in the dropdown.
 */
function findFirstMenuItem(node) {
	let item = null;
	const findFirst = node => {
		if (isEnabledMenuItem(node)) {
			item = node;
			return true;
		}
	};
	walk(node, findFirst);
	return item;
}

/**
 * Find the next item to be highlighted in the list, if we're at the end of the
 * list loop back to the beginning of the list even if this is in a different group to the current item.
 *
 * @public
 * @param {Component} node - That contains children in the list, could be a single element or an array of nodes.
 * @param {Component} el - The item that's been identified as the next to be highlighted
 * @param {Object} idCache
 *
 * @return {Component|null} nextItem that should be highlighted.
 */
export function findNextItem(node, el, idCache) {
	let nextItem = null;
	let found = false;

	// If there is no highlighted element, select the first item in the first group
	if (!el) {
		return findFirstMenuItem(node);
	}

	const findNextMenuItem = (node, inCollapsedGroup) => {
		if (found && !inCollapsedGroup && isEnabledMenuItem(node)) {
			nextItem = node;
			return true;
		}
		if (!found && matches(node, el)) {
			found = true;
		}
	};

	walk(node, findNextMenuItem, {idCache});

	if (nextItem == null) {
		return findFirstMenuItem(node);
	}

	return nextItem;
}

/**
 * When we first open up the menu, we need to determine which element is highlighted by default.  This will find either
 * the first selected item or the first item in the menu.
 *
 * @public
 * @param {Component} node
 * @param {Object} idCache
 * @returns {Component|null}
 */
export function findInitialHighlightedItem(node, idCache) {
	let item = null;
	const findSelected = (node, inCollapsedGroup) => {
		if (!inCollapsedGroup && isSelectedMenuItem(node)) {
			item = node;
			return true;
		}
	};
	walk(node, findSelected, {idCache});

	return item == null ? findFirstMenuItem(node) : item;
}

/**
 * If the given target is a child of a nested group, return the group container node that wraps it.
 *
 * @public
 * @param {Component} list
 * @param {Component} target
 * @returns {Component|null}
 */
export function findParentGroupContainer(list, target) {
	let container = null;
	let found = false;
	const findGroup = node => {
		if (!found && isNestedListContainer(node)) {
			container = node;
		}

		if (matches(node, target)) {
			found = true;
			return true;
		}
	};
	walk(list, findGroup);
	if (found && contains(container, target)) {
		return container;
	}
	return null;
}

/**
 * Cloning a menu item means ensuring that callbacks and the isHighlighted state are injected into the component as
 * well as cloning the children tree to ensure all menu items are cloned.
 *
 * @private
 * @param {Component} node
 * @param {StatefulPicklist} spl
 * @returns {Component}
 */
function cloneMenuItem(node, spl) {
	const id = node.props.id;
	const injectedProps = {
		isHighlighted: matches(node, spl.state.highlightedElement),
		onMouseOver: compose(node.props.onMouseOver, event => spl.onMouseOver(event, id)),
		ref: compose(node.ref, c => spl.idCache[getId(node)] = c)
	};

	if (!isNestedListTrigger(node)) {
		injectedProps.onClick = compose(node.props.onClick, event => spl.onClick(event, id));
	}

	return React.cloneElement(node, injectedProps, cloneChildren(node.props.children, spl));
}

/**
 * Clone branch of the children tree.  If the given element is a menu item, make sure that gets handled as well.
 *
 * @private
 * @param {Component} node
 * @param {StatefulPicklist} spl
 * @returns {Component}
 */
function cloneChildElement(node, spl) {
	if (isComponent(node)) {
		if (isMenuItem(node)) {
			return cloneMenuItem(node, spl);
		}
		if (node.props.children) {
			const injectedProps = {};
			if (isNestedListContainer(node)) {
				injectedProps.ref = compose(node.ref, c => spl.idCache[getId(node)] = c);
			}
			return React.cloneElement(node, injectedProps, cloneChildren(node.props.children, spl));
		}
	}
	return node;
}

/**
 * Clone a component's children and handle any descendant menu items.
 *
 * @public
 * @param {Component|Component[]} children
 * @param {StatefulPicklist} spl
 * @returns {Component|Component[]}
 */
export function cloneChildren(children, spl) {
	// Using Children.map to avoid having to add arbitrary keys, which will fuck all kinds of things up.  Don't just use
	// Array.prototype.map here!
	return Children.map(children, child => cloneChildElement(child, spl));
}
