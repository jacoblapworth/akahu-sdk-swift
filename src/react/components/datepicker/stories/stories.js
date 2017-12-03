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

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
	<XUIDatePicker
		onSelectDate={NOOP}
		selectedDate={date('selectedDate', '') ? new Date(date('selectedDate', '')) : undefined}
		minDate={date('minDate', '') ? new Date(date('minDate', '')) : undefined}
		maxDate={date('maxDate', '') ? new Date(date('maxDate', '')) : undefined}
		displayedMonth={date('displayedMonth', '') ? new Date(date('displayedMonth', '')) : undefined}
		selectedRange={{
			from: date('fromDate', '') ? new Date(date('fromDate', '')) : undefined,
			to: date('toDate', '') ? new Date(date('toDate', '')) : undefined
		}}
		isCompact={boolean('isCompact', false)}
		showDaysInOtherMonths={boolean('showDaysInOtherMonths', false)}
		showFixedNumberOfWeeks={boolean('showFixedNumberOfWeeks', false)}
		firstDayOfWeek={parseInt(select('firstDayOfWeek', weekStarts, '0'))}
		weekdaysShort={select('weekdaysShort',['standard', 'custom'], 'standard') === 'custom'? wkdShort : undefined}
		months={select('months',['standard', 'custom'], 'standard') === 'custom'? customMonths : undefined}
		dir={select('direction', ['ltr', 'rtl'])}
	></XUIDatePicker>
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
