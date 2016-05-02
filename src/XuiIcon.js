/**
 * Created by kirk.holloway on 18/04/2016.
 */
import React, {PropTypes} from 'react';
import cn from 'classnames';
import XuiIconBlob from './XuiIconBlob';

const propTypes = {
	icon: PropTypes.string.isRequired,
	className: PropTypes.string
};

function XuiIcon(props) {
	const classes = cn('xui-icon', props.className);
	return(
		<svg className={classes}><use xlinkHref={'#' + props.icon}/></svg>
	);
}

XuiIcon.PropTypes = propTypes;

export {XuiIconBlob as XuiIconBlob};
export default XuiIcon;
