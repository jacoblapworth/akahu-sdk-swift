// Libs
import React, { Component } from 'react';

// Components we need to test with
import XUIBanner from '../XUIBanner';
import XUIBannerAction from '../XUIBannerAction';
import XUIBannerActions from '../XUIBannerActions';
import XUIBannerMessage from '../XUIBannerMessage';

// Story book things
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, object } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';


import { variations, storiesWithVariationsKindName, NOOP } from './variations';

class DetailedBanner extends Component {
    render() {
        const { props } = this;
        const actions = props.actionProps && props.actionProps.map( (action, i) => {
           return (
                <XUIBannerAction key={i} href="#">
                    {action.text}
                </XUIBannerAction>
            )
        });

        return (
            <XUIBanner {...props}>
                <XUIBannerMessage>
                    {props.messageText}
                </XUIBannerMessage>
                <XUIBannerActions>
                    {actions}
                </XUIBannerActions>
            </XUIBanner>
        )
    }
}


const storiesWithKnobs = storiesOf(storiesWithVariationsKindName, module);
storiesWithKnobs.addDecorator(centered);
storiesWithKnobs.addDecorator(withKnobs);
storiesWithKnobs.add('Playground', () => (
	<DetailedBanner
		qaHook={text('qaHook', '')}
		onCloseClick={NOOP}
		defaultLayout={boolean('hasLayout', true)}
        className={text('className', '')}
        messageText={text('messageText', 'A Banner\'s Message')}
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

		return <DetailedBanner {...variationMinusStoryDetails}/>
	});
});