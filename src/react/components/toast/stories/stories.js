// Libs
import React, { Component } from 'react';

// Components we need to test with
import XUIToast from '../XUIToast';
import XUIToastMessage from '../XUIToastMessage';
import XUIToastAction from '../XUIToastAction';
import XUIToastActions from '../XUIToastActions';
import { sentimentMap } from './../private/sentiments';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, select, object } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import { variations, storiesWithVariationsKindName, NOOP } from './variations';

class DetailedToast extends Component {
	render(){
		const { props } = this;
		const actions = props.actionProps && props.actionProps.map((action, i) => 
			<XUIToastAction key={i} href='#'>
				{action.text}
			</XUIToastAction>
			);

		return (
			<XUIToast {...props}>
				<XUIToastMessage>
					{props.messageText}
				</XUIToastMessage>
				<XUIToastActions>
					{actions}
				</XUIToastActions>
			</XUIToast>
		)
	}
}

const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
	<DetailedToast
		role={text('role', 'status')}
		sentiment={select('sentiment', Object.keys(sentimentMap))}
		qaHook={text('qaHook', '')}
		onCloseClick={NOOP}
		onMouseOver={NOOP}
		onMouseLeave={NOOP}
		defaultLayout={boolean('defaultLayout', true)}
		className={text('className', '')}
		messageText={text('message', 'Message text')}
		actionProps={object('actions', [{
			text: 'Action'
		}])}
	/>
));

const storiesWithVariations = storiesOf(storiesWithVariationsKindName, module);
storiesWithVariations.addDecorator(centered);

variations.forEach(variation => {
	storiesWithVariations.add(variation.storyTitle, () => {
		const variationMinusStoryDetails = { ...variation };
		variationMinusStoryDetails.storyKind = undefined;
		variationMinusStoryDetails.storyTitle = undefined;

		return <DetailedToast {...variationMinusStoryDetails}/>
	});
});
