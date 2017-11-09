// Libs
import React from 'react';

// Components we need to test with
import XUIPill from '../XUIPill';

// Story book things
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

const stories = storiesOf('Instances', module);
stories.addDecorator(centered);
stories.addDecorator(withKnobs);

// TODO, this could be exported by avatar and imported by this document
const avatarProps = {
	className: '',
	qaHook: '',
	variant: undefined, // business is the other option
	value: 'Hello', // This has to be populated, or identifier
	imageUrl: '',
	size: 'small',
	identifier: '',
};

stories.add('XUIPill', withInfo('A plain pill, in it\'s simplest configuration')(() => (
	<XUIPill
		value={text('value', 'Plain pill')}
		secondaryText={text('secondaryText', '')}
		title={text('title', '')}
		target={text('target', '')}
		qaHook={text('qaHook', '')}
		onDeleteClick={action('Clicked the delete icon')}
		onClick={action('Clicked the pill')}
		isInvalid={boolean('isInvalid', false)}
		href={text('href', null)}
		hasLayout={boolean('hasLayout', true)}
		deleteButtonLabel={text('deleteButtonLabel', null)}
		className={text('className', '')}
		avatarProps={object('avatarProps', avatarProps)}
		/>
)));
