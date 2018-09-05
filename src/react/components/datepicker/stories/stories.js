// Libs
import React from 'react';

// Components we need to test with
import XUIDatePicker from '../XUIDatePicker';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, date } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import NOOP from '../../helpers/noop';
import { storiesWithVariationsKindName, variations, wkdShort, customMonths, currentMonth0 } from './variations';

const weekStarts = {
	0: 'Sun (0)',
	1: 'Mon (1)'
};

function minDate(d1, d2) {
	return d1 < d2 ? d1 : d2;
}

function maxDate(d1, d2) {
	return d1 > d2 ? d1 : d2;
}

class ExamplePicker extends React.Component {
	state = {
		selectedDate: null,
		selectedRange: null
	};

	onSelectDate = newDate => {
		if (this.props.selectRange) { // eslint-disable-line react/prop-types
			this.setState(prevState => {
				const { selectedRange } = prevState;
				if (selectedRange && selectedRange.from && !selectedRange.to) {
					return {
						selectedRange: {
							from: minDate(selectedRange.from, newDate),
							to: maxDate(selectedRange.from, newDate),
						},
						selectedDate: null
					};
				}
				return {
					selectedRange: {
						from: newDate,
						to: null,
					},
					selectedDate: null
				};
			});
		} else {
			this.setState({
				selectedDate: newDate,
				selectedRange: null
			});
		}
	};

	render() {
		return (
			<XUIDatePicker
				onSelectDate={this.onSelectDate}
				selectedDate={this.state.selectedDate}
				selectedRange={this.state.selectedRange}
				{...this.props}
			/>
		);
	}
}

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (

	<ExamplePicker
		minDate={date('minDate', '') ? new Date(date('minDate', '')) : undefined}
		maxDate={date('maxDate', '') ? new Date(date('maxDate', '')) : undefined}
		displayedMonth={date('displayedMonth', '') ? new Date(date('displayedMonth', '')) : undefined}
		isCompact={boolean('isCompact', false)}
		showDaysInOtherMonths={boolean('showDaysInOtherMonths', false)}
		showFixedNumberOfWeeks={boolean('showFixedNumberOfWeeks', false)}
		firstDayOfWeek={parseInt(select('firstDayOfWeek', weekStarts, '0'))}
		weekdaysShort={select('weekdaysShort',['standard', 'custom'], 'standard') === 'custom'? wkdShort : undefined}
		months={select('months',['standard', 'custom'], 'standard') === 'custom'? customMonths : undefined}
		dir={select('direction', ['ltr', 'rtl'])}
		selectRange={boolean('select range', false)}
	/>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		delete variationMinusStoryDetails.storyKind;
		delete variationMinusStoryDetails.storyTitle;
		// Defaults for variation display;
		variationMinusStoryDetails.onSelectDate = NOOP;
		variationMinusStoryDetails.displayedMonth = currentMonth0;

		return <XUIDatePicker {...variationMinusStoryDetails}></XUIDatePicker>
	});
});
