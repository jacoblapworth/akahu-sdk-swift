/**
 * Created by kirk.holloway on 18/04/2016.
 */
import React, {PropTypes} from 'react';
import cn from 'classnames';
import XUIIconBlob from './XUIIconBlob';

const propTypes = {
	icon: PropTypes.string.isRequired,
	className: PropTypes.string
};

let blobRendered = !!document.getElementById('xui-icon-blob');

export default function XUIIcon(props) {
	const classes = cn('xui-icon', props.className);

	if (!blobRendered) {
		renderBlob();
	}

	return(
		<svg className={classes}><use xlinkHref={'#' + props.icon}/></svg>
	);
}

function renderBlob() {
	const blobEl = document.createElement('div');
	blobEl.setAttribute('id','xui-icon-blob');
	blobEl.innerHTML = XUIIconBlob;
	document.body.appendChild(blobEl);
	blobRendered = true;
}

XUIIcon.PropTypes = propTypes;
