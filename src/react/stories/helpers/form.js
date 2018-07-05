import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export default class Form extends React.PureComponent {
	constructor() {
		super();
		this.onAllEvents = this.onAllEvents.bind(this);
	}

	componentDidMount() {
		this._regularInputs = this._form.querySelectorAll(
			'input:not([type="radio"]):not([type="checkbox"]):not(.xui-autocompleter--input)'
		);
		this._textareas = this._form.querySelectorAll('textarea');
		this._radioGroups = this._form.querySelectorAll('input[type=radio]');
		this._checkBoxes = this._form.querySelectorAll('input[type="checkbox"]');
	}

	captureInputData() {
		const radioGroups = [...this._radioGroups].reduce((acc, cv) => {
			if (acc[cv.name] == null) {
				acc[cv.name] = '';
			}
			cv.checked ? (acc[cv.name] = cv.value) : '';
			return acc;
		}, {});
		const radiosForReportingBack = [];
		Object.keys(radioGroups).forEach(group => {
			radiosForReportingBack.push({ name: group, value: radioGroups[group] });
		});

		const checkBoxes = [...this._checkBoxes].reduce((acc, cv) => {
			acc.push({ name: cv.name, value: cv.checked });
			return acc;
		}, []);

		this._inputs = [
			...this._regularInputs,
			...this._textareas,
			...radiosForReportingBack,
			...checkBoxes
		].reduce((acc, input) => {
			acc[input.name] = input.value;
			return acc;
		}, {});
	}

	onAllEvents() {
		setTimeout(() => this.captureInputData(), 50);
	}

	getInputs() {
		return this._inputs;
	}

	render() {
		const {
			children,
			className,
			inline,
			stacked,
			noLayout,
			...other
		} = this.props;

		return (
			<form
				role="presentation"
				{...other}
				className={cn(
					{
						'xui-form-inline': inline && !stacked && !noLayout,
						'xui-form-layout': stacked && !inline && !noLayout
					},
					className
				)}
				onKeyUp={this.onAllEvents}
				onClick={this.onAllEvents}
				onChange={this.onAllEvents}
				ref={c => (this._form = c)}
			>
				{children}
			</form>
		);
	}
}
Form.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	inline: PropTypes.bool,
	stacked: PropTypes.bool,
	noLayout: PropTypes.bool
};
