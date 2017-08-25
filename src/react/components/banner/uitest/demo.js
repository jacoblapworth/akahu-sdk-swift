import React from 'react';
import ReactDOM from 'react-dom';
import XUIBanner from '../XUIBanner';
import XUIBannerAction from '../XUIBannerAction';
import XUIBannerActions from '../XUIBannerActions';
import XUIBannerMessage from '../XUIBannerMessage';
import XUIBannerMessageDetail from '../XUIBannerMessageDetail';

const messageDetails = [
	'I am the eggman',
	'They are the eggmen',
	'I am the walrus',
	'Goo goo g\' joob'
];

const onClick = () => { console.log('Clicked banner action'); };

ReactDOM.render(
	<div className="xui-page-width-large xui-padding-vertical-large">
		<XUIBanner>
			<XUIBannerMessage>Banner with only a message</XUIBannerMessage>
			<XUIBannerActions>
				<XUIBannerAction onClick={onClick}>Action One</XUIBannerAction>
				<XUIBannerAction onClick={onClick}>Action Two</XUIBannerAction>
			</XUIBannerActions>
		</XUIBanner>
		<XUIBanner>
			<XUIBannerMessage>Banner with message and details</XUIBannerMessage>
			<XUIBannerMessageDetail messageDetails={messageDetails} />
			<XUIBannerActions>
				<XUIBannerAction href="#BannerLink" onClick={onClick}>Action One</XUIBannerAction>
				<XUIBannerAction href="#BannerLink" onClick={onClick}>Action Two</XUIBannerAction>
			</XUIBannerActions>
		</XUIBanner>
	</div>,
	document.getElementById('app')
);
