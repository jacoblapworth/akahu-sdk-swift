import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import XUICheckbox from '../checkbox/XUICheckbox';
import { sizeClassNames, baseClass } from './private/constants';
import { ns } from '../helpers/xuiClassNamespace';

export default class XUIRolloverCheckbox extends PureComponent {
	state = {
		isMouseOver: false,
	};

	/**
	 * @public
	 *
	 * Handler attached to the target element for setting mouse over state to true.
	 */
	onMouseEnter = () => {
		if (this.props.isCheckboxHidden) {
			this.setState({
				isMouseOver: true,
			});
		}
	};

	/**
	 * @public
	 *
	 * Handler attached to the target element for setting mouse over state to false.
	 */
	onMouseLeave = () => {
		this.setState({
			isMouseOver: false,
		});
	};

	/**
	 * @public
	 *
	 * Handler attached to the target element for setting focus state.
	 */
	onFocus = () => {
		this.setState({
			hasFocus: true,
		});
	};

	/**
	 * @public
	 *
	 * Handler attached to the target element for setting focus state to false.
	 */
	onBlur = () => {
		this.setState({
			hasFocus: false,
		});
	};

	/**
	 * @public
	 *
	 * Handler attached to the target element for triggering the click event on the checkbox
	 * when the target element is clicked.
	 */
	triggerCheckboxClick = () => {
		this._checkbox._input.click();
	};

	/**
	* @public
	*
	* Handler passed to the CheckboxToggle so it can be called on change of the checkbox.
	* Also retians the checked state of the list item.
	* @param {Event} e
	*/
	onSelect = e => {
		const { onSelect } = this.props;
		onSelect && onSelect(e, this);
	};

	render() {
		const {
			isChecked,
			isDisabled,
			className,
			id,
			rolloverComponent,
			qaHook,
			size,
			isCheckboxHidden,
			labelText,
			ariaLabelledBy,
		} = this.props;
		const {
			isMouseOver,
			hasFocus,
		} = this.state;

		const showRollover = isCheckboxHidden && !isMouseOver && !hasFocus && !!rolloverComponent;

		return (
			<div
				id={id}
				className={cn(
					`${baseClass}--target`,
					isDisabled && `${baseClass}--target-disabled`,
					sizeClassNames[size],
					className,
				)}
				onClick={this.triggerCheckboxClick}
				onMouseEnter={this.onMouseEnter}
				onMouseLeave={this.onMouseLeave}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				data-automationid={qaHook}
				role="presentation"
			>
				<div className={baseClass}>
					<div className={!showRollover ? `${ns}-u-hidden-visually` : null}>
						{rolloverComponent}
					</div>
					<XUICheckbox
						ref={c => this._checkbox = c}
						onChange={this.onSelect}
						isChecked={isChecked}
						isDisabled={isDisabled}
						isLabelHidden
						htmlClassName={`${baseClass}--checkbox`}
						qaHook={qaHook && `${qaHook}--checkbox`}
						className={showRollover ? `${ns}-u-hidden-visually` : null}
						tabIndex={0}
						labelId={ariaLabelledBy}
					>{labelText}
					</XUICheckbox>
				</div>
			</div>
		);
	}
}

XUIRolloverCheckbox.propTypes = {
	qaHook: PropTypes.string,
	className: PropTypes.string,
	/** Callback for when checkbox is selected */
	onSelect: PropTypes.func,
	/** Whether the checkbox is currently checked */
	isChecked: PropTypes.bool,
	/** Whether to show the checkbox instead of the rollover component */
	isCheckboxHidden: PropTypes.bool,
	/** Applies disabled styling when true */
	isDisabled: PropTypes.bool,
	/** Id to apply to the wrapping div */
	id: PropTypes.string,
	/** Component to render when isCheckboxHidden is true and mouse is not over the component */
	rolloverComponent: PropTypes.node,
	/** Determine the size of the target, accepts small, medium, large or xlarge */
	size: PropTypes.string,
	/** Input label for accessibility purposes. Will not be visibly displayed. */
	labelText: PropTypes.string,
	/** Optionally provide the id of an element that provides a label for the checkbox */
	ariaLabelledBy: PropTypes.string,
};

XUIRolloverCheckbox.defaultProps = {
	isDisabled: false,
};
