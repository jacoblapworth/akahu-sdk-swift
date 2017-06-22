import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import checkboxCheck from '@xero/xui-icon/icons/checkbox-check';
import DropDownListBox from './DropDownListBox';
import DropDownHeader from './DropDownHeader';
import DropDown from './DropDown';
import XUIIcon from '../icon/XUIIcon';
import { compose } from './private/helpers';

import './scss/_dropDown.scss';

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
			onCloseAnimationEnd,
			onSelect,
			headingAttributes,
			currentPanel,
			onPanelSelect,
		} = dropdown.props;

		const dropdownClasses = cn('xui-dropdown-fullheight', className);
		let parentPanel;
		let panelHeading;

		const childrenToRender =
			React.Children.map(children, (child) => {
				const isCurrentPanel = (child.props && child.props.panelName === currentPanel);
				if (isCurrentPanel) {
					({panelHeading, parentPanel} = child.props);
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

		const header =
			<DropDownHeader
				title={panelHeading}
				onSecondaryClick={() => dropdown.dropdown.clossdeDropDown()}
				onPrimaryClick={dropdown.onSelect}
				onBackButtonClick={parentPanel ? () => onPanelSelect(parentPanel) : null}
				displayPrimaryButton={true}
				primaryButtonContent={<XUIIcon path={checkboxCheck} inline={true}/>}
				onlyShowForMobile={false}
				{...headingAttributes} />;

		return (
			<DropDownListBox
				id={dropdown.dropdownId}
				isHidden={isHidden}
				footer={footer}
				header={header}
				className={dropdownClasses}
				size={size}
				qaHook={qaHook}
				ref={c => dropdown.listBox = c}
				onKeyDown={dropdown.onKeyDown}
				style={style}
				onCloseAnimationEnd={onCloseAnimationEnd}
				fixedWidth={true}
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

	/** @property {Object} Style attribute on the dropdown node */
	style: PropTypes.object,

	/** @property {Boolean} [isHidden] default false*/
	isHidden: PropTypes.bool,

	/** @property {String} [size] Takes 'small', 'medium', 'large', or 'xlarge' and applies correct XUI class based on these. Default will fits to children's width*/
	size: PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),

	/** @property {Array} [ignoreKeyboardEvents] Pass in an array of keydown keycodes to be ignored from dropdown behaviour. */
	ignoreKeyboardEvents: PropTypes.array,

	/** @property {String} [id] id of the list */
	id: PropTypes.string,

	/** @property {Element} [footer] Items to be added to the menu's footer */
	footer: PropTypes.element,

	/** @property {Function} [onSelect] Enable a generalised callback when an item has been selected. */
	onSelect: PropTypes.func,

	/** @property {Boolean} [hasKeyboardEvents=true] Whether or not the dropdown should take focus and handle keyboard events automatically */
	hasKeyboardEvents: PropTypes.bool,

	/** @property {Function} [onHighlightChange] Callback for when the highlighted item in the dropdown changes. */
	onHighlightChange: PropTypes.func,
	onCloseAnimationEnd: PropTypes.func,

	/** @property {string} [currentPanel] The `panelName` propety of the panel which should currently be open */
	currentPanel: PropTypes.string,

	/** @property {Function} [onPanelChange] Callback for when the open DropDownPanel changes. Receives the name of the selected panel, and the previously selected panel. */
	onPanelChange: PropTypes.func,

	/** @property {Function} [onPanelSelect] Callback to trigger opening of another panel. Takes destination panel name as a parameter. */
	onPanelSelect: PropTypes.func,

	/** @property {Object} [headingAttributes] Additional attributes to be passed down to the header (onPrimaryButtonClick, primaryButtonContent, onSecondaryButtonClick, etc.) */
	headingAttributes: PropTypes.object
};

NestedDropDown.defaultProps = {
	ignoreKeyboardEvents: [],
	isHidden: false,
	hasKeyboardEvents: true,
	restrictFocus: true,
	size: 'large'
};
