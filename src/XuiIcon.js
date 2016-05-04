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

function XUIIcon(props) {
	const classes = cn('xui-icon', props.className);
	return(
		<svg className={classes}><use xlinkHref={'#' + props.icon}/></svg>
	);
}

XUIIcon.PropTypes = propTypes;

export {XUIIconBlob as XUIIconBlob};
export default XUIIcon;
