/**
 * Created by kirk.holloway on 18/04/2016.
 */
import React, {PropTypes} from 'react';
import XUIBaseComponent from 'xui-base-component';
import cn from 'classnames';
import XuiIconBlob from './XuiIconBlob';

const propTypes = {
	icon: PropTypes.string.isRequired,
	modifierClasses: PropTypes.string
}

export default class XuiIcon extends XUIBaseComponent {
	render() {
		const classes = cn('xui-icon', this.props.modifierClasses);
		return(
			<svg className={classes}><use xlinkHref={'#'+this.props.icon}/></svg>
		);
	}
}

export {XuiIconBlob as XuiIconBlob};

XuiIcon.PropTypes = propTypes;
