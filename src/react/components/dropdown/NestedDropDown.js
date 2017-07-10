import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import DropDownListBox from './DropDownListBox';
import DropDown from './DropDown';
import { compose } from '../helpers/compose';

import './scss/_dropDown.scss';

/**
 * <strong>BETA</strong> This component is still under active development and it's API may change.
 *
 * NestedDropDown is a DropDown replacement used when a user workflow will take place inside of the
 * dropdown.  Multiple panels are added as children and the active panel's ID is a prop on this
 * component.
 *
 * @export
 * @class NestedDropDown
 * @extends {DropDown}
 */
export default class NestedDropDown extends DropDown {
	componentDidUpdate(prevProps, prevState) {
		super.componentDidUpdate(prevProps,prevState);
		const { currentPanel, onPanelChange } = this.props;
		if (onPanelChange && prevProps.currentPanel !== currentPanel) {
			onPanelChange(currentPanel, prevProps.currentPanel);
		}
	}

	render() {
		const dropdown = this;
		const {
			size,
			footer,
			className,
			isHidden,
			children,
			qaHook,
			style,
			onSelect,
			currentPanel,
			fixedWidth,
			onCloseAnimationEnd,
			onOpenAnimationEnd,
			animateClosed,
			animateOpen,
			forceDesktop,
		} = dropdown.props;

		const dropdownClasses = cn('xui-dropdown-fullheight', className);

		let currentPanelHeader;
		const childrenToRender =
			React.Children.map(children, (child) => {
				const isCurrentPanel = (child.props && child.props.panelId === currentPanel);
				if (isCurrentPanel) {
					currentPanelHeader = child.props.header;
				}
				return (
					<div className={cn({ 'xui-u-hidden': !isCurrentPanel })}>
						{
							isCurrentPanel ?
								React.cloneElement(child, {
									ref: oc => dropdown.panel = oc,
									onSelect: compose(child.props.onSelect, onSelect),
									onHighlightChange: compose(child.props.onHighlightChange, dropdown.onHighlightChange)
								})
								: child
						}
					</div>
				);
			});

		return (
			<DropDownListBox
				id={dropdown.dropdownId}
				isHidden={isHidden}
				footer={footer}
				header={currentPanelHeader}
				className={dropdownClasses}
				size={size}
				qaHook={qaHook}
				ref={c => dropdown.listBox = c}
				onKeyDown={dropdown.onKeyDown}
				style={style}
				onOpenAnimationEnd={onOpenAnimationEnd}
				onCloseAnimationEnd={onCloseAnimationEnd}
				fixedWidth={fixedWidth}
				animateOpen={animateOpen}
				animateClosed={animateClosed}
				forceDesktop={forceDesktop}
			>
				{childrenToRender}
			</DropDownListBox>
		);
	}
}

NestedDropDown.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	qaHook: PropTypes.string,

	/** Style attribute on the dropdown node */
	style: PropTypes.object,

	/** Whether or not the dropdown is hidden */
	isHidden: PropTypes.bool,

	/** Applies correct XUI class based on prop value. Default will fits to children's width. */
	size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),

	/** Pass in an array of KeyboardEvent keycodes to be ignored from dropdown behaviour. */
	ignoreKeyboardEvents: PropTypes.array,

	/** DOM ID of the list */
	id: PropTypes.string,

	/** Items to be added to the menu's footer */
	footer: PropTypes.element,

	/** Enable a generalised callback when an item has been selected. */
	onSelect: PropTypes.func,

	/** Whether or not the dropdown should take focus and handle keyboard events automatically */
	hasKeyboardEvents: PropTypes.bool,

	/** Callback for when the highlighted item in the dropdown changes. */
	onHighlightChange: PropTypes.func,

	/** The `panelId` propety of the panel which should currently be open */
	currentPanel: PropTypes.string,

	/** Callback for when the open DropDownPanel changes. Receives the name of the selected panel, and the previously selected panel. */
	onPanelChange: PropTypes.func,

	/** Callback to trigger opening of another panel. Takes destination panel name as a parameter. */
	onPanelSelect: PropTypes.func,

	/** Whether the fixed width class variant should be used for the size prop.  Does nothing if no size is provided. */
	fixedWidth: PropTypes.bool,

	/** Force the desktop UI, even if the viewport is narrow enough for mobile. */
	forceDesktop: PropTypes.bool,

	/** Will add the closing animation class */
	animateClosed: PropTypes.bool,

	/** Will add an opening animation class */
	animateOpen: PropTypes.bool,

	/** Callback for when the closing animation has stopped. */
	onCloseAnimationEnd: PropTypes.func,

	/** Callback for when animation has ended on open. */
	onOpenAnimationEnd: PropTypes.func,
};

NestedDropDown.defaultProps = {
	ignoreKeyboardEvents: [],
	isHidden: false,
	hasKeyboardEvents: true,
	restrictFocus: true,
	size: 'large',
	fixedWidth: true,
	forceDesktop: false,
	animateOpen: false,
	animateClosed: false,
};
