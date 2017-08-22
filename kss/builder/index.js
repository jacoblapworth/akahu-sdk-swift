'use strict';

/**
 * This module is a sub class of https://github.com/kss-node/kss-node/blob/063fd5039fb7f773a2087b2349dbaaf36aa724f9/builder/handlebars/builder.js
 * primarily used to overwrite the `createMenu` method.
 *
 * Note: this module is optional. If a builder does not export a KssBuilderBase
 * sub-class as a module, then kss-node will assume the builder wants to use
 * the KssBuilderBaseHandlebars class.
 *
 * @module kss/builder/handlebars
 */

const KssBuilderBaseHandlebars = require('kss/builder/handlebars');

/**
 * A kss-node builder that takes input files and builds a style guide using
 * Handlebars templates.
 */
class KssBuilderHandlebars extends KssBuilderBaseHandlebars {

	/**
	 * Overwrite createMenu to build a menu that supports three levels of Page
	 *
	 * This uses the page weight to determine if something is a page and then builds a new structure called items
	 * Original method located here: https://github.com/kss-node/kss-node/blob/063fd5039fb7f773a2087b2349dbaaf36aa724f9/builder/base/kss_builder_base.js#L1159
	 *
	 * @param {string} pageReference The reference of the root section of the page
	 *   being built.
	 * @returns {Array} An array of menu items that can be used as a template
	 *   variable.
	 */
	createMenu(pageReference) {
		// Helper function that converts a section to a menu item.
		const toMenuItem = function (section) {
			// @TODO: Add an option to "include" the specific properties returned.
			const menuItem = section.toJSON();
			// Remove data we definitely won't need for the menu.
			delete menuItem.markup;
			delete menuItem.modifiers;
			delete menuItem.parameters;
			delete menuItem.source;
			// Mark the current page in the menu.
			menuItem.isActive = (menuItem.reference === pageReference);
			// Mark any "deep" menu items.
			menuItem.isGrandChild = (menuItem.depth > 2);
			return menuItem;
		};

		const calcDepthOffset = function (item) {
			const depth2 = (item.weight % 1) !== 0 ? 1 : 0;
			const depth3 = ((item.weight % 1).toFixed(2).slice(-1) !== '0') ? 1 : 0;
			return depth2 + depth3;
		}

		const menu = [];
		let parentItem;
		let previousItem;

		// Retrieve all the root sections of the style guide.
		this.styleGuide.sections('x').map((rootSection) => {
			const menuItem = toMenuItem(rootSection);
			const depthOffset = calcDepthOffset(menuItem);
			menuItem.menuDepth = menuItem.depth + depthOffset;

			// Retrieve the child sections for each of the root sections.
			menuItem.children = this.styleGuide.sections(menuItem.reference + '.*').slice(1).map(toMenuItem);
			// Remove menu items that are deeper than the nav-depth option.
			// Add the menuDepth property with correct offset.
			menuItem.children = menuItem.children.filter(item => {
				item.menuDepth = item.depth + depthOffset;
				return item.depth <= this.options['nav-depth'];
			}, this);

			// Handle Depth 1 pages
			if (menuItem.menuDepth === 1) {
				menu.push(menuItem);
				parentItem = null;
			} else if (previousItem && menuItem.menuDepth > previousItem.menuDepth) {
				// Current page is first child of the previous page
				parentItem = previousItem;
				parentItem.menu = [menuItem];
			} else if (menuItem.menuDepth < previousItem.menuDepth) {
				// Current page is a sibling of the parent page
				parentItem = menu[menu.length - 1];
				parentItem.menu.push(menuItem);
			} else {
				// Curent page is child (not first) of previous page
				parentItem.menu.push(menuItem);
			}

			if (menuItem.isActive) {
				if (parentItem) {
					// set parent to active
					parentItem.isActive = true
				};
				// also set the current top level item to active
				menu[menu.length - 1].isActive = true;
			}
			previousItem = menuItem;
			return menuItem;
		});
		return menu;
	}
}

module.exports = KssBuilderHandlebars;
